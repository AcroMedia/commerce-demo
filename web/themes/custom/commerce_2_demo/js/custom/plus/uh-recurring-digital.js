/**
 * Custom scripts (for UH+).
 */

(function ($, Drupal) {

  /**
   * UH Recurring Digital - Scripts w/o AJAX events.
   *
   * This section is for general scripts that no not involve any AJAX events.
   */

  // Move title into first paragraph
  $('.product--full--uh-recurring-digital .page-title').prependTo('.paragraph--type--2-column-image-content__content:first');

  // Paragraph buttons.
  $('.product--full--uh-recurring-digital .paragraph a').each(function (event) {
    // If Free Trial or View Pricing link.
    if (($(this).text().toLowerCase() === 'try 1-month free!') || ($(this).text().toLowerCase() === 'free 30-day trial')  || ($(this).text().toLowerCase() === 'view pricing')) {
      // Add highlight class.
      $(this).addClass('highlight');
      // Add click event.
      $(this).click(function (event) {
        // Prevent link default.
        event.preventDefault();
        // Scroll to add to cart form.
        $('html, body').animate({
          scrollTop: $(".plan-formatter").offset().top -200
        }, 700);
      });
    }

    // If View Specs link.
    if ($(this).text().toLowerCase() === 'view specs') {
      // Add click event.
      $(this).click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // Scroll to and activate spec tab, if available.
        if ($('.nav-tabs a[href="#specifications"]').length) {
          $('html, body').animate({
            scrollTop: $(".features-and-specs").offset().top
          }, 700);
          $('.nav-tabs a[href="#specifications"]').tab('show');
        }
        // Else, scroll to and activate interface tab, if available.
        else if ($('.nav-tabs a[href="#interface"]').length) {
          $('html, body').animate({
            scrollTop: $(".features-and-specs").offset().top
          }, 700);
          $('.nav-tabs a[href="#interface"]').tab('show');
        }
        // Else, just scroll to the add to cart form.
        else {
          $('html, body').animate({
            scrollTop: $(".plan-formatter").offset().top -200
          }, 700);
        }
      });
    }

    // If See Reviews link.
    if ($(this).text().toLowerCase() === 'see reviews') {
      // Add click event.
      $(this).click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // Scroll to and activate reviews tab, if available.
        if ($('.nav-tabs a[href="#reviews"]').length) {
          $('html, body').animate({
            scrollTop: $(".features-and-specs").offset().top
          }, 700);
          $('.nav-tabs a[href="#reviews"]').tab('show');
        }
        // Else, just scroll to add to cart form.
        else {
          $('html, body').animate({
            scrollTop: $(".plan-formatter").offset().top -200
          }, 700);
        }
      });
    }
  });

  // Interface gallery Magnific popup.
  if ($('.interface__slideshow').length) {
    $('.interface__slideshow-link').on('click', function (event) {
      $('.interface__slideshow a').magnificPopup('open');
    });

    $('.interface__slideshow a').magnificPopup({
      type: 'image',
      gallery: {
        preload: [1,1],
        enabled: true
      },
      mainClass: 'mfp-fade'
    });
  }


  /**
   * UH Recurring Digital - Scripts w/ AJAX events.
   *
   * This section is for general scripts that involve AJAX events.
   */

  Drupal.behaviors.uhrecurring = {
    attach: function(context, settings) {

      // Do stuff here.

    }
  };

})(jQuery, Drupal);
