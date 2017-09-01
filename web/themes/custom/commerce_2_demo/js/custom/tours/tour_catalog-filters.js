/**
 * Catalog and filters tour.
 */

(function ($, Drupal) {

  // Page 1.
  function catalogFiltersTour(){
    var catalogFiltersTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Catalog & Filters Tour</span> ' +
          'This tour will show you a basic SOLR catalog page complete with soriting options, category filters, etc. Click > to continue.'
        },
        {
          element: '.view-products .view-content',
          position: 'top',
          scrollTo: 'tooltip',
          intro: '<span class="introjs-tooltip__title">SOLR Search Results</span>' +
          "Apache SOLR's open source enterprise site search powers many of the largest websites on the planet. Its scalable, reliable and extremely flexible, making sure your customers get exactly what they expect."
        },
        {
          element: '.product--teaser',
          intro: '<span class="introjs-tooltip__title">Product Teaser</span>' +
          "Customize your product teaser results any way you wish. Image galleries, sale flags, quick view popups, user ratings, and more. Whatever you need can be done."
        },
        {
          element: '#block-items-per-page',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">Sorting Options</span>' +
          "A-Z, low-high, color, number of items, and more. Sorting options are fully configurable to meet whatever requirements you need for your products and content."
        },
        {
          element: '#block-categories',
          position: 'right',
          intro: '<span class="introjs-tooltip__title">Faceted Category Filters</span>' +
          "Customizable faceted category filters extend how customers can filter through product and content results. Filter by term, date, range slider (useful for prices), color and more.  "
        },
        {
          element: '.pager',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">More Products</span>' +
          "Configure how you would like to show additional products. Pagination is the default, but anything is possible, including load more buttons an infinite scroll."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "This completes the category and filters tour. What you see here is just one possibility, but how your Drupal Commerce catalog is setup is really only limited by your imagination."
        }
      ];

    catalogFiltersTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(catalogFiltersTour);

    // Start tour and trigger tour select modal when completed.
    catalogFiltersTour.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // If not on desired start page, go to that page and append trigger.
  // Otherwise, close modal and start tour.
  $('#catalogFiltersTour').click(function () {
    if (window.location.pathname !== '/products/cat/urban-living-5') {
      window.location.href = '/products/cat/urban-living-5?startCatalogFiltersTour';
    }
    else {
      $('#siteTours').modal('hide');
      setTimeout(catalogFiltersTour, 1000);
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  // catalogFiltersTour URL triggers.
  if (RegExp('startCatalogFiltersTour', 'gi').test(window.location.search)) {
    catalogFiltersTour();
  }

})(jQuery, Drupal);
