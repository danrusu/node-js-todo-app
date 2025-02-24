/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    getByDataTest(dataTestValue: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Logs message to Node.js terminal prefixed by "@@@"
     * @example cy.logToTerminal('hello')
     */
    logToTerminal(message: string): void;
  }
}

// Read more here:
// https://github.com/cypress-io/cypress-example-todomvc#cypress-intellisense
