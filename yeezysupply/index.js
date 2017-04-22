'use strict';
const options = require('../options');
const moment = require('moment');
const colors = require('colors');

describe('buy some yeezys', function () {
  it('buy em all', function () {
    let size = (options.size.length < 2 || options.size === '10')
      ? options.size + '.0'
      : options.size;

    browser.url(options.url.yeezysupply);

    // browser.waitUntil(function () {
    //   console.log(moment().format('hh:mm:ss:SS').yellow + ' (⌐■_■) '.green
    //     + 'add to cart button visibility is currently: '.white
    //     + browser.getAttribute('.add_section', 'style').magenta);

    //   return !browser.getAttribute('.add_section', 'style').includes('display: none');
    // }, 3000000, 'Never saw the countdown finish!', 5);

    browser.click('input[value*="PURCHASE"]');
    browser.waitForExist('input[value*="CHECK OUT"]')
    browser.click('input[value*="CHECK OUT"]');

    _checkout();
    _payment();

    //browser.waitForVisible('.step__footer__continue-btn');
    //browser.click('.step__footer__continue-btn') //Uncomment this to finalize the whole payment process
    browser.pause(30000);
  });
});

function _checkout () {
  browser.waitForVisible('#checkout_email');
  browser.setValue('#checkout_email', options.email);

  browser.setValue('#checkout_shipping_address_first_name', options.firstName);
  browser.setValue('#checkout_shipping_address_last_name', options.lastName);
  browser.setValue('#checkout_shipping_address_address1', options.billing.addressLine1);
  browser.setValue('#checkout_shipping_address_address2', options.billing.addressLine2);
  browser.setValue('#checkout_shipping_address_city', options.billing.city);

  browser.selectByValue('#checkout_shipping_address_country', 'United States');
  browser.selectByValue('#checkout_shipping_address_province', 'Texas');

  browser.setValue('#checkout_shipping_address_zip', options.billing.zipCode);
  browser.setValue('#checkout_shipping_address_phone', options.phoneNumber);

  browser.click('.step__footer__continue-btn');
  
  browser.pause(750);
  browser.waitForVisible('.step__footer__continue-btn');
  browser.click('.step__footer__continue-btn');
}

function _payment () {
  // parment fields are in iframes so need to do some
  // switching between the active frame
  var iframes = browser.elements('iframe').value,
    paymentFrames = [];
  
  iframes.forEach(function(frame) { paymentFrames.push(frame.getAttribute('id')); });
  browser.pause(750);

  browser.frame(paymentFrames[0]);
  browser.setValue('#number', options.payment.number);
  browser.frame();

  browser.frame(paymentFrames[1]);
  browser.setValue('#name', `${options.firstName} ${options.lastName}`);
  browser.frame();

  browser.frame(paymentFrames[2]);
  browser.setValue('#expiry', options.payment.expiration);
  browser.frame();

  browser.frame(paymentFrames[3]);
  browser.setValue('#verification_value', options.payment.csc);

  // go back to default frame
  browser.frame();
}
