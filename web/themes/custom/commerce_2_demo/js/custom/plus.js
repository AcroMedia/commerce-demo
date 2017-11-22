/**
 * Custom scripts (for UH+).
 */

(function ($, Drupal) {

  /**
   * General UH+ scripts.
   */

  /**
   * JavaScript function to match (and return) the video Id
   * of any valid Youtube Url, given as input string.
   * @author: Stephan Schmitz <eyecatchup@gmail.com>
   * @url: https://stackoverflow.com/a/10315969/624466
   */
  function ytVidId(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
  }

  // videoModal embed video.
  $('.region-content a').each(function () {
    if ($(this).attr("href") !== 'undefined') {
      // Check link for YouTube video id.
      var $youTubeId = ytVidId($(this).attr("href"));
      // If YouTube video, embed video in modal.
      if ($youTubeId !== false) {
        // Place video into #videoModal div using code from http://embedresponsively.com/.
        $('#videoModal .modal-body').append(
          '<iframe width="560px" height="315px" src="https://www.youtube.com/embed/' +
          $youTubeId +
          '?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
        );
        // Use FitVid on modal-body for responsive video.
        // https://github.com/davatron5000/FitVids.js
        $('.modal-body').fitVids();
      }
    }
  });

  // Open videos in videoModal.
  $('.region-content a').click(function (event) {
    if ($(this).attr("href") !== 'undefined') {
      // Check link for YouTube video id.
      var $youTubeId = ytVidId($(this).attr("href"));
      // If YouTube video, open video in modal.
      if ($youTubeId !== false) {
        event.preventDefault();
        $('#videoModal').modal('show');
      }
    }
  });

  // Stop video playback when videoModal is closed.
  $("#videoModal").on('hidden.bs.modal', function (event) {
    $("#videoModal iframe").attr("src", $("#videoModal iframe").attr("src"));
  });


  /**
   * UH Axe - Scripts w/o AJAX events.
   *
   * This section is for general scripts that no not involve any AJAX events.
   */

  // Move title into first paragraph
  $('.product--full--uh-axe .page-title').prependTo('.paragraph--type--2-column-image-content__content:first');

  // 2 column paragraph highlight Buy Now button.
  $('.field--name-field-unlimited-cta-links a').each(function (event) {
    if ($(this).text() == ('Buy Now' || 'buy now')) {
      $(this).addClass('buy-now');
    }
  });

  // 2 column paragraph CTA click events.
  $('.product--full--uh-axe .field--name-field-unlimited-cta-links a').click(function (event) {
    // Buy now button scroll.
    if ($(this).text() == ('Buy Now' || 'buy now')) {
      // Prevent link default.
      event.preventDefault();
      // Scroll to add to cart form.
      $('html, body').animate({
        scrollTop: $(".paragraph--type--uh-axe-slider").offset().top -40
      }, 700);
    }
  });


  /**
   * UH Axe - Product customization user flow with AJAX events.
   *
   * This section is specific to how the page reveals itself as the user customizes the product.
   */

  // Product customization flow checks used below. Need these to override some default Commerce functionality.
  var uhAxeStep1Complete = null;
  var uhAxeStep2Complete = null;
  var uhAxeStep3Complete = null;
  var deselectedClassApplied = null;

  Drupal.behaviors.uhaxeProductFlow = {
    attach: function(context, settings) {
      // STEP 1 - Handle finish selection
      $('.slick-slider__uh-axe__slide a, .slick-slider__uh-axe-mobile a', context).once('uhaxeProductFlow').click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // Scroll to handle length attribute selector.
        $('html, body').animate({
          scrollTop: $('.attribute-handle-length-container').offset().top -25
        }, 600);

        // Add deselected class to visually remove the default selected option. We want user to choose.
        // This class will be removed when AJAX event fires so we don't need to remove it later.
        $('.attribute-handle-length').addClass('deselected');

        // Fade options into view and set step 1 as completed.
        $('.attribute-handle-length').delay(650).fadeIn(function () {
          $(this).addClass('active');
          uhAxeStep1Complete = true;
        });
      });

      // STEP 2 - Handle length selection.
      $('.attribute-handle-length .attribute-selector', context).once('uhaxeProductFlow').click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // While Drupal is loading selected option, set disabled class to attributes to avoid new selection.
        if (!$(this)) {
          $('.attribute-selector').addClass('disabled');
        }

        // Scroll to head weight attribute selector.
        $('html, body').animate({
          scrollTop: $('.attribute-head-weight-container').offset().top -100
        }, 500);

        // Add deselected class to visually remove the default selected option. We want user to choose.
        // This is different than step 1 because this addClass is only applied WHILE options are loading.
        // *** AFTER options have loaded, we check deselectedClassApplied and apply the class again (further down).
        $('.attribute-head-weight').addClass('deselected');
        deselectedClassApplied = true;

        // Fade options into view and set step 2 as completed.
        $('.attribute-head-weight').fadeIn(function () {
          $(this).addClass('active');
          uhAxeStep2Complete = true;
        });

        // Get the value of the selected attribute.
        // Loop through add to cart form, match attribute values, and trigger click.
        var $dataAttributeValue = $(this).data('attribute-value');

        $('.attribute-widgets input').each(function () {
          var $widgetAttributeValueString = $(this).val();
          var $widgetAttributeValue = parseInt($widgetAttributeValueString);
          if ($widgetAttributeValue === $dataAttributeValue) {
            $(this).click();
          }
        });
      });

      // Add deselected class to visually remove the default handle length selected option. We want user to choose.
      // *** This applies after options have loaded (see note above).
      if (deselectedClassApplied) {
        $('.attribute-head-weight').addClass('deselected');
        deselectedClassApplied = null;
      }

      // STEP 3 - head weight selection.
      $('.attribute-head-weight .attribute-selector', context).once('uhaxeProductFlow').click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // While Drupal is loading selected option, set disabled class to attributes to avoid new selection.
        if (!$(this)) {
          $('.attribute-selector').addClass('disabled');
        }

        // Scroll to main add to cart form.
        $('html, body').animate({
          scrollTop: $('.main-product-form-container').offset().top -100
        }, 500);

        // Fade add to cart form into view and set step 3 as completed.
        $('.main-product-form, .main-product-form__title').fadeIn(function () {
          $(this).addClass('active');
          uhAxeStep3Complete = true;
        });

        // Get the value of the selected attribute.
        // Loop through add to cart form, match attribute values, and trigger click.
        var $dataAttributeValue = $(this).data('attribute-value');

        $('.attribute-widgets input').each(function () {
          var $widgetAttributeValueString = $(this).val();
          var $widgetAttributeValue = parseInt($widgetAttributeValueString);
          if ($widgetAttributeValue === $dataAttributeValue) {
            $(this).click();
          }
        });
      });

      // STEP 1-3 helpers - These keep each steps visible after AJAX has fired.
      if (uhAxeStep1Complete) {
        $('.attribute-handle-length').addClass('active');
      }
      if (uhAxeStep2Complete) {
        $('.attribute-handle-length').addClass('active');
        $('.attribute-head-weight').addClass('active');
      }
      if (uhAxeStep3Complete) {
        $('.attribute-handle-length').addClass('active');
        $('.attribute-head-weight').addClass('active');
        $('.main-product-form, .main-product-form__title, .main-product-form__mobile').addClass('active');
      }
    }
  };


  /**
   * UH Axe - Scripts w/ AJAX events.
   *
   * This section is for general scripts that involve AJAX events.
   */

  Drupal.behaviors.uhaxe = {
    attach: function(context, settings) {
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

      // Update add to cart form selection when selection changes via attribute selector.
      $('.attribute-selector', context).once('uhaxe').click(function (event) {
        event.preventDefault();
        // Get value of attribute selected.
        var $dataAttributeValue = $(this).data('attribute-value');

        // Add to attributes a visual indicator that something is happening.
        $('.attribute-selector').addClass('disabled');

        // Loop through add to cart form, match attribute values, and trigger click.
        $('.attribute-widgets input').each(function () {
          var $widgetAttributeValueString = $(this).val();
          var $widgetAttributeValue = parseInt($widgetAttributeValueString);
          if ($widgetAttributeValue === $dataAttributeValue) {
            $(this).click();
          }
        });
      });

      // Highlight current attribute option based on add to cart form selection.
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
          if ($selectorDataAttributeValue === $widgetAttributeValue) {
            $(this).addClass('selected');
          }
        });

        // Loop through mobile attribute descriptions and show the right one.
        $('.attribute-selector__description--mobile').each(function () {
          var $descriptionAttributeValue = $(this).data('attribute-value');
          if ($descriptionAttributeValue === $widgetAttributeValue) {
            $(this).fadeIn();
          }
        });
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
