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
    var usernameMessage = $('.drupalcon-preorder__username');

    // Remove disabled class if valid and product is in stock.
    // Add or remove hidden class to username error message.
    if (valid) {
      usernameMessage.addClass('hidden');
    }
    else if ( valid && $('.drupalcon-preorder__out-of-stock').hasClass('hidden') ) {
      usernameMessage.addClass('hidden');
      addToCartButton.removeClass('disabled');
    }
    else {
      usernameMessage.removeClass('hidden');
      addToCartButton.addClass('disabled');
    }
  });


  /**
   * DrupalCon Preorder - Scripts w/ AJAX events.
   *
   * This section is for general scripts that involve AJAX events.
   */

  Drupal.behaviors.drupalcon = {
    attach: function(context, settings) {
      var addToCartButton = $('.product--full--drupalcon-2018-drupal-commerce-tee input.form-submit');
      var $selectedAttribute = $('.drupalcon-preorder-form select > option:selected').once('drupalcon').val();
      var outOfStockMessage = $('.drupalcon-preorder__out-of-stock');

      // Match selected option with attribute, and set whether in stock or not.
      $('.drupalcon-preorder-attribute').once('drupalcon').each(function () {
        var $attributeId = $(this).data('attribute-id').toString();
        var $stock = $(this).data('stock');

        if (($selectedAttribute === $attributeId) && ($stock === 'out-of-stock')) {
          outOfStockMessage.removeClass('hidden');
          addToCartButton.addClass('disabled');
        }
      });

      // Remove disabled class if valid has passed and product is in stock.
      // Add or remove hidden class to username error message.
      if ( $('.drupal-username__form-item').hasClass('has-success') ) {
        $('.drupalcon-preorder__username').addClass('hidden');
      }
      else if ( $('.drupal-username__form-item').hasClass('has-success') && $('.drupalcon-preorder__out-of-stock').hasClass('hidden') ) {
        $('.drupalcon-preorder__username').addClass('hidden');
        addToCartButton.once('drupalcon').removeClass('disabled');
      }
      else {
        $('.drupalcon-preorder__username').removeClass('hidden');
        addToCartButton.once('drupalcon').addClass('disabled');
      }
    }
  };

})(jQuery, Drupal);
