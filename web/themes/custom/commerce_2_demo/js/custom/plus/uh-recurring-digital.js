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

  // 2 column paragraph buttons.
  $('.product--full--uh-recurring-digital .field--name-field-unlimited-cta-links a').each(function (event) {
    // If Free Trial link.
    if ($(this).text().toLowerCase() === 'try 1-month free!') {
      // Add highlight class.
      $(this).addClass('highlight');
      // Add click event.
      $(this).click(function (event) {
        // Prevent link default.
        event.preventDefault();
        // Scroll to handle finish selector.
        $('html, body').animate({
          scrollTop: $("div[id^='commerce-product-add-to-cart-form']").offset().top -100
        }, 700);
      });
    }
  });


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
