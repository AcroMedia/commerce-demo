/**
 * Carousel.
 */
(function ($, Drupal) {

  // Carousel.
  if ($('.component-carousel__slider').length) {
    $('.component-carousel__slider').each(function () {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        dots: true,
        focusOnSelect: true,
        arrows: true,
        infinite: true,
        adaptiveHeight: true
      });
    });
  }

})(jQuery, Drupal);
