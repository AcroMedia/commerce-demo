/**
 * Quick Cart tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Alert user that they need a product in their cart first.
  function quickCartTourAlert(){
    var quickCartTourAlert = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Your Cart is Empty</span> ' +
          "This tour requires at least one product to be in your cart. Any product will work. Restart the tour when this has been done."
        }
      ];

    quickCartTourAlert.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(quickCartTourAlert);

    // Override default.
    quickCartTourAlert.setOption('doneLabel', 'Take me to a product!');

    // Take user to a product page.
    quickCartTourAlert.start().oncomplete(function() {
      window.location.href = '/product/adventure-begins-camping-mug';
    });
  }

  // Page 1.
  function quickCartTour(){
    var quickCartTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Quick Cart Tour</span> ' +
          "The Quick Cart is a fun out-of-the-box feature for Drupal Commerce. All you need to do is assign this block to a region of your website. How it looks and what information is displayed within is completely customizable. Let's take a look."
        },
        {
          element: '.cart--cart-block',
          intro: '<span class="introjs-tooltip__title">Product Count</span> ' +
          "The first part of the quick cart simply tells customers how many products are currently in their cart. However, this is actually an interactive element that, when clicked, reveals the quick cart!"
        },
        {
          element: '.cart-block--contents',
          intro: '<span class="introjs-tooltip__title">Quick Cart Details</span> ' +
          "The quick cart is now visible and we can see the product(s) that have been added. In this setup, we've included a remove product icon as well as a link to the cart page. Let's go there now."
        }
      ];

    quickCartTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(quickCartTour);

    // Override default.
    quickCartTour.setOption('doneLabel', 'Go to Cart');

    // Custom jQuery for specific steps.
    quickCartTour.onbeforechange(function (targetElement) {
      $.each(steps, function (index, step) {
        if ($(targetElement).is(step.element)) {
          switch (index) {
            case 2:
              $('.cart-block--contents').addClass('cart-block--contents__expanded').fadeIn("fast");
              break;
          }
          return false;
        }
      });
    });

    // Start tour and set page/trigger for page 2.
    quickCartTour.start().oncomplete(function() {
      window.location.href = '/cart?quickCartTourPage2';
    });
  }

  // Page 2.
  function quickCartTourPage2(){
    var quickCartTourPage2 = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Shopping Cart Page</span>' +
          "We've now moved to the actual cart page. Let's dig in and see what we have here."
        },
        {
          element: '.view-commerce-cart-form',
          position: 'top',
          intro: '<span class="introjs-tooltip__title">Items in Cart</span>' +
          "Like the quick view, our cart shows us a bunch of details that customers have come to expect in our online shopping carts. Of course, the information shown here is completely customizable."
        },
        {
          element: '.view-commerce-cart-form td.views-field-edit-quantity',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">Quantity</span>' +
          "The quantity filed lets customers quickly update how many of a product they would like to purchase."
        },
        {
          element: '.view-commerce-cart-form td.views-field.views-field-remove-button',
          intro: '<span class="introjs-tooltip__title">Remove</span>' +
          "Like in the quick view, customers can easily remove a product by clicking this button."
        },
        {
          element: '.order-total',
          intro: '<span class="introjs-tooltip__title">Discounts & Totals</span>' +
          "The current subtotal and total, as well as any discounts that have been applies, can be seen here. Things like taxes and shipping estimates (if we already know where the customer is) can be included here, too."
        },
        {
          element: '.view-commerce-cart-form .form-actions',
          intro: '<span class="introjs-tooltip__title">Update & Checkout</span>' +
          "These action buttons let customers update their cart if they've adjusted quantities, or, if ready to proceed, the customer can start the checkout."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "This completes the Quick Cart tour. Like everything else in Drupal Commerce, the cart and quick cart are fully customizable. What we've seen here really only scratches the surface of what could be done."
        }
      ];

    quickCartTourPage2.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(quickCartTourPage2);

    // Start tour and trigger tour select modal when completed.
    quickCartTourPage2.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // Close modal and start tour.
  $('#quickCartTour').click(function () {
    if ($('.cart-block--summary__count').text() !== '0') {
      $('#siteTours').modal('hide');
      setTimeout(quickCartTour, 1000);
    }
    else {
      $('#siteTours').modal('hide');
      setTimeout(quickCartTourAlert, 1000);
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  if (RegExp('quickCartTourPage2', 'gi').test(window.location.search)) {
    quickCartTourPage2();
  }

})(jQuery, Drupal);
