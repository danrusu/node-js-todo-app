/// <reference types="cypress" />

describe('smoke test', () => {
  it('redirects to login page if not authenticated', () => {
    let pageTitle;

    cy.visit('http://localhost:1112/');

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
      pageTitle = title;
      console.log('[1] pageTitle', pageTitle);
      cy.expect(title).equals('login');
    });

    console.log('[2] spageTitle', pageTitle);

    cy.wrap(null).then(() => {
      console.log('[3] spageTitle', pageTitle);
    });
  });
});
