/// <reference types="cypress" />

describe('smoke test', () => {
  before(() => {
    cy.task('getAuthorization').then(authorization => {
      cy.intercept(/localhost:1112/, req => {
        req.headers.authorization = authorization;
      });
    });
  });

  it('opens homepage', () => {
    cy.intercept('http://localhost:1112/api/todo').as('getTodos');
    cy.visit('http://localhost:1112/');

    cy.wait('@getTodos').then(http => {
      expect(http.response.statusCode).equals(200);
      expect(http.response.body).is('array');
    });
  });
});
