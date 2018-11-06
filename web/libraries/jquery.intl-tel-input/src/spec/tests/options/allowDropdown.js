"use strict";

describe("allowDropdown:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin with allowDropdown=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        allowDropdown: false
      });
    });

    it("doesn't show the arrow or generate the dropdown markup", function() {
      expect(getSelectedFlagContainer().find(".iti-arrow")).not.toExist();
      expect(getListElement()).not.toExist();
    });

    it("typing a different dial code updates the flag", function() {
      input.val("+4");
      triggerKeyOnInput("4");
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

  });

  describe("init plugin with allowDropdown=false and separateDialCode=true", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        allowDropdown: false,
        separateDialCode: true
      });
    });

    it("doesn't show the arrow or generate the dropdown markup", function() {
      expect(getSelectedFlagContainer().find(".iti-arrow")).not.toExist();
    });

    it("shows selected dial code element", function() {
      expect(getSelectedDialCodeElement()).toExist();
      expect(getSelectedDialCodeElement().text()).toEqual('+1');
    });

  });

  describe("init plugin with allowDropdown=true", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        allowDropdown: true
      });
    });

    it("shows the arrow and generate the dropdown markup", function() {
      expect(getSelectedFlagContainer().find(".iti-arrow")).toExist();
      expect(getListElement()).toExist();
    });

    it("typing a different dial code updates the flag", function() {
      input.val("+4");
      triggerKeyOnInput("4");
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("clicking the selected flag shows the dropdown", function() {
      getSelectedFlagContainer().click();
      expect(getListElement()).toBeVisible();
    });

  });

});
