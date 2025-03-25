/// <reference types="cypress" />

import { URL as homePageUrl } from '../support/pages/homePage';
import { TESTER_USER, session } from '../support/users';

describe('regression suite', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
    session(TESTER_USER);
  });

  it('tests X functionality', () => {
    session(TESTER_USER);
    cy.visit(homePageUrl);

    // add test here
    throw new Error('Add tests here :) !!!');
  });
});
