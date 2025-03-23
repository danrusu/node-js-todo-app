/// <reference types="cypress" />

import { login, currentUser } from '../support/pages/loginPage';
import { URL as homePageUrl } from '../support/pages/homePage';

const TESTER_USER = 'tester';
const DEV_USER = 'dev';
const USERS = [TESTER_USER, DEV_USER];

describe('regression suite', () => {
  const [testerPassword, devPassword] = [TESTER_USER, DEV_USER].map(
    userName => Cypress.env('users')[userName].password,
  );
  const sessionInitHandlers = {
    [TESTER_USER]: sessionInit(TESTER_USER, testerPassword),
    [DEV_USER]: sessionInit(DEV_USER, devPassword),
  };

  before(() => {
    Cypress.session.clearAllSavedSessions();

    USERS.forEach(username => {
      cy.session(sessionName(username), sessionInitHandlers[username]);
    });
  });

  USERS.forEach(username => {
    it(`Opens homepage for user ${username}`, () => {
      cy.session(sessionName(username), sessionInitHandlers[username]);
      cy.visit(homePageUrl);
      currentUser().should('have.text', `User: ${username}`);
    });
  });
});

function sessionInit(username, password) {
  return () => {
    cy.visit(homePageUrl);
    login(username, password);
    console.log(`sessionInit(${username})`);
  };
}

function sessionName(username) {
  return `${username}-session`;
}
