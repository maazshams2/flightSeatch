/// <reference types="cypress" />
import moment from 'moment';
import UtilFunctions from '../../../support/utils/UtilFunctions';
const routes = require('../../../fixtures/routes.json');
const example = require('../../../fixtures/example.json');
const utilFunctions = new UtilFunctions();

var today = moment().format('DD-MM-YYYY');

describe('Cheapest Price test suite', function () {
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

    var to = utilFunctions.createDateFormat(example.dateFrom.date, example.dateFrom.month, example.dateFrom.year);

    cy.verifyFlightTileDates(today, to);
  });

  it('Verify cheapest price flight', function () {
    cy.selectSorter("by price");
    cy.selectSorter("by price");

    cy.verifyCheapestPrice();
  });
});
