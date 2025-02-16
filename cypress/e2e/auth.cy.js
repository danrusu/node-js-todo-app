/// <reference types="cypress" />

const username = 'tester';
const password = '123';

describe('login test', () => {
  it('logs in with user tester', () => {
    cy.visit('http://localhost:1112/');

    cy.get('#username').type(username);
    cy.get('#password').type('123');
    cy.get('#login').click();

    cy.location().its('pathname').should('equal', '/');

    cy.title().should('equal', 'todo-app');

    cy.get('#user p').should('have.text', `User: ${username}`);
  });
});
