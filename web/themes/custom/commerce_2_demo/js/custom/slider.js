/**
 * Sliders.
 */

(function ($, Drupal) {

  /**
   * Slick sliders.
   */

  // Homepage Carousel Slider.
  if ($('.homepage-carousel-slider').length) {
    $('.homepage-carousel-slider').flexslider({
      animation: 'fade',
      slideshow: true,
      controlNav: true,
      directionNav: true,
      smoothHeight: true,
      prevText: '',
      nextText: ''
    });
  }

  // Product Image Slider.
  if ($('.product-slider__main-slider').length) {
    $('.product-slider__main-slider').slick({
      asNavFor: '.product-slider__nav-slider',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      swipe: false,
      accessibility: false,
      draggable: false,
      infinite: false
    });
    $('.product-slider__nav-slider').slick({
      asNavFor: '.product-slider__main-slider',
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      focusOnSelect: true,
      centerMode: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            focusOnSelect: true,
            centerMode: false,
            infinite: false
          }
        }
      ]
    });
  }

  // Product Image Slider Ajax.
  Drupal.behaviors.productSlider = {
    attach: function (context, settings) {
      // Commerce add to cart form.
      $('form.commerce-order-item-add-to-cart-form', context).once().each(function () {
        // Grab the current product variation ID.
        var $current_product_variation_id = $(this).data('product-variation-id');

        if ($('.product-slider__main-slider').length) {
          var $nav_item = $('.product-slider__nav-slider__item[data-product-variation-id="' + $current_product_variation_id +'"]').parent();
          var $item_position = $('.product-slider__nav-slider .slick-slide').index($nav_item);

          // Trigger Slick to go to current variation image.
          $('.product-slider__nav-slider').slick('slickGoTo', $item_position);
        }
      });
    }
  };

  // UH Axe Slick Slider.
  $('.slick-slider__uh-axe .field--name-field-ux-axe-slides').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    swipe: true,
    draggable: false,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.slick-slider__uh-axe-thumbs .field--name-field-ux-axe-slides'
  });
  $('.slick-slider__uh-axe-thumbs .field--name-field-ux-axe-slides').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    focusOnSelect: true,
    swipe: false,
    draggable: false,
    arrows: true,
    asNavFor: '.slick-slider__uh-axe .field--name-field-ux-axe-slides',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          adaptiveHeight: true,
          swipe: false,
          draggable: false,
          arrows: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '45px',
          adaptiveHeight: true,
          swipe: false,
          draggable: false,
          arrows: true
        }
      }
    ]
  });

})(jQuery, Drupal);
