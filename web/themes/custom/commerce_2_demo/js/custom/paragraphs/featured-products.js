/**
 * Featured Products.
 */
(function ($, Drupal) {

  Drupal.behaviors.featuredProducts = {
    attach: function (context, settings) {

      // Default Slider.
      if ($('.paragraph--view-mode--default .component-featured-products__slider').length) {
        $('.paragraph--view-mode--default .component-featured-products__slider').once().each(function () {
          var $this = $(this);

          // Apply slider if more than 4 items.
          if ($this.children().length > 4) {
            $this.removeClass('component-featured-products__slider--no-slider');
            $this.slick({
              slidesToShow: 4,
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
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 680,
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
          $('.paragraph--view-mode--default .component-featured-products__slider').slick('setPosition');
        });
      }

      // Full Width Slider.
      if ($('.paragraph--view-mode--full-width .component-featured-products__slider').length) {
        $('.paragraph--view-mode--full-width .component-featured-products__slider').once().each(function () {
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
                  breakpoint: 820,
                  settings: {
                    slidesToShow: 3,
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
          $('.paragraph--view-mode--full-width .component-featured-products__slider').slick('setPosition');
        });
      }
    }
  };

})(jQuery, Drupal);
