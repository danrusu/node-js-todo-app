/// <reference types="cypress" />

const URL = 'http://localhost:1112/login';
const TITLE = 'login';

function login(username, password) {
  // prefer to use test custom attributes
  cy.getByDataTest('username').type(username);
  cy.getByDataTest('password').type(password);
  cy.getByDataTest('login').click();
}

// you can use element ids
function login2(username, password) {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#login').click();
}

function currentUser() {
  return cy.getByDataTest('currentUser');
}

export { URL, TITLE, login, login2, currentUser };
