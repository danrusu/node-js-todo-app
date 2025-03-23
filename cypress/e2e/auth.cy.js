/// <reference types="cypress" />

import {
  login,
  currentUser,
  URL as loginPageUrl,
} from '../support/pages/loginPage';
import {
  URL as homePageUrl,
  TITLE as homePageTitle,
} from '../support/pages/homePage';

const users = ['tester', 'dev'];

describe('valid credentials login', () => {
  for (const username of users) {
    it(`logs in with user ${username}`, () => {
      const { password } = Cypress.env('users')[username];

      cy.visit(homePageUrl);

      cy.url().should('equal', loginPageUrl);

      login(username, password);

      cy.location().its('pathname').should('equal', '/');

      cy.title().should('equal', homePageTitle);

      currentUser().should('have.text', `User: ${username}`);
    });
  }
});
