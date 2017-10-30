/**
 * Product page tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Page 1.
  function productPageTour(){
    var productPageTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Product Page Tour</span> ' +
          'This tour will show you some things you can do with your products. Click > to continue.'
        },
        {
          element: '#block-views-block-featured-products-block-1 .view-content .views-row:first-of-type',
          intro: '<span class="introjs-tooltip__title">Featured Products</span>' +
          "Products can easily be configure to show as a featured product. Let's move on to the product page. Click next page to continue."
        }
      ];

    productPageTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(productPageTour);

    // Override default.
    productPageTour.setOption('doneLabel', 'Go to Product Page');

    // Start tour and set page/trigger for page 2.
    productPageTour.start().oncomplete(function() {
      window.location.href = 'product/custom-mason-jar?productPageTourPage2';
    });
  }

  // Page 2.
  function productPageTourPage2(){
    var productPageTourPage2 = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Product Page</span>' +
          "We're now on the Custom Mason Jar product page. Everything on this page can be customized. Let's take a look at some of the elements configured for this product type."
        },
        {
          element: '.sharethis-inline-share-buttons',
          intro: '<span class="introjs-tooltip__title">Share Buttons</span>' +
          'Share buttons let customers quickly share this product with their friends.'
        },
        {
          element: '.product__images',
          intro: '<span class="introjs-tooltip__title">Product Photos</span>' +
          'This photo changes as customizable options are selected. It can also be a gallery of image.'
        },
        {
          element: '.product__intro',
          intro: '<span class="introjs-tooltip__title">Details & Add to Cart</span>' +
          'Basic details about the product, customization attributes, and an add to cart button are easy to configure per product type.'
        },
        {
          element: '.additional-details',
          intro: '<span class="introjs-tooltip__title">Additional Information & Review</span>' +
          'Configure your product pages any way you like. Add more details, reviews and other types of content to inform your customers.'
        },
        {
          element: '.recommended-products',
          intro: '<span class="introjs-tooltip__title">Recommended Products</span>' +
          'Configure recommended products to display per product. This type of data can be added to products manually or dynamically.'
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "This completes the basic product page tour. Drupal Commerce provides the flexibility to customize your product pages any way you like, from basic to complex. You are in control of your content!"
        }
      ];

    productPageTourPage2.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(productPageTourPage2);

    // Start tour and trigger tour select modal when completed.
    productPageTourPage2.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // If not on desired start page, go to that page and append trigger.
  // Otherwise, close modal and start tour.
  $('#productPageTour').click(function () {
    if (window.location.pathname !== '/') {
      window.location.href = '/?startProductPageTour';
    }
    else {
      $('#siteTours').modal('hide');
      setTimeout(productPageTour, 1000);
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  // productPageTour URL triggers.
  if (RegExp('startProductPageTour', 'gi').test(window.location.search)) {
    productPageTour();
  }
  if (RegExp('productPageTourPage2', 'gi').test(window.location.search)) {
    productPageTourPage2();
  }

})(jQuery, Drupal);
