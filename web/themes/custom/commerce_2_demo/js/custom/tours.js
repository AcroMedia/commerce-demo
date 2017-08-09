/**
 * Intro.js custom site tours.
 */

(function ($, Drupal) {

  //////////////////
  // Default setup.
  //////////////////

  function tourDefaults(tour) {
    tour.setOption('nextLabel', '>');
    tour.setOption('prevLabel', '<');
    tour.setOption('skipLabel', 'Close');
    tour.setOption('doneLabel', 'Done!');
    tour.setOption('hideNext');
    tour.setOption('hidePrev');
    tour.setOption('tooltipClass', 'introjs-tooltip__custom');
    tour.setOption('highlightClass', 'introjs--helperLayer__custom');
    tour.setOption('tooltipPosition', 'auto');
    tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
    tour.setOption('showBullets', false);
    tour.setOption('showProgress', true);
    tour.setOption('scrollToElement', true);
    tour.setOption('disableInteraction', true);
  }


  ///////////////////////////
  // Multipage tour example.
  ///////////////////////////

  // Page 1.
  function tourExample(){
    var tourExample = introJs();

    // Load defaults.
    tourDefaults(tourExample);

    // Override default.
    tourExample.setOption('doneLabel', 'Next page');

    // Tour steps.
    tourExample.setOptions({
      steps: [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Title</span> ' +
          'Intro attached to nothing'
        },
        {
          element: '.menu__item--facebook',
          intro: '<span class="introjs-tooltip__title">Title</span>' +
          'Facebook'
        },
        {
          element: '#block-views-block-featured-products-block-1 .view-content .views-row:first-of-type',
          intro: '<span class="introjs-tooltip__title">Title</span>' +
          'Pretend we select a product'
        }
      ]
    });

    // Start tour and set page/trigger for page 2.
    tourExample.start().oncomplete(function() {
      window.location.href = 'product/custom-mason-jar?tourExamplePage2=true';
    });
  }

  // Page 2.
  function tourExamplePage2(){
    var tourExamplePage2 = introJs();

    // Load defaults.
    tourDefaults(tourExamplePage2);

    // Tour steps.
    tourExamplePage2.setOptions({
      steps: [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Title</span>' +
          'Welcome to page 2!'
        },
        {
          element: '.commerce-order-item-add-to-cart-form',
          intro: '<span class="introjs-tooltip__title">Title</span>' +
          'The tour continues on a second page!'
        }
      ]
    });

    // Start tour.
    tourExamplePage2.start();
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // tourExample.
  // If not on desired start page, go to that page and append trigger.
  // Otherwise, close modal and start tour.
  $('#tourExample').click(function () {
    if (location.search !== '') {
      window.location.href = '/?startTourExample=true';
    }
    else {
      $('#siteTours').modal('hide');
      setTimeout(tourExample, 1000);
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  // tourExample URL triggers.
  if (RegExp('startTourExample', 'gi').test(window.location.search)) {
    tourExample();
  }
  if (RegExp('tourExamplePage2', 'gi').test(window.location.search)) {
    tourExamplePage2();
  }

})(jQuery, Drupal);
