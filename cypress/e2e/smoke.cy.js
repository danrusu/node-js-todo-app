/// <reference types="cypress" />

import { TITLE as loginPageTitle } from '../support/pages/loginPage';
import { URL as homePageUrl } from '../support/pages/homePage';

describe('smoke test', () => {
  it('redirects to login page if not authenticated', () => {
    let pageTitle;

    cy.visit(homePageUrl);

    cy.url().then(url => {
      cy.logToTerminal(url);
    });
    cy.task('logToTerminal', `@@@ abc`);

    cy.location().then(location => {
      cy.logToTerminal(JSON.stringify(location));
    });

    // should: retries cy command
    cy.location('pathname', { timeout: 10000 }).should(pathname => {
      cy.expect(pathname).equals('/login');
    });

    // then: not retried
    cy.title().then(title => {
      // asynchronous code
      pageTitle = title;
      console.log('[1] pageTitle', pageTitle);
      cy.expect(title).equals(loginPageTitle);
    });

    // synchronous code; is executed before pageTitle is set (line 28)
    console.log('[2] pageTitle', pageTitle);

    cy.wrap(null).then(() => {
      // asynchronous code
      console.log('[3] pageTitle', pageTitle);
    });
  });
});
