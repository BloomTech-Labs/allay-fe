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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands';

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://labs21-allay-be.herokuapp.com/api/auth/login',
    body: {
      email: 'testing123@gmail.com',
      password: 'password',
    },
  })
    .its('body')
    .then((body) => {
      cy.setLocalStorage('token', body.token);
      cy.setLocalStorage('name', body.first_name);
      cy.setLocalStorage('userId', body.id);
      cy.setLocalStorage('email', body.email);
    });
});
Cypress.Commands.add('adminLogin', () => {
  cy.request({
    method: 'POST',
    url: 'https://labs21-allay-be.herokuapp.com/api/auth/login',
    body: {
      email: 'haase1020@gmail.com',
      password: 'password',
    },
  })
    .its('body')
    .then((body) => {
      cy.setLocalStorage('token', body.token);
      cy.setLocalStorage('name', body.first_name);
      cy.setLocalStorage('userId', body.id);
      cy.setLocalStorage('email', body.email);
    });
});
