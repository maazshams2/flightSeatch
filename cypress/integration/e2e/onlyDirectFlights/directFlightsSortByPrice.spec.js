/// <reference types="cypress" />
import moment from 'moment';
import UtilFunctions from '../../../support/utils/UtilFunctions';
const routes = require('../../../fixtures/routes.json');
const example = require('../../../fixtures/example.json');
const utilFunctions = new UtilFunctions();

var today = moment().format('MM-DD-YYYY');

describe('Only direct flight sorted by price test suite', function () {
  before(() => {
    cy.visit('')
    cy.verifyLogo();
  });

  it('Type From place', function () {
    cy.from().type(example.from);
    cy.selectFirstSuggestionItem(example.from, routes.listPlacesUrl);
  });

  it('Type To place', function () {
    cy.to().type(example.to);
    cy.selectFirstSuggestionItem(example.to, routes.listPlacesUrl);
  });

  it('Select Date From', function () {
    cy.dateFrom().click();
    cy.pickDate(example.dateFrom.date, example.dateFrom.month, example.dateFrom.year);
  });

  it('Click on Search Now', function () {
    cy.searchNow('Search now').click();

    var to = utilFunctions.createDateFormat(example.dateFrom.month, parseInt(example.dateFrom.date) + 1, example.dateFrom.year);

    cy.verifyFlightTileDates(today, to);
  });


  it('Select only direct flights filter and verify flight tiles', function () {
    cy.onlyDirectFlights().click();

    cy.verifyOnlyDirectFlights();
  });
  
  it('Sort by price and verify order', function () {
    cy.selectSorter("by price");
    utilFunctions.verifyColumnSortingDesc();

    cy.selectSorter("by price");
    utilFunctions.verifyColumnSortingDesc();
  });

});
