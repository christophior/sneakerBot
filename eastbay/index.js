'use strict';
const options = require('../options');
const moment = require('moment');
const colors = require('colors');

describe('buy some yeezys', function () {
  it('buy em all', function () {
    let size = (options.size.length < 2 || options.size === '10')
      ? options.size + '.0'
      : options.size;

    browser.url(options.url.eastbay);

    // browser.waitUntil(function () {
    //   console.log(moment().format('hh:mm:ss:SS').yellow + ' (⌐■_■) '.green
    //     + 'add to cart button visibility is currently: '.white
    //     + browser.getAttribute('.add_section', 'style').magenta);

    //   return !browser.getAttribute('.add_section', 'style').includes('display: none');
    // }, 3000000, 'Never saw the countdown finish!', 5);

    browser.click('#pdp_size_select_mask');
    browser.waitForVisible(`a[value*="${size}"]`);
    browser.click(`a[value*="${size}"]`);
    browser.click('#pdp_addtocart_button');
    browser.click('#header_cart_link');
    browser.click('#cart_checkout_button');

    _checkout();
    _payment();

    browser.waitForExist('#orderSubmit')
    browser.waitForEnabled('#orderSubmit');
    //browser.pause(1000);
    //browser.waitForVisible('#orderSubmit');
    //browser.click('#orderSubmit') //Uncomment this to finalize the whole payment process
    browser.pause(30000);
  });
});

function _checkout () {
  // browser.waitForExist('#billPaneShipToBillingAddress');
  // browser.click('#billPaneShipToBillingAddress');
  browser.waitForVisible('#billFirstName');
  browser.setValue('#billFirstName', options.firstName);
  browser.setValue('#billLastName', options.lastName);
  browser.setValue('#billAddress1', options.billing.addressLine1);
  browser.setValue('#billPostalCode', options.billing.zipCode);
  browser.setValue('#billHomePhone', options.phoneNumber);
  browser.setValue('#billEmailAddress', options.email);

  // browser.waitForVisible('#shipFirstName');
  // browser.setValue('#shipFirstName', options.firstName);
  // browser.setValue('#shipLastName', options.lastName);
  // browser.setValue('#shipAddress1', options.shipping.addressLine1);
  // browser.setValue('#shipAddress2', options.shipping.addressLine2);
  // browser.setValue('#shipPostalCode', options.shipping.zipCode);
  // browser.setValue('#shipHomePhone', options.phoneNumber);

  browser.pause(750);
  browser.click('#billPaneContinue');
  browser.waitForVisible('#address_verification_use_original_button');
  browser.click('#address_verification_use_original_button');

  browser.waitForVisible('#shipMethodPaneContinue');
  browser.click('#shipMethodPaneContinue');

}

function _payment () {
  browser.pause(500);
  browser.waitForVisible('#CardNumber');
  browser.setValue('#CardNumber', options.payment.number);
  browser.setValue('#CardExpireDateMM', options.payment.expiration);
  browser.setValue('#CardCCV', options.payment.csc);
  browser.click('#payMethodPaneContinue');
}
