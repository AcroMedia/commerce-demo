/**
 * Digital Product Checkout tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Alert user that they need a product in their cart first.
  function checkoutDigitalTourAlert(){
    var checkoutDigitalTourAlert = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Your Cart is Empty</span> ' +
          "This tour requires at least one <strong>digital</strong> product to be in your cart. Restart the tour when this has been done."
          + '<br><br>' +
          "Note: If you aren't able to add a product it's probably because you don't have cookies enabled."
        }
      ];

    checkoutDigitalTourAlert.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(checkoutDigitalTourAlert);

    // Override default.
    checkoutDigitalTourAlert.setOption('doneLabel', 'Take me to a digital product!');

    // Take user to a product page.
    checkoutDigitalTourAlert.start().oncomplete(function() {
      window.location.href = '/product/kid';
    });
  }

  // Page 1 - Cart.
  function checkoutDigitalTour(){
    var checkoutDigitalTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Digital Product Checkout Tour</span> ' +
          "Drupal Commerce lets you configure your checkout flows to suit whatever you're selling. Some examples are physical products, digital downloads, subscriptions and event registrations. "
          + '<br><br>' +
          "This tour will show you a digital product checkout flow."
        },
        {
          element: '.view-commerce-cart-form .form-actions',
          intro: '<span class="introjs-tooltip__title">Start Checkout</span>' +
          "All online stores have some sort of cart page similar to this one. It's one place where customers know they can start their checkout. "
          + "<br><br>" +
          "Let's do this now. Click 'Start Checkout' below to continue."
        }
      ];

    checkoutDigitalTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(checkoutDigitalTour);

    // Override default.
    checkoutDigitalTour.setOption('doneLabel', 'Start Checkout');

    // Get order number from cart form and set in cookie for session.
    // Start tour and continue checkout on complete.
    checkoutDigitalTour.start().oncomplete(function() {
      // TODO: Need to get this order ID from correct order type (digital vs physical)
      var $tourOrderNumber = $('.cart-form form').attr('id').replace(/[^0-9]/g, '');
      Cookies.set('tourOrderNumber', $tourOrderNumber);
      $("#edit-checkout").trigger('click');
    });
  }

  // TODO: Add guest checkout step.

  // Page 2 - Order Information.
  function checkoutDigitalTourPage2(){
    var checkoutDigitalTourPage2 = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Order Information</span>' +
          "This step of our checkout flow is where customers select a payment method and enter billing information."
          + '<br><br>' +
          "Let's look at these elements in more detail."
        },
        {
          element: '#block-checkoutprogress',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">Checkout Progress</span>' +
          "This checkout progress indicator lets customers know what step they're on throughout the entire checkout flow."
        },
        {
          element: '.layout-region-checkout-secondary',
          intro: '<span class="introjs-tooltip__title">Order Summary & Coupons</span>' +
          "The order summary shows each item that is to be purchased. Customers can also apply promotional coupon codes, if available."
        },
        {
          element: '#payment-information-wrapper',
          intro: '<span class="introjs-tooltip__title">Payment Method & Information</span>' +
          "Digital products require no shipping options, so payment information is all the customer needs to provide. A large number of payment methods are already integrated into Drupal Commerce, with more constantly being developed."
        },
        {
          element: '.layout-region-checkout-footer',
          intro: '<span class="introjs-tooltip__title">Continue to Review</span>' +
          "Once a customer has completed this page they can move on to the review page. Let's look at this page now."
        }
      ];

    checkoutDigitalTourPage2.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(checkoutDigitalTourPage2);

    // Override default.
    checkoutDigitalTourPage2.setOption('doneLabel', 'Go to Review');

    // Start tour and continue checkout on complete.
    checkoutDigitalTourPage2.start().oncomplete(function() {
      $("#edit-actions-next").trigger('click');
    });
  }

  // Page 3 - Review.
  function checkoutDigitalTourPage3(){
    var checkoutDigitalTourPage3 = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Review</span>' +
          "The order review page gives customers one last look at their information before completing checkout."
          + '<br><br>' +
          "Again, let's look at these elements in more detail."
        },
        {
          element: '.layout-region-checkout-secondary',
          intro: '<span class="introjs-tooltip__title">Order Summary & Coupons</span>' +
          "The order summary has now been updated to reflect the final total that includes taxes. Like in the previous page, customers still have the opportunity to apply promotional coupon codes."
        },
        {
          element: '#edit-review',
          intro: '<span class="introjs-tooltip__title">Contact & Payment Details</span>' +
          "All of the previously entered information is now displayed here for the customer to review. Customers can easily go back and edit their payment information if a mistake is found."
        },
        {
          element: '.layout-region-checkout-footer',
          intro: '<span class="introjs-tooltip__title">Complete Purchase or Go Back</span>' +
          "If all of the information is correct, the final step is to pay and complete the purchase. Let's do this now. Click the 'Complete Checkout' button below."
          + '<br><br>' +
          "Don't worry, no transaction will actually take place."
        }
      ];

    checkoutDigitalTourPage3.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(checkoutDigitalTourPage3);

    // Override default.
    checkoutDigitalTourPage3.setOption('doneLabel', 'Complete Checkout');

    // Start tour and continue checkout on complete.
    checkoutDigitalTourPage3.start().oncomplete(function() {
      $("#edit-actions-next").trigger('click');
    });
  }

  // Page 4 - Complete.
  function checkoutDigitalTourPage4(){
    var checkoutDigitalTourPage4 = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Checkout Complete</span>' +
          "The order has been placed! Let's take a look at what's here."
        },
        {
          element: '.checkout-complete__order-number',
          intro: '<span class="introjs-tooltip__title">Order Number</span>' +
          "Every order is assigned a unique order number. Customers and store managers can reference this number to view the order at a later date."
        },
        {
          element: '.checkout-complete',
          intro: '<span class="introjs-tooltip__title">Complete Message</span>' +
          "Upon completing the order, each payment method can display a unique set of instructions to the customer."
          + "<br><br>" +
          "Here we've also included links to any of the purchased digital downloads."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "This completes a full walk-through of a basic digital product checkout flow. Drupal Commerce can easily configure many simple checkout flows out of the box, however, fully custom checkout solutions can also be developed!"
        }
      ];

    checkoutDigitalTourPage4.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(checkoutDigitalTourPage4);

    // Start tour and trigger tour select modal when completed.
    // Also remove cookie when complete.
    checkoutDigitalTourPage4.start().oncomplete(function() {
      Cookies.remove('tourOrderNumber');
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // If no product is in cart, alert user.
  // If not on desired start page, go to that page and append trigger.
  // Otherwise, close modal and start tour.
  $('#checkoutDigitalTour').click(function () {
    if ($('.cart-block--summary__count').text() === '0') {
      $('#siteTours').modal('hide');
      setTimeout(checkoutDigitalTourAlert, 1000);
    }
    else if (window.location.pathname !== '/cart') {
      window.location.href = '/cart?startCheckoutDigitalTour';
    }
    else
    {
      $('#siteTours').modal('hide');
      setTimeout(checkoutDigitalTour, 1000);
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  // Cart.
  if (RegExp('startCheckoutDigitalTour', 'gi').test(window.location.search)) {
    checkoutDigitalTour();
  }

  // Get order number from cookie set in tour.
  var $orderNumber = Cookies.get('tourOrderNumber');

  // Checkout - Order Information.
  if (window.location.pathname == '/checkout/' + $orderNumber + '/order_information') {
    checkoutDigitalTourPage2();
  }
  // Checkout - Review.
  if (window.location.pathname == '/checkout/' + $orderNumber + '/review') {
    checkoutDigitalTourPage3();
  }
  // Checkout - Complete
  if (window.location.pathname == '/checkout/' + $orderNumber + '/complete') {
    checkoutDigitalTourPage4();
  }

})(jQuery, Drupal);
