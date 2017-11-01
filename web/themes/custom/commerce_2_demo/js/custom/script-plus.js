/**
 * Custom scripts (for UH+).
 */
(function ($, Drupal) {
  // UH Axe Slick Slider.
  $('.slick-slider__uh-axe .field--name-field-ux-axe-slides').slick({
    accessibility: true,
    swipe: true,
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
})(jQuery, Drupal);
