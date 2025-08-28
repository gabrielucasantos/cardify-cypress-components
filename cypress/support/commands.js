// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for AddCard tests
Cypress.Commands.add('alertErrorHaveText', (expectedText) => {
  cy.get('.alert-error').contains(expectedText).should('be.visible')
})

Cypress.Commands.add('fillCardForm', (card) => {
  cy.get('[data-cy=number]').type(card.number)
  cy.get('[data-cy=holderName]').type(card.holderName)
  cy.get('[data-cy=expirationDate]').type(card.expirationDate)
  cy.get('[data-cy=cvv]').type(card.cvv)
  cy.get(`[data-cy=bank-${card.bank}]`).click()
})

Cypress.Commands.add('submitCardForm', () => {
  cy.get('[data-cy=saveMyCard]').click()
})