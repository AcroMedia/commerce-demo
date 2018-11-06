"use strict";

describe("preferredCountries option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init plugin with empty preferredCountries", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        preferredCountries: [],
      });
    });

    it("defaults to the first country in the alphabet", function() {
      // Afghanistan
      expect(getSelectedFlagElement()).toHaveClass("af");
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries);
    });

  });



  describe("init plugin with preferredCountries", function() {

    var preferredCountries;

    beforeEach(function() {
      // United Kingdom
      preferredCountries = ['gb'];
      iti = window.intlTelInput(input[0], {
        preferredCountries: preferredCountries,
      });
    });

    afterEach(function() {
      preferredCountries = null;
    });

    it("defaults to the first preferredCountries", function() {
      expect(getSelectedFlagElement()).toHaveClass(preferredCountries[0]);
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries + preferredCountries.length);
    });

  });

});
