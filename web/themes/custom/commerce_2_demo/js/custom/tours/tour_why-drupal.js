/**
 * Why Drupal? tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Page 1.
  function whyDrupalTour(){
    var whyDrupalTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Why Drupal?</span>' +
          "We've built Urban Hipster to showcase what Drupal and Drupal Commerce 2.x can do (almost) out of the box."
          + '<br><br>' +
          "But the beauty of Drupal Commerce is that it’s a starting point, not a finished product. Every single aspect can be customized."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Curated by Experts</span>' +
          "The Drupal Commerce module has been curated by commerce experts and its out of the box functionality can stand up against any proprietary platform; Shopify, BigCommerce, Magento you name it."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Adapts to Your Business</span>' +
          "Drupal Commerce makes no assumptions about how your business is done. Its modular architecture allows for complete configurability (you can change the core structure if you need to) and the open source code means it can integrate with virtually any business system."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">You Are in Control</span>' +
          "Drupal Commerce is the only ecommerce platform that puts the power in business owners' hands. Take control of your development path, align it with your marketing initiatives, and become a frontrunner in your market."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Just the Beginning</span>' +
          "Would you like to know more about Drupal Commerce? Would you like to speak with one of our business development experts?"
          + '<br><br>' +
          '<a href="https://www.acromedia.com/drupal-commerce" class="btn btn-primary" target="_blank">Learn more</a> &nbsp; or &nbsp; ' +
          '<a href="https://www.acromedia.com/contact-us" class="btn btn-primary" target="_blank">Talk to us!</a>'
        }
      ];

    whyDrupalTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(whyDrupalTour);

    // Start tour and trigger tour select modal when completed.
    whyDrupalTour.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // Close modal and start tour.
  $('#whyDrupalTour').click(function () {
    $('#siteTours').modal('hide');
    setTimeout(whyDrupalTour, 1000);
  });

})(jQuery, Drupal);
