/**
 * Faceted Search tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Page 1.
  function solrSearchTour(){
    var solrSearchTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Faceted Search Tour</span> ' +
          "Sit back while the Drupal Commerce demo site does the work for you. Want to learn what’s new in commerce? Just follow along this guided tour of faceted search, and how it’s used to build and display products and catalog structures on the site. This powerful method of search and cataloging is utilized by many of the largest websites on the planet, including Amazon."
          + '<br><br>' +
          "Click the Start search button below to get started. We'll search for 'mason jar', and see how a faceted search engine can display results, build product catalogs and show you categories, all on the fly."
        }
      ];

    solrSearchTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(solrSearchTour);

    // Override default.
    solrSearchTour.setOption('doneLabel', 'Start search');

    // Start tour and set page/trigger for page 2.
    solrSearchTour.start().oncomplete(function() {
      window.location.href = '/products?filter=mason+jar?solrSearchTourPage2';
    });
  }

  // Page 2.
  function solrSearchTourPage2(){
    var solrSearchTourPage2 = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Search Results</span>' +
          "Our search for Mason Jar has been completed and we can see some of the results. Let's go through some of the features in detail."
        },
        {
          element: '.site-header__search .region-site-search',
          intro: '<span class="introjs-tooltip__title">Search Input</span>' +
          "It's easy not to think much about your site search, but with a faceted search there is a lot of customization behind the scenes. Most people don’t give much consideration to how products are categorized, cataloged, displayed and searched for on your site until it needs to be changed, then we find out there are limitations. Faceted search throws out the old way of organizing data in a chart and let’s the site “search” for results to build catalog categories and offers filters to your user to explore products and create product groups unique to their shopping needs."
        },
        {
          element: '.view-products .view-content',
          position: 'top',
          scrollTo: 'tooltip',
          intro: '<span class="introjs-tooltip__title">Results You Expect</span>' +
          "The results of a customized faceted search can be seen here. As you can see, all of the results are mason jar related, exactly what we would expect; but did you consider that the search tool is actually generating the catalog structure, and categories too? All custom to your desired search."
          + '<br><br>' +
          "Using facets, we can set what type of content holds more weight in the search results and manipulate what order of importance customers will see the results. For example, a product title may be more important than its description, so we can give the title field a higher priority rating for when results are displayed to the customer."
        },
        {
          element: '#block-items-per-page',
          position: 'bottom-middle-aligned',
          intro: '<span class="introjs-tooltip__title">Sorting Options</span>' +
          "A-Z, low-high, color, number of items, and more. Sorting options are fully configurable to meet whatever requirements you need for your products and content."
        },
        {
          element: '.site-sidebar--desktop .region-page-sidebar',
          position: 'right',
          intro: '<span class="introjs-tooltip__title">Category Filters</span>' +
          "Customizable faceted category filters extend how customers can filter through product and content results. Filter by term, date, range slider (useful for prices), color and more."
          + '<br><br>' +
          "In this demo, we've configured our facets so that only relevant categories are shown. This means that the filters customers see are only those that can apply to the current set of products displayed. This is how customers can narrow down their choices to find exactly what they're looking for."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "This completes the Faceted Search and dynamic catalog tour. This method of product cataloging and search, integrated with Drupal Commerce, is a powerful tool that removes the limits of traditional data structuring - and even better is it doesn't cost anything to use. It’s open source and completely free."
        }
      ];

    solrSearchTourPage2.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(solrSearchTourPage2);

    // Change search term value.
    $('.region-site-search #edit-filter').val('mason jar');

    // Start tour and trigger tour select modal when completed.
    solrSearchTourPage2.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
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
