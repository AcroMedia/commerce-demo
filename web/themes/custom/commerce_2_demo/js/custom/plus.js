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
        // Add a video class to the link.
        $(this).addClass('video-link');
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

      // Update add to cart form selection when selection changes via attribute selector.
      $('.attribute-selector', context).once('uhaxe').click(function (event) {
        // Prevent link default.
        event.preventDefault();

        // If selection is a handle length attribute, scroll to head weight attribute selector.
        if ($(this).parents().hasClass('attribute-handle-length')) {
          $('html, body').animate({
            scrollTop: $('.attribute-head-weight').offset().top -100
          }, 500);
        }
        // If selection is a head weight attribute, scroll to main add to cart form.
        else if ($(this).parents().hasClass('attribute-head-weight')) {
          $('html, body').animate({
            scrollTop: $('.add-to-cart-form-title').offset().top -100
          }, 500);
        }

        // While Drupal is loading selected option, set disabled class to attributes to avoid new selection.
        if (!$(this).hasClass('selected')) {
          $('.attribute-selector').addClass('disabled');
        }

        // Get value of attribute selected.
        // Then loop through add to cart form, match attribute values, and trigger click.
        var $dataAttributeValue = $(this).data('attribute-value');
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
