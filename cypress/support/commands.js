// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// https://docs.cypress.io/app/tooling/typescript-support#Types-for-Custom-Commands

// https://docs.cypress.io/api/cypress-api/custom-commands

Cypress.Commands.add('logToTerminal', message => {
  cy.task('logToTerminal', `@@@ ${message}`);
});

Cypress.Commands.add('getByDataTest', dataTestValue => {
  return cy.get(`[data-test=${dataTestValue}]`);
});
