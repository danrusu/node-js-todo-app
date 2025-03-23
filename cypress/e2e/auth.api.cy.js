/// <reference types="cypress" />

const BASE_URL = 'http://localhost:1112';
const LOGIN_ENDPOINT = '/login';

const users = ['tester', 'dev'];

describe('[API] valid credentials login', { baseUrl: BASE_URL }, () => {
  for (const username of users) {
    const { password } = Cypress.env('users')[username];

    it(`[API] logs in with user ${username}`, () => {
      cy.request({
        method: 'POST',
        url: LOGIN_ENDPOINT,
        body: {
          username,
          password,
        },
        failOnStatusCode: false,
      }).as('login');

      cy.get('@login').then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.authenticated).to.be.true;
        expect(response.headers['set-cookie'][0]).to.contain('session-id=');
      });
    });
  }
});

describe('[API] invalid credentials login', { baseUrl: BASE_URL }, () => {
  for (const username of users) {
    const password = '';

    it(`[API] logs in with user ${username} and empty password`, () => {
      cy.request({
        method: 'POST',
        url: LOGIN_ENDPOINT,
        body: {
          username,
          password,
        },
        failOnStatusCode: false,
      }).as('login');

      cy.get('@login').then(response => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.equal('wrong credentials');
        expect(response.headers['set-cookie']).to.be.undefined;
      });
    });
  }
});
