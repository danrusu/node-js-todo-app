/// <reference types="cypress" />

import { login, currentUser } from '../support/pages/loginPage';
import { URL as homePageUrl } from '../support/pages/homePage';

const USER = 'tester';

describe('Simple user session POC', () => {
  let testerSessionInit;

  before(() => {
    Cypress.session.clearAllSavedSessions();
    const password = Cypress.env('users')?.[USER]?.password;
    testerSessionInit = sessionInit(USER, password);

    cy.session(USER, testerSessionInit);
  });

  it(`Opens homepage for user ${USER}`, () => {
    cy.session(USER, testerSessionInit);
    cy.visit(homePageUrl);
    currentUser().should('have.text', `User: ${USER}`);
  });
});

function sessionInit(username, password) {
  return () => {
    cy.visit(homePageUrl);
    login(username, password);
    console.log(`sessionInit(${username})`);
  };
}
