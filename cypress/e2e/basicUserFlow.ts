/// <reference types="cypress" />

it('Basic user flow', () => {
  cy.visit('http://localhost:3000');

  // Click on finding a restaurant
  cy.get("#findRestaurant").click();

  // Wait to load the restaurant page
  cy.get('img', { timeout: 10000 }).should('be.visible');

  // Click on retry
  cy.get("#retry").click();

  // Wait again to load the restaurant page
  cy.get('img', { timeout: 10000 }).should('be.visible');

  // Click on go back
  cy.get("#goBack").click();

  // Click on Change Location
  cy.get("#changeLocation").click();

  // Click on Confirm
  cy.get("#confirm").click();

  // Enters random query that should not return any results
  // (Definitely not optimal)
  cy.get('input[type="text"]').type("azbvsodifezlmpoj");

  // Click on finding a restaurant
  cy.get("#findRestaurant").click();

  cy.contains("No Restaurant Found");
})
