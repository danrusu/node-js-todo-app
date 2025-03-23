/// <reference types="cypress" />

import { login } from '../support/pages/loginPage';

const HTML_LOCAL_POC_FILE = './cypress/poc.html';

const USERNAME = 'dummyUser';
const PASSWORD = 'dummyPassword';

// use this to isolate and investigate either how cypress behaves
// or to create logic for web pages, components or HTTP traffic
describe('local html POC', () => {
  it(`tests local html in isolation`, { baseUrl: null }, () => {
    // set up the interception
    cy.intercept('/login').as('loginRequest');

    cy.visit(`${HTML_LOCAL_POC_FILE}`);

    login(USERNAME, PASSWORD);

    // wait for HTTP request with alias 'loginRequest'
    cy.wait('@loginRequest').then(interceptedRequest => {
      const { request, response } = interceptedRequest;

      cy.log('request: ', request.url, request.body);
      cy.log('response: ', response.body);

      cy.expect(response.statusCode).to.equal(404);
    });
  });
});
