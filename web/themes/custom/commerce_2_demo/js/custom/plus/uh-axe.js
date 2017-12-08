/**
 * Custom scripts (for UH+).
 */

(function ($, Drupal) {

  /**
   * UH Axe - Scripts w/o AJAX events.
   *
   * This section is for general scripts that no not involve any AJAX events.
   */

  // Move title into first paragraph
  $('.product--full--uh-axe .page-title').prependTo('.paragraph--type--2-column-image-content__content:first');

  // 2 column paragraph buttons.
  $('.product--full--uh-axe .field--name-field-unlimited-cta-links a').each(function (event) {
    // If Customize My Axe link.
    if ($(this).text().toLowerCase() === 'customize my axe') {
      // Add highlight class.
      $(this).addClass('highlight');
      // Add click event.
      $(this).click(function (event) {
        // Prevent link default.
        event.preventDefault();
        // Scroll to handle finish selector.
        $('html, body').animate({
          scrollTop: $(".paragraph--type--uh-axe-slider").offset().top -100
        }, 700);
      });
    }
  });

  // Get Started text scroll to handle finish selector.
  $('.uh-axe-get-started').click(function () {
    $('html, body').animate({
      scrollTop: $(".paragraph--type--uh-axe-slider").offset().top -100
    }, 600);
  });

  // Set user default product variation if one has been selected.
  if ($('.default-variation-id').length) {
    // Get variation ID and current URL.
    var $defaultVariationID = $('.default-variation-id').data('default-variation-id');
    var $currentURL = window.location.href;

    // If URL does not contains variation query, load the default.
    if ($currentURL.indexOf("?v=") < 0) {
      window.location.replace($currentURL + '?v=' + $defaultVariationID)
    }
  }


  /**
   * UH Axe - Scripts w/ AJAX events.
   *
   * This section is for general scripts that involve AJAX events.
   */

  Drupal.behaviors.uhaxe = {
    attach: function(context, settings) {

      // When handle finish selected, scroll to handle length attributes.
      $('.slick-slider__uh-axe__slide a, .slick-slider__uh-axe-mobile a', context).once('uhaxe').click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // Scroll to handle length attribute selector.
        $('html, body').animate({
          scrollTop: $('.attribute-handle-length').offset().top -25
        }, 600);
      });

      // Update add to cart form selection when selection changes via handle finish slider.
      // By clicking on thumbnail.
      $('.slick-slider__uh-axe-thumbs .slick-slider__uh-axe__thumb', context).once('uhaxe').click(function (event) {
        // Get value of attribute selected.
        var $dataAttributeValue = $(this).data('attribute-value');

        // Loop through add to cart form, match attribute values, and trigger click.
        $('.attribute-widgets input').each(function () {
          var $widgetAttributeValueString = $(this).val();
          var $widgetAttributeValue = parseInt($widgetAttributeValueString);

          if ($widgetAttributeValue === $dataAttributeValue) {
            $(this).click();
          }
        });
      });
      // By using arrow nav.
      $('.slick-slider__uh-axe-thumbs .slick-arrow', context).once('uhaxe').click(function (event) {
        // Get value of current attribute selected.
        var $dataAttributeValue = $('.slick-slider__uh-axe-thumbs .slick-current .slick-slider__uh-axe__thumb').data('attribute-value');

        // Loop through add to cart form, match attribute values, and trigger click.
        $('.attribute-widgets input').each(function () {
          var $widgetAttributeValueString = $(this).val();
          var $widgetAttributeValue = parseInt($widgetAttributeValueString);

          if ($widgetAttributeValue === $dataAttributeValue) {
            $(this).click();
          }
        });
      });

      // Move added UH Sheath add to cart form selection into attributes-widget container.
      // This needs to be here because AJAX events would reset it's position if it was outside Drupal.behaviors.
      $("fieldset[data-drupal-selector='edit-include-bundle']").insertBefore('.product--rendered-attribute');

      // Update add to cart form selection when selection changes via attribute selector.
      // IMPORTANT: We need :not(.disabled) to prevent multiple clicks during AJAX event.
      $('.attribute-selector:not(.disabled)', context).once('uhaxe').click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // If selection is a handle length attribute, scroll to head weight attribute selector.
        if ($(this).parents().hasClass('attribute-handle-length')) {
          $('html, body').animate({
            scrollTop: $('.attribute-head-weight').offset().top -100
          }, 500);
        }
        // If selection is a head weight attribute, scroll to sheath selector.
        else if ($(this).parents().hasClass('attribute-head-weight')) {
          $('html, body').animate({
            scrollTop: $('.attribute-bundle').offset().top -100
          }, 500);
        }
        // If selection is a sheath bundle option, toggle classes and scroll to main add to cart form.
        else if ($(this).parents().hasClass('attribute-bundle')) {
          if (!$(this).hasClass('selected')) {
            $('.attribute-bundle .selected').removeClass('selected');
            $(this).addClass('selected');
          }

          // Show or hide price disclaimer depending on which bundle option selected.
          if ($(this).data('bundle-value') === 1) {
            $('.product__intro__disclaimer').slideDown('fast');
          }
          else {
            $('.product__intro__disclaimer').slideUp('fast');
          }

          // Scroll to main add to cart form.
          $('html, body').animate({
            scrollTop: $('.add-to-cart-form-title').offset().top -100
          }, 500);
        }

        // While Drupal is loading selected option, set disabled class to attributes to avoid new selection.
        // Only do this for actual attributes an not the sheath bundle options.
        if (!$(this).hasClass('selected') && !$(this).parents().hasClass('attribute-bundle')) {
          $('.attribute-selector').addClass('disabled');
        }

        // Get value of attribute and sheath bundle options selected.
        var $dataAttributeValue = $(this).data('attribute-value');
        var $dataBundleValue = $(this).data('bundle-value');

        // Then loop through add to cart form, match attribute values, and trigger change.
        $('.attribute-widgets input').each(function () {
          var $widgetAttributeValueString = $(this).val();
          var $widgetAttributeValue = parseInt($widgetAttributeValueString);

          // For normal product attributes.
          if ($widgetAttributeValue === $dataAttributeValue) {
            $(this).click();
          }
          // For added bundle option.
          else if ($widgetAttributeValue === $dataBundleValue) {
            $(this).prop("checked", true);
          }
        });

        // Also loop through mobile sheath bundle option descriptions and show the right one.
        // Only need this because the sheath bundle option isn't a normal product attribute.
        $('.attribute-bundle .attribute-selector__description--mobile').each(function () {
          var $descriptionBundleValue = $(this).data('bundle-value');
          if ($dataBundleValue === $descriptionBundleValue) {
            $(this).fadeIn();
          }
        });
      });

      // Highlight current attribute option based on add to cart form selection.
      // This happens during any AJAX event which includes attribute selection in add to cart form.
      $('.attribute-widgets input:checked', context).once('uhaxe').each(function () {
        // Get attribute value of selected add to cart form attribute.
        var $widgetAttributeValueString = $(this).val();
        var $widgetAttributeValue = parseInt($widgetAttributeValueString);

        // Loop through handle finish slides, match attribute value, and trigger click on slide.
        $('.slick-slider__uh-axe-thumbs .slick-slider__uh-axe__thumb').each(function () {
          var $slideDataAttributeValue = $(this).data('attribute-value');
          if ($slideDataAttributeValue === $widgetAttributeValue) {
            $(this).click();
          }
        });

        // Loop through attribute selectors, match attribute values, and add selected class.
        $('.attribute-selector').each(function () {
          var $selectorDataAttributeValue = $(this).data('attribute-value');
          var $selectorDataBundleValue = $(this).data('bundle-value');

          // For normal product attributes.
          if ($widgetAttributeValue === $selectorDataAttributeValue) {
            $(this).addClass('selected');
          }
          // For added bundle option.
          else if ($widgetAttributeValue === $selectorDataBundleValue) {
            $('.attribute-bundle .selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });

        // Loop through all mobile attribute descriptions and show the right one.
        $('.attribute-selector__description--mobile').each(function () {
          var $descriptionAttributeValue = $(this).data('attribute-value');
          var $descriptionBundleValue = $(this).data('bundle-value');

          if ($widgetAttributeValue === ($descriptionAttributeValue || $descriptionBundleValue)) {
            $(this).fadeIn();
          }
        });

        // Show price disclaimer when bundle option selected.
        if ($("fieldset[data-drupal-selector='edit-include-bundle'] input:checked").val() === "1") {
          $('.product__intro__disclaimer').show();
        }
      });

      // Highlight current option based on add to cart form sheath bundle selection.
      // IMPORTANT: This is unique to the sheath because we DO NOT want it to happen during AJAX event.
      $("fieldset[data-drupal-selector='edit-include-bundle'] .form-item", context).once('uhaxe').click(function (event) {
        if ($.active) {
          event.preventDefault();
        }
        else {
          if (!$(this).find('input').is(':checked')) {
            // Get attribute value of selected add to cart form attribute.
            var $widgetBundleValueString = $(this).find('input').val();
            var $widgetBundleValue = parseInt($widgetBundleValueString);

            // Loop through attribute selectors, match attribute values, and add selected class.
            $('.attribute-bundle .attribute-selector').each(function () {
              var $selectorDataBundleValue = $(this).data('bundle-value');
              if ($widgetBundleValue === $selectorDataBundleValue) {
                $('.attribute-bundle .selected').removeClass('selected');
                $(this).addClass('selected');
              }
            });

            // Loop through mobile attribute description and show the right one.
            $('.attribute-selector__description--mobile').each(function () {
              var $descriptionBundleValue = $(this).data('bundle-value');
              if ($widgetBundleValue === $descriptionBundleValue) {
                $(this).fadeIn();
              }
              else {
                $(this).hide();
              }
            });

            // Show or hide price disclaimer depending on which bundle option selected.
            if ($widgetBundleValue === 1) {
              $('.product__intro__disclaimer').slideDown('fast');
            }
            else {
              $('.product__intro__disclaimer').slideUp('fast');
            }
          }
        }
      });

      // Review highlights.
      $('.product__images__overlay-marker', context).once('uhaxe').click(function (event) {
        // Prevent link default action.
        event.preventDefault();
        // Fade in overlay.
        $('.product__images__overlay').fadeIn();
        // Fade in content.
        if ($(this).hasClass('product__images__overlay-marker--1')) {
          $('.product__images__overlay-content__1').delay(500).fadeIn();
        }
        else if ($(this).hasClass('product__images__overlay-marker--2')) {
          $('.product__images__overlay-content__2').delay(500).fadeIn();
        }
        else if ($(this).hasClass('product__images__overlay-marker--3')) {
          $('.product__images__overlay-content__3').delay(500).fadeIn();
        }
        else if ($(this).hasClass('product__images__overlay-marker--4')) {
          $('.product__images__overlay-content__4').delay(500).fadeIn();
        }
        else if ($(this).hasClass('product__images__overlay-marker--5')) {
          $('.product__images__overlay-content__5').delay(500).fadeIn();
        }
        // Fade in close button and nav.
        $('.product__images__overlay-content__close, .product__images__overlay-content__nav').delay(200).fadeIn();
      });

      // Review highlights - Close.
      $('.product__images__overlay-content__close, .product__images__overlay', context).once('uhaxe').click(function (event) {
        // Prevent link default action.
        event.preventDefault();
        // Fade out close button, nav and content.
        $('.product__images__overlay-content__close, .product__images__overlay-content__nav, .product__images__overlay-content__1, .product__images__overlay-content__2, .product__images__overlay-content__3, .product__images__overlay-content__4, .product__images__overlay-content__5').fadeOut('fast');
        // Fade out overlay.
        $('.product__images__overlay').delay(150).fadeOut('fast');
      });

      // Review highlights - Previous and next buttons.
      // Previous.
      $('.product__images__overlay-content__nav__prev', context).once('uhaxe').click(function (event) {
        // Prevent link default action.
        event.preventDefault();
        // Move back and loop to the end if at first content piece.
        if ($(".product__images__overlay-content div:visible").prev().length !== 0)
          $(".product__images__overlay-content div:visible").fadeOut().prev().delay(500).fadeIn();
        else {
          $(".product__images__overlay-content div:visible").fadeOut();
          $(".product__images__overlay-content div:last").delay(500).fadeIn();
        }
        return false;
      });
      // Next.
      $('.product__images__overlay-content__nav__next', context).once('uhaxe').click(function (event) {
        // Prevent link default action.
        event.preventDefault();
        // Move next and loop to beginning if at last content piece.
        if ($(".product__images__overlay-content div:visible").next().length !== 0)
          $(".product__images__overlay-content div:visible").fadeOut().next().delay(500).fadeIn();
        else {
          $(".product__images__overlay-content div:visible").fadeOut();
          $(".product__images__overlay-content div:first").delay(500).fadeIn();
        }
        return false;
      });

      // Mobile add to cart button trigger.
      $('.add-to-cart-trigger', context).once('uhaxe').click(function (event) {
        event.preventDefault();
        // Would the real add to cart button please be clicked.
        $('input[data-drupal-selector="edit-submit"]').click();
      });
    }
  };

})(jQuery, Drupal);
