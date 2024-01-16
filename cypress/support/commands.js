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
import 'cypress-xpath';

Cypress.Commands.add('solveGoogleCAPTCHA', () => {
  cy.wait(1000);
  cy.get(`iframe[title='reCAPTCHA']`)
    .then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).find('.recaptcha-checkbox-border')
        .should('be.visible').click();
    })
})

Cypress.Commands.add('getOrderIdFromFailedPayment', () => {
  cy.log("getOrderIdFromFailedPayment")
  cy.get('.payment-fail__content__instruction-message').should('be.visible');
  cy.wait(2000)
  cy.url().then($href => {
    let orderID = $href.split('/').pop();
    orderID = orderID.replace('fail?Ref=', '').trim();
    return cy.wrap(orderID)
  })
})
Cypress.Commands.add('isPresent', (elementSelector) => {
  cy.get('body').then((body) => {
    const isPresent = !!body.find(elementSelector).length;
    return cy.wrap(isPresent)// this gives you a Chainable
  })
})