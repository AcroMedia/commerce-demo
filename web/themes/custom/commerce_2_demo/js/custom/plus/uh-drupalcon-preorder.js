/**
 * Custom scripts (for DrupalCon Preorder).
 */

(function ($, Drupal) {

  /**
   * DrupalCon Preorder - Scripts w/o AJAX events.
   *
   * This section is for general scripts that no not involve any AJAX events.
   */

  // Basic validations for the Drupal Username field.
  $.validate({
    form : '#drupal-username'
  });

  $('.drupal-username__input').on('validation', function(evt, valid) {
    var addToCartButton = $('.product--full--drupalcon-2018-drupal-commerce-tee input.form-submit');
    valid ? addToCartButton.removeClass('disabled') : addToCartButton.addClass('disabled');
  });


  /**
   * DrupalCon Preorder - Scripts w/ AJAX events.
   *
   * This section is for general scripts that involve AJAX events.
   */

  Drupal.behaviors.drupalcon = {
    attach: function(context, settings) {

      if ( $('.drupal-username__form-item').hasClass('has-success') ) {
        $('.product--full--drupalcon-2018-drupal-commerce-tee input.form-submit').once('drupalcon').removeClass('disabled');
      }
      else {
        $('.product--full--drupalcon-2018-drupal-commerce-tee input.form-submit').once('drupalcon').addClass('disabled');
      }
    }
  };

})(jQuery, Drupal);
