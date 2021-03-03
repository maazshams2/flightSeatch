import '@testing-library/cypress/add-commands';
import UtilFunctions from '../utils/UtilFunctions';
const utilFunctions = new UtilFunctions();

Cypress.Commands.add('chooseAnotherFlight', () => {
  cy.get('.router-link-active')
    .contains('Choose another flight?')
});

Cypress.Commands.add('sortList', () => {
  cy.get('.custom-sort_sortName_3lTt4')
});

Cypress.Commands.add('onlyDirectFlights', () => {
  cy.get('.v-input__slot')
});

Cypress.Commands.add('cheapestFlightTile', () => {
  cy.get('.index_cheapest_2q1Am')
});
Cypress.Commands.add('flightTileList', () => {
  cy.get('.index_container_3w5wx')
});
Cypress.Commands.add('flightTileDateRows', () => {
  cy.get('.index_noticeRow_3z8V4')
});
Cypress.Commands.add('flightTileDateList', () => {
  cy.get('.index_notice_PP17w')
});
Cypress.Commands.add('flightTilePrice', () => {
  cy.get('.index_price_2ibrS')
});
Cypress.Commands.add('flightTilePlace', () => {
  cy.get('.index_place_3cftZ')
});
Cypress.Commands.add('activeFlightTile', () => {
  cy.get('.index_active_12hsp')
});

Cypress.Commands.add('costRangePriceValues', () => {
  cy.get('.cost-range_price_3Cqvs')
});
Cypress.Commands.add('costRangeSliderProgress', () => {
  cy.get('.cost-range_sliderProgress_3pNya')
});

Cypress.Commands.add('totalPrice', () => {
  cy.get('.index_price_1rX0R');
});

Cypress.Commands.add('selectFlightTile', (index) => {
  cy.flightTileList()
    .eq(index)
    .click();
});

Cypress.Commands.add('verifyTotal', () => {
  var priceText;
  var totalText = 0;

  cy.activeFlightTile()
  .each((tile) => {
    cy.wrap(tile)
      .find('.index_price_2ibrS')
      .then((price) => {
        priceText = parseInt(utilFunctions.getPrefix(price.text(), '$'));
        totalText += priceText;
      });
  });

  cy.totalPrice()
    .then((total) => {
      var totalPriceText = parseInt(utilFunctions.getPrefix(total.text(), ' '));
      expect(totalPriceText).to.equal(totalText);
    });
});

Cypress.Commands.add('selectSorter', (sorterText) => {
  cy.sortList()
    .find('div')
    .each(($el) => {
      if ($el.text() == sorterText) {
        $el.click();
      }
    });
});

Cypress.Commands.add('verifyFlightTileDates', (from, to) => {
  cy.flightTileList()
    .should('be.visible');
  cy.selectSorter("by date");
  cy.selectSorter("by date");

  cy.flightTileDateList()
    .eq(0)
    .then(el => {
      if (cy.wrap(el).contains(',')) {
        var elText = utilFunctions.getPrefix(el.text(), ',');
        var elDate = new Date(utilFunctions.convertToDateFrom(elText));
        var fromDate = new Date(from);

        expect(elDate).to.be.at.least(fromDate);
      }
    });

  cy.flightTileDateList()
    .its('length')
    .then(listingCount => {
      cy.flightTileDateList()
        .eq(listingCount - 2)
        .then(el => {
          if (cy.wrap(el).contains(',')) {
            var elText = utilFunctions.getPrefix(el.text(), ',');
            var elDate = new Date(utilFunctions.convertToDateTo(elText));
            var toDate = new Date(to);

            expect(elDate).to.be.at.most(toDate);
          }
        });
    });
});

Cypress.Commands.add('verifyCheapestPrice', () => {
  var costRangeMinText;

  cy.costRangePriceValues()
    .eq(0)
    .then((field) => {
      costRangeMinText = field.text();
    });

  cy.cheapestFlightTile()
    .should('have.css', 'border-color', 'rgb(223, 32, 89)')
    .find('.index_price_2ibrS')
    .then((field) => {
      const cheapFlight = field.text();
      expect(cheapFlight).to.contain(costRangeMinText)
    });
});

Cypress.Commands.add('verifyOnlyDirectFlights', () => {
  cy.flightTileList()
    .each(($el) => {
      cy.wrap($el)
        .find('.index_notice_PP17w')
        .eq(1)
        .then((flightTravel) => {
          expect(flightTravel.text()).to.equal('direct flight');
        });
    });
});

