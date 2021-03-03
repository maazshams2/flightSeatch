import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getLogo', () => {
  cy.get('.router-link-active')
});

Cypress.Commands.add('from', () => {
  cy.get('[placeholder="From"]')
});

Cypress.Commands.add('to', () => {
  cy.get('[placeholder="To"]')
});

Cypress.Commands.add('dateFrom', () => {
  cy.get('[placeholder="Date from"]')
});

Cypress.Commands.add('dateTo', () => {
  cy.get('[placeholder="Date to"]')
});

Cypress.Commands.add('datePicker', () => {
  cy.get('.v-picker--date')
});

Cypress.Commands.add('backIcon', () => {
  cy.get('.mdi-chevron-left')
});
Cypress.Commands.add('forwardIcon', () => {
  cy.get('.mdi-chevron-right')
});
Cypress.Commands.add('datePickerHeader', () => {
  cy.get('.v-date-picker-header__value')
});
Cypress.Commands.add('dateList', () => {
  cy.get('.v-date-picker-table--date')
});
Cypress.Commands.add('monthList', () => {
  cy.get('.v-date-picker-table--month')
});
Cypress.Commands.add('yearList', () => {
  cy.get('.v-date-picker-years')
});

Cypress.Commands.add('verifyLogo', () => {
  cy.getLogo()
    .should('be.visible');
});

Cypress.Commands.add('searchNow', (buttonText) => {
  cy.get('button')
    .contains(buttonText)
});

Cypress.Commands.add('selectFirstSuggestionItem', (place, url) => {
  cy.intercept({
    pathname: url,
    query: {
      query: place
    }
  }).as('listPlaces')
  // cy.wait('@listPlaces').its('status').should('be', 200)
  cy.wait(5000);

  cy.get('.index_suggestionItem_2h9H4')
    .eq(0)
    .contains(place)
    .should('be.visible')
    .trigger('mouseover')
    .click({ force: true });
});

Cypress.Commands.add('pickDate', (date, month, year) => {
  // select header in date picker - move to Month view
  cy.datePickerHeader()
    .should('be.visible')
    .click()
    .wait(500);
  // select header in date picker - move to Year view
  cy.datePickerHeader()
    .should('be.visible')
    .click()
    .wait(500);

  // select year
  cy.yearList()
    .find('li')
    .each(($el) => {
      if ($el.text() == year) {
        $el.click()
        false
      }
    })
    .wait(500);
  // select month
  cy.monthList()
    .find('button')
    .eq(month - 1).click()
    .wait(500);
  // select date
  cy.dateList()
    .find('button')
    .eq(date - 1).click()
    .wait(500);
});
