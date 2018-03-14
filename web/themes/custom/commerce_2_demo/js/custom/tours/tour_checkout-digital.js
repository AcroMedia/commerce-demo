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
          intro: '<span class="introjs-tooltip__title">Your Cart has no Digital Products</span> ' +
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
      window.location.href = '/product/epic-mix-tape-urban-hipster';
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
          element: '.order-type-digital .form-actions',
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

    // Remove any existing tour cookies.
    Cookies.remove('tourOrderNumber');
    Cookies.remove('tourOrderType');

    // Start tour and continue checkout on complete.
    checkoutDigitalTour.start().oncomplete(function() {
      // Get order number and type from quick cart form and set in cookie for session.
      $('.cart-block form').each(function() {
        var $orderType = $(this).data('order-type');

        if ($orderType === 'digital')  {
          Cookies.set('tourOrderType', $(this).data('order-type'));
          Cookies.set('tourOrderNumber', $(this).data('order-id'));
        }
      });

      $('form.order-type-digital').find('input[id^="edit-checkout"]').trigger('click');
    });
  }

  // Page 1B - Login.
  function checkoutDigitalTourLogin(){
    var checkoutDigitalTourLogin = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Login Page</span> ' +
          "Because we're not logged in, the first page of checkout is a login page."
          + "<br><br>" +
          "Drupal Commerce has an intuitive checkout flow builder that lets you easily customize what customers can do during checkout."
        },
        {
          element: '#block-checkoutprogress',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">Checkout Progress</span>' +
          "The checkout progress indicator at the top of the page lets customers know what step they're on throughout the entire checkout flow."
        },
        {
          element: '#edit-login-returning-customer',
          intro: '<span class="introjs-tooltip__title">Returning Customer</span>' +
          "Customers who already have an account can log in right away."
          + "<br><br>" +
          "Customer accounts lets your customers see past orders, save shipping addresses, add payment methods, etc."
        },
        {
          element: '#edit-login-register',
          intro: '<span class="introjs-tooltip__title">New Customer</span>' +
          "Optionally allow your customers to create a new account on the site."
          + "<br><br>" +
          "Turning the new customer creation functionality on or off is as simple as checking a box for this checkout flow. This is something administrators can access and configure."
        },
        {
          // No element makes this tip float on center of page.
          scrollTo: 'tooltip',
          intro: '<span class="introjs-tooltip__title">Guest Checkout</span> ' +
          "This checkout flow has Guest Checkout disabled. If we were to enable it, a third option would appear here letting customers checkout without requiring an account to do so."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Continue</span> ' +
          "Let's continue checkout as if we are a returning customer. Click 'Continue' below to proceed. This tour will automatically log us in and proceed."
        }
      ];

    checkoutDigitalTourLogin.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(checkoutDigitalTourLogin);

    // Override default.
    checkoutDigitalTourLogin.setOption('doneLabel', 'Continue');

    // Set example returning customer username and password login values.
    $('#edit-login-returning-customer-name').val('customer');
    $('#edit-login-returning-customer-password').val('customer');

    // Remove any existing tour cookies.
    Cookies.remove('tourOrderNumber');
    Cookies.remove('tourOrderType');

    // Start tour and continue checkout on complete.
    checkoutDigitalTourLogin.start().oncomplete(function() {
      // Get order number and type from quick cart form and set in cookie for session.
      $('.cart-block form').each(function() {
        var $orderType = $(this).data('order-type');

        if ($orderType === 'digital')  {
          Cookies.set('tourOrderType', $(this).data('order-type'));
          Cookies.set('tourOrderNumber', $(this).data('order-id'));
        }
      });

      $('#edit-login-returning-customer-submit').trigger('click');
    });
  }

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
          "The checkout progress indicator at the top of the page lets customers know what step they're on throughout the entire checkout flow."
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

    // Remove cookie in case user closes tour early.
    Cookies.remove('tourOrderNumber');
    Cookies.remove('tourOrderType');

    // Start tour and continue checkout on complete.
    checkoutDigitalTourPage2.start().oncomplete(function() {
      // Get order number and type from quick cart form and set in cookie for session.
      $('.cart-block form').each(function() {
        var $orderType = $(this).data('order-type');

        if ($orderType === 'digital')  {
          Cookies.set('tourOrderType', $(this).data('order-type'));
          Cookies.set('tourOrderNumber', $(this).data('order-id'));
        }
      });

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

    // Remove cookie in case user closes tour early.
    Cookies.remove('tourOrderNumber');
    Cookies.remove('tourOrderType');

    // Start tour and continue checkout on complete.
    checkoutDigitalTourPage3.start().oncomplete(function() {
      // Get order number and type from quick cart form and set in cookie for session.
      $('.cart-block form').each(function() {
        var $orderType = $(this).data('order-type');

        if ($orderType === 'digital')  {
          Cookies.set('tourOrderType', $(this).data('order-type'));
          Cookies.set('tourOrderNumber', $(this).data('order-id'));
        }
      });

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

    // Remove cookie in case user closes tour early.
    Cookies.remove('tourOrderNumber');
    Cookies.remove('tourOrderType');

    // Start tour and trigger tour select modal when completed.
    // Also remove cookie when complete.
    checkoutDigitalTourPage4.start().oncomplete(function() {
      Cookies.remove('tourOrderNumber');
      Cookies.remove('tourOrderType');
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  $('#checkoutDigitalTour').click(function () {
    // If no product is in cart, alert user.
    if ($('.cart-block--summary__count').text() === '0')  {
      $('#siteTours').modal('hide');
      setTimeout(checkoutDigitalTourAlert, 1000);
    }
    // Else, continue.
    else {
      // Loop through cart forms and set order type variable.
      $('.cart-block form').each(function() {
        var $orderType = $(this).data('order-type');

        // If order type is what we want.
        if ($orderType === 'digital')  {
          // But we're not on desired start page, go to that page and append trigger.
          if (window.location.pathname !== '/cart') {
            window.location.href = '/cart?startCheckoutDigitalTour';
          }
          // Or, if we are on desired start page, close modal and start tour.
          else
          {
            $('#siteTours').modal('hide');
            setTimeout(checkoutDigitalTour, 1000);
          }
        }
        // If order type is not what we want, alert user.
        else {
          $('#siteTours').modal('hide');
          setTimeout(checkoutDigitalTourAlert, 1000);
        }
      });
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  // Cart.
  if (RegExp('startCheckoutDigitalTour', 'gi').test(window.location.search)) {
    checkoutDigitalTour();
  }

  // Get order number and type from cookies set in tour.
  var $orderType = Cookies.get('tourOrderType');
  var $orderNumber = Cookies.get('tourOrderNumber');

  if ($orderType === 'digital') {
    // Checkout - Login.
    if (window.location.pathname == '/checkout/' + $orderNumber + '/login') {
      checkoutDigitalTourLogin();
    }
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
  }

})(jQuery, Drupal);
