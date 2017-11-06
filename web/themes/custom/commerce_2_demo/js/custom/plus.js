/**
 * Custom scripts (for UH+).
 */

(function ($, Drupal) {

  /**
   * Open YouTube video links in modal.
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
   * UH Axe.
   */

  // Move title into first paragraph
  $('.product--full--uh-axe .page-title').prependTo('.paragraph--type--2-column-image-content__content:first');


  // 2 column paragraph CTA click events.
  $('.field--name-field-unlimited-cta-links a').click(function (event) {
    // Buy now button scroll.
    if ($(this).text() == ('Buy Now' || 'buy now')) {
      // Prevent link default.
      event.preventDefault();
      // Scroll to add to cart form.
      $('html, body').animate({
        scrollTop: $("div[id^='edit-purchased-entity-wrapper']").offset().top -25
      }, 700);
    }
  });

  // Handle finish select button scroll to attribute selection.
  $('.slick-slider__uh-axe__slide a').click(function (event) {
    // Prevent link default.
    event.preventDefault();
    // Scroll to product attributes.
    $('html, body').animate({
      scrollTop: $("div[id^='commerce-product-add-to-cart-form']").offset().top -25
    }, 500);
  });

  // Sync all attribute selections throughout page.
  Drupal.behaviors.uhaxe = {
    attach: function(context, settings) {
      // Update add to cart form selection when selection changes via handle finish slider.
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

      // Update add to cart form selection when selection changes via attribute selector.
      $('.attribute-selector', context).once('uhaxe').click(function (event) {
        event.preventDefault();
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
      });
    }
  };

})(jQuery, Drupal);
