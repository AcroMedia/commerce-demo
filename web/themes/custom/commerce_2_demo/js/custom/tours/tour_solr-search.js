/**
 * SOLR Search tour.
 */

(function ($, Drupal) {

  // Page 1.
  function solrSearchTour(){
    var solrSearchTour = introJs();

    // Load defaults.
    tourDefaults(solrSearchTour);

    // Override default.
    solrSearchTour.setOption('doneLabel', 'Start search');

    // Tour steps.
    solrSearchTour.setOptions({
      steps: [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">SOLR Search Tour</span> ' +
          "This tour will go through a site search using the popular, open source Apache SOLR search platform. SOLR's powerfull search is utilized by many of the largest websites on the planet."
          + '<br><br>' +
          "Click the Start search button below to get started. We'll search for 'mason jar'."
        }
      ]
    });

    // Start tour and set page/trigger for page 2.
    solrSearchTour.start().oncomplete(function() {
      window.location.href = '/products?filter=mason+jar?solrSearchTourPage2';
    });
  }

  // Page 2.
  function solrSearchTourPage2(){
    var solrSearchTourPage2 = introJs();

    // Load defaults.
    tourDefaults(solrSearchTourPage2);

    // Tour steps.
    solrSearchTourPage2.setOptions({
      steps: [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Search Results</span>' +
          "Our search for Mason Jar has been completed and we can see some of the results. We'll now go through some of the features that make up the search results."
        },
        {
          element: '.site-header__search .region-site-search',
          intro: '<span class="introjs-tooltip__title">Search Input</span>' +
          "It's easy not to think much about your site search, but with SOLR there is a lot of customization behind the scenes. SOLR lets us customize exactly what fields are being search for. If we only want product titles to be searchable, we can do that. If we want everything but the title, we can do that too."
        },
        {
          element: '.view-products .view-content',
          scrollTo: 'tooltip',
          intro: '<span class="introjs-tooltip__title">SOLR Search Results</span>' +
          "The results of a customized search can be seen here. As you can see, all of the results are mason jar related, exactly what we would expect. "
          + '<br><br>' +
          "With SOLR, we can set what type of content holds more weight in the search results. So, for example, a product title may be more important than its description, so we can give the title field a higher priority rating for when results are displayed to the customer."
        },
        {
          element: '#block-items-per-page',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">Sorting Options</span>' +
          "A-Z, low-high, color, number of items, and more. Sorting options are fully configurable to meet whatever requirements you need for your products and content."
        },
        {
          element: '.region-page-sidebar',
          position: 'right',
          intro: '<span class="introjs-tooltip__title">Faceted Category Filters</span>' +
          "Customizable faceted category filters extend how customers can filter through product and content results. Filter by term, date, range slider (useful for prices), color and more."
          + '<br><br>' +
          "In this demo, we've configured our facets so that only relevant categories are shown. This means that the filters customers see are only those that can apply to the current set of products displayed. This is how customers can narrow down their choices to find exactly what they're looking for."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "This completes the SOLR Search tour. SOLR integrated into Drupal Commerce is a powerful tool, and even better is it doesn't cost anything to use."
          + '<br><br>' +
          "If you're interested in learning more about Apache SOLR, visit their website at " + '<a href="http://lucene.apache.org/solr/" target="_blank">lucene.apache.org/solr</a>.'
        }
      ]
    });

    // Change search term value.
    $('.region-site-search #edit-filter').val('mason jar');

    // Start tour.
    solrSearchTourPage2.start();
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // Close modal and start tour.
  $('#solrSearchTour').click(function () {
    $('#siteTours').modal('hide');
    setTimeout(solrSearchTour, 1000);
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  if (RegExp('solrSearchTourPage2', 'gi').test(window.location.search)) {
    solrSearchTourPage2();
  }

})(jQuery, Drupal);
