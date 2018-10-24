/**
 * Content Carousel.
 */
(function ($, Drupal) {

  // Content Carousel.
  if ($('.component-content-carousel__slider').length) {
    $('.component-content-carousel__slider').each(function () {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        dots: false,
        focusOnSelect: true,
        infinite: false,
        adaptiveHeight: true
      });
    });
  }

})(jQuery, Drupal);
