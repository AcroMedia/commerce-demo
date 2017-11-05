/**
 * Sliders.
 */

(function ($, Drupal) {

  /**
   * Slick slider.
   */

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

  // UH Axe Slick Slider thumbnails.
  $('.slick-slider__uh-axe-thumbs .field--name-field-ux-axe-slides').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    focusOnSelect: true,
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
          draggable: true,
          arrows: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '75px',
          adaptiveHeight: true,
          draggable: false,
          arrows: true
        }
      }
    ]
  });

})(jQuery, Drupal);
