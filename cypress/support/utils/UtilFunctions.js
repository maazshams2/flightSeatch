import moment from 'moment';

class UtilFunctions {
  suffixWithDate(name) {
    const suffixDate = name + new Date().toLocaleString();
    return suffixDate;
  }

  getCurrentYear() {
    var d = new Date();
    var n = d.getFullYear();
    return "/" + n;
  }

  getCurrentDate() {
    var today = new Date().toLocaleString();
    var dd = today.split(',');
    var date = dd[0].trim();
    return date;
  }

  createDateFormat(date, month, year) {
    return date + "-" + month + "-" + year;
  }

  convertToDateTo(dateText){
    var date = dateText.split('-');

    let dd = date[0];
    let mm = date[1];
    let yyyy = date[2];

    dd = "0" + (parseInt(dd)+1).toString();

    return mm + "-" + dd + "-" + yyyy;
  }

  convertToDateFrom(dateText){
    var date = dateText.split('-');

    let dd = date[0];
    let mm = date[1];
    let yyyy = date[2];

    mm = "0" + (parseInt(mm)+1).toString();

    return dd + "-" + mm + "-" + yyyy;
  }

  randomString() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  randomBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  splitStrings(stringName) {
    var str = stringName;
    var arr = str.split(/(?<=^(?:.{3})+)(?!$)/);
    return arr;
  }

  getPrefix(stringName, character){
    return stringName.substr(0, stringName.indexOf(character)); 
  }

  isSorted(array) {
    const limit = array.length - 1;
    for (let i = 0; i < limit; i++) {
      const current = array[i], next = array[i + 1];
      if (current > next) 
        cy.log('Array is sorted in ascending order');
        // return false;
      else if (current < next)
        cy.log('Array is sorted in descending order');
    }
    // return true;
  }

  verifyDateAndTimeSortingAsc() {
    getDateTextAsArray().then((readingTimeContents) => {
      let actualReadingTimeContent = readingTimeContents
        .filter((date) => date
      );

      let expReadingTimeContent = readingTimeContents
        .filter((date) => date)
        .sort(
          (a, b) =>
            moment(b, 'MM/DD/YYYY, hh:mm:ssa') - moment(a, 'MM/DD/YYYY, hh:mm:ssa')
        );

      cy.wrap(actualReadingTimeContent).should(
        'deep.eq',
        expReadingTimeContent
      );
    });
  }

  verifyDateAndTimeSortingDesc() {
    getDateTextAsArray().then((readingTimeContents) => {
      let actualReadingTimeContent = readingTimeContents
        .filter((date) => date 
      );

      let expReadingTimeContent = readingTimeContents
        .filter((date) => date)
        .sort(
          (a, b) =>
            moment(b, 'MM/DD/YYYY, hh:mm:ssa') - moment(a, 'MM/DD/YYYY, hh:mm:ssa')
        )
        .reverse();

      cy.wrap(actualReadingTimeContent).should(
        'deep.eq',
        expReadingTimeContent
      );
    });
  }

  verifyColumnSortingDesc() {
    getPriceTextAsArray().then((cellContents) => {
      let actualColumnSort = cellContents;
      let expColumnSort = cellContents.sort().reverse();
      cy.wrap(actualColumnSort).should('deep.eq', expColumnSort);
    });
  }

  verifyColumnSortingAsc() {
    getPriceTextAsArray().then((cellContents) => {
      let actualColumnSort = cellContents;
      let expColumnSort = cellContents.sort();
      cy.wrap(actualColumnSort).should('deep.eq', expColumnSort);
    });
  }
}

export default UtilFunctions;

function getPriceTextAsArray() {
  let cellContents = [];
  return new Cypress.Promise((resolve) => {
    cy.flightPrice()
      .each(($el) => {
        var priceText = $el.text().substr(0, $el.text().indexOf('$'));
        cellContents.push(priceText.toString().toLowerCase());
      })
      .then(() => resolve(cellContents));
  });
}

function getDateTextAsArray(){
  let cellContents = [];
  return new Cypress.Promise((resolve) => {
  cy.flightTileDateRows()
    .each(($el) => {
      cy.wrap($el)
        .find('.index_notice_PP17w')
        .eq(0)
        .then(($date) => {
          var dateValue = $date.text().substr(0, $date.text().indexOf(','));
          cellContents.push(dateValue.toString().toLowerCase());
        });
    })
    .then(() => resolve(cellContents));
  });
}