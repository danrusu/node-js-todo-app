/// <reference types="cypress" />

import { login } from '../support/pages/loginPage';

const HTML_LOCAL_POC_FILE = './cypress/poc.html';

const USERNAME = 'dummyUser';
const PASSWORD = 'dummyPassword';
const LOGIN_ERROR_MESSAGE = 'Wrong credentials';

// use this to isolate and investigate either how cypress behaves
// or to create logic for web pages, components or HTTP traffic
describe('local html POC', () => {
  it(`tests local html in isolation`, { baseUrl: null }, () => {
    cy.intercept(
      // route matcher
      {
        method: 'POST',
        url: '/login',
      },
      // stubbed response
      {
        statusCode: 401,
        body: {
          error: LOGIN_ERROR_MESSAGE,
        },
      },
    ).as('loginRequest'); // request alias

    cy.visit(`${HTML_LOCAL_POC_FILE}`);

    login(USERNAME, PASSWORD);

    // wait for HTTP request with alias 'loginRequest'
    cy.wait('@loginRequest').then(interceptedRequest => {
      const { request, response } = interceptedRequest;
      cy.log('request: ', request.url, request.body);

      cy.expect(request.body).deep.equals({
        username: USERNAME,
        password: PASSWORD,
      });

      cy.expect(response.statusCode).to.equal(401);

      cy.getByDataTest('login-error')
        .should('be.visible')
        .and('have.text', LOGIN_ERROR_MESSAGE);
    });
  });
});
