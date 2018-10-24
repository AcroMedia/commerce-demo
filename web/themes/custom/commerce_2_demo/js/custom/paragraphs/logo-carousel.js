/**
 * Logo Carousel.
 */
(function ($, Drupal) {

  // Logo Carousel.
  if ($('.component-logo-carousel__slider').length) {
    $('.component-logo-carousel__slider').each(function () {
      $(this).slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        dots: false,
        focusOnSelect: true,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 720,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });
  }

})(jQuery, Drupal);
