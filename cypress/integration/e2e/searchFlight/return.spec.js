/// <reference types="cypress" />
import moment from 'moment';
import UtilFunctions from '../../../support/utils/UtilFunctions';
const routes = require('../../../fixtures/routes.json');
const example = require('../../../fixtures/example.json');
const utilFunctions = new UtilFunctions();

var today = moment().format('MM-DD-YYYY');

describe('Return test suite', function () {
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

  it('Select To From', function () {
    cy.dateTo().click();
    cy.pickDate(example.dateTo.date, example.dateTo.month, example.dateTo.year);
  });

  it('Click on Search Now', function () {
    cy.searchNow('Search now').click();

    var to = utilFunctions.createDateFormat(example.dateFrom.month, example.dateFrom.date, example.dateFrom.year);

    cy.verifyFlightTileDates(today, to);
  });

});
