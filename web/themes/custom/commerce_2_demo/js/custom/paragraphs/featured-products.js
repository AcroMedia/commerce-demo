/**
 * Featured Products.
 */
(function ($, Drupal) {

  Drupal.behaviors.featuredProducts = {
    attach: function (context, settings) {

      // Slider.
      if ($('.component-featured-products__slider').length) {
        $('.component-featured-products__slider').once().each(function () {
          var $this = $(this);

          // Apply slider if more than 6 items.
          if ($this.children().length > 6) {
            $this.removeClass('component-featured-products__slider--no-slider');
            $this.slick({
              slidesToShow: 6,
              slidesToScroll: 1,
              arrows: true,
              fade: false,
              swipe: false,
              accessibility: false,
              draggable: false,
              infinite: false,
              mobileFirst: false,
              responsive: [
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 600,
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
          }
        });

        // Refresh slick position whenever a tab change happens.
        // Fixes weird display issues with slick slider when items are hidden.
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          $('.component-featured-products__slider').slick('setPosition');
        });
      }

    }
  };

})(jQuery, Drupal);
