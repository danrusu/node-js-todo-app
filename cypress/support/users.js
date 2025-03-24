/// <reference types="cypress" />

import { URL as homePageUrl, login } from '../support/pages/loginPage';

const TESTER_USER = 'tester';
const DEV_USER = 'dev';

const USERS = [TESTER_USER, DEV_USER];

/**
 * Creates / restores a user session.
 *
 * @param {string} username
 */
function session(username) {
  const sessionInitHandlers = getSessionInitHandlers();
  cy.session(`${username}-session`, sessionInitHandlers[username]);
}

/**
 * Get password for username from cypress.env.json
 *
 * @param {string} username
 * @returns password for username or undefined if user/password are not specified in cypress.env.json
 */
function getPassword(username) {
  return Cypress.env('users')?.[username]?.password;
}

/**
 * 
 * @returns an object with sessionInitHandlers for each user
 * @example { tester: () => {
    cy.visit(homePageUrl);
    login('tester', 'testerPasswordFromCypressEnv');
    console.log('sessionInit(tester)');
    },
    dev: ...  
  }
 */
function getSessionInitHandlers() {
  return USERS.reduce((acc, username) => {
    acc[username] = sessionInit(username, getPassword(username));
    return acc;
  }, {});
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns a session init function
 */
function sessionInit(username, password) {
  return () => {
    cy.visit(homePageUrl);
    login(username, password);
    console.log(`sessionInit(${username})`);
  };
}

export { TESTER_USER, DEV_USER, USERS, session };
