/// <reference types="cypress" />

import { currentUser } from '../support/pages/loginPage';
import { URL as homePageUrl } from '../support/pages/homePage';
import { USERS, session } from '../support/users';

describe('user sessions suite', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();

    // create sessions for each user
    USERS.forEach(username => {
      session(username);
    });
  });

  USERS.forEach(username => {
    it(`Opens homepage for user ${username}`, () => {
      session(username);
      cy.visit(homePageUrl);
      currentUser().should('have.text', `User: ${username}`);

      // currentUser().should(currentUser => {
      //   cy.expect(currentUser, 'current user text').to.have.text(
      //     `User: ${username}`,
      //   );
      // });
    });
  });
});
