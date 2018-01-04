/**
 * Why Open Source? tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Page 1.
  function whyOpenSourceTour(){
    var whyOpenSourceTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Why Open Source?</span>' +
          "Drupal and Drupal Commerce are open source, but what does that mean? It means that the source code is freely available to be used, modified and redistributed. The benefits of this are huge."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">No Fees</span>' +
          "Using Drupal and Drupal Commerce doesn't cost a thing. Zip, zero, zilch, nada. It's yours."
          + '<br><br>' +
          "There are no licensing fees, revenue sharing, or mandatory support contracts. This reason alone is why many businesses prefer open source platforms."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Own Your Data</span>' +
          "When you utilize an open source commerce platform, you own the code. If you work with an agency and choose to move to an in-house development team or to a different agency, you can do so at no cost or risk to your business."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Complete Integration</span>' +
          "Drupal Commerce's underlying code is completely exposed for you to use. This means that virtually any business systems, from CRMs and shipping vendors to payment gateways and accounting software, has the ability to integrate."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Custom User Experience</span>' +
          "Drupal has a powerful theme system that allows you to add unique and advanced custom user experiences. This gives more power to marketers, allowing them to create custom conversion paths for different user types."
          + '<br><br>' +
          "You can generate personalized content based on customer data and/or provide different content to users based on their geographic location."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">The Omni-Channel Experience</span>' +
          "Rather than having to force together multiple platforms that pull data from various systems, open source allows for one centralized data centre that can be accessed by any of the systems you need."
          + '<br><br>' +
          "Customer data, product details, promotions & sales information, inventory numbers and more can all be easily defined and streamlined across multiple channels."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Not Just Commerce</span>' +
          "Drupal started as a CMS (content management system) and that focus has not changed. Drupal Commerce adds commerce functionality to Drupal, which creates a powerful combination of commerce and content publishing."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">A World of Support</span>' +
          "1000’s of developers and supporters worldwide; agencies, contractors, & enthusiasts all have the common goal of bettering Drupal and Drupal Commerce. Often times, before a retailer even knows it needs a specific new integration or piece of functionality, someone is already building it."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Any Questions?</span>' +
          "Would you like to know more about Drupal Commerce? Would you like to speak with one of our business development experts about your project?"
          + '<br><br>' +
          '<a href="https://www.acromedia.com/drupal-commerce" class="btn btn-primary" target="_blank">Learn more</a> &nbsp; or &nbsp; ' +
          '<a href="https://www.acromedia.com/contact-us" class="btn btn-primary" target="_blank">Talk to us!</a>'
        }
      ];

    whyOpenSourceTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(whyOpenSourceTour);

    // Start tour and trigger tour select modal when completed.
    whyOpenSourceTour.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // Close modal and start tour.
  $('#whyOpenSourceTour').click(function () {
    $('#siteTours').modal('hide');
    setTimeout(whyOpenSourceTour, 1000);
  });

})(jQuery, Drupal);
