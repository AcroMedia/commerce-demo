// jscs:disable maximumLineLength
(function ($) {
  "use strict";
  $.fn.extend({
    counter: function (options) {
      var defaults = {

        // {char || word}
        type: "char",

        // count {up || down} from or to the goal number
        count: "down",

        // count {to || from} this number
        goal: 140,

        // Show description of counter
        text: true,

        // Specify target for the counter
        target: false,

        // Append target, otherwise prepend
        append: true,

        // Provide translate text for counter message
        translation: "",

        // Custom counter message
        msg: "",

        // Custom counter container class
        containerClass: ""
      };
      var $countObj = "",
        countIndex = "",
        noLimit = false,

        // Pass {} as first argument to preserve defaults/options for comparison
        options = $.extend({}, defaults, options);

      // Adds the counter to the page and binds counter to user input fields
      var methods = {
        init: function ($obj) {
          var objID = $obj.attr("id"),
            counterID = objID + "_count";

          // Check if unlimited typing is enabled
          methods.isLimitless();

          // Insert counter after or before text area/box
          $countObj = $("<span id=" + counterID + "/>");
          var counterDiv = $("<div role='status'/>").attr("id", objID + "_counter").append($countObj)
            .append(" " + methods.setMsg());
          if (options.containerClass && options.containerClass.length) {

            // Add the custom container class if one is specified
            counterDiv.addClass(options.containerClass);
          }
          if (!options.target || !$(options.target).length) {

            // Target is not specified or invalid
            options.append ? counterDiv.insertAfter($obj) : counterDiv.insertBefore($obj);
          } else {

            // Append/prepend counter to specified target
            options.append ?
              $(options.target).append(counterDiv) :
              $(options.target).prepend(counterDiv);
          }

          // Set aria-controls attribute of text area/box
          $obj.attr('aria-controls', objID + '_counter');

          // Bind methods to events
          methods.bind($obj);
        },

        // Bind everything!
        bind: function ($obj) {
          $obj.on(
            "keypress.counter keydown.counter keyup.counter blur.counter focus.counter change.counter paste.counter",
            methods.updateCounter);
          $obj.on("keydown.counter", methods.doStopTyping);
          $obj.trigger("keydown");
        },

        // Enables uninterrupted typing ( just counting )
        isLimitless: function () {
          if (options.goal === "sky") {

            // Override to count up
            options.count = "up";

            // methods.isGoalReached will always return false
            noLimit = true;
            return noLimit;
          }
        },
        // Sets the appropriate message after counter
        setMsg: function () {

          // Show custom message
          if (options.msg !== "") {
            return options.msg;
          }

          // Show no message
          if (options.text === false) {
            return "";
          }

          // Only show custom message if there is one
          if (noLimit) {
            if (options.msg !== "") {
              return options.msg;
            } else {
              return "";
            }
          }
          this.text = options.translation || "character word left max";
          this.text = this.text.split(" ");
          this.chars = "s ( )".split(" ");
          this.msg = null;
          switch (options.type) {
            case "char":
              if (options.count === defaults.count && options.text) {

                // x character( s ) left
                this.msg = this.text[0] + this.chars[1] + this.chars[0] + this.chars[2] +
                  " " + this.text[2];
              } else if (options.count === "up" && options.text) {

                // x characters ( x max )
                this.msg = this.text[0] + this.chars[0] + " " + this.chars[1] + options.goal +
                  " " + this.text[3] + this.chars[2];
              }
              break;
            case "word":
              if (options.count === defaults.count && options.text) {

                // x word( s ) left
                this.msg = this.text[1] + this.chars[1] + this.chars[0] + this.chars[2] +
                  " " + this.text[2];
              } else if (options.count === "up" && options.text) {

                // x word( s ) ( x max )
                this.msg = this.text[1] + this.chars[1] + this.chars[0] + this.chars[2] +
                  " " + this.chars[1] + options.goal + " " + this.text[3] + this.chars[2];
              }
              break;
            default:
          }
          return this.msg;
        },
        /* Returns the amount of words passed in the val argument
         * @param val Words to count */
        getWords: function (val) {
          if (val !== "") {
            return $.trim(val).replace(/\s+/g, " ").split(" ").length;
          } else {
            return 0;
          }
        },
        updateCounter: function (e) {

          // If the element has the contentedtiable attribute, use the text value.
          // Otherwise use an input value
          var $value = ($(this).attr("contentEditable") == "true") ? $(this).text() : $(this).val();

          // Is the goal amount passed? ( most common when pasting )
          if (countIndex < 0 || countIndex > options.goal) {
            methods.passedGoal($(this));
          }

          // Counting characters...
          if (options.type === defaults.type) {

            // ...down
            if (options.count === defaults.count) {
              countIndex = options.goal - $value.length;

              // Prevent negative counter
              if (countIndex <= 0) {
                $countObj.text("0");
              } else {
                $countObj.text(countIndex);
              }

              // ...up
            } else if (options.count === "up") {
              countIndex = $value.length;
              $countObj.text(countIndex);
            }

            // Counting words...
          } else if (options.type === "word") {

            // ...down
            if (options.count === defaults.count) {

              // Count words
              countIndex = methods.getWords($value);
              if (countIndex <= options.goal) {

                // Subtract
                countIndex = options.goal - countIndex;

                // Update text
                $countObj.text(countIndex);
              } else {

                // Don't show negative number count
                $countObj.text("0");
              }

              // ...up
            } else if (options.count === "up") {
              countIndex = methods.getWords($value);
              $countObj.text(countIndex);
            }
          }
        },
        /* Stops the ability to type */
        doStopTyping: function (e) {

          // backspace, delete, tab, left, up, right, down, end, home, spacebar
          var keys = [46, 8, 9, 35, 36, 37, 38, 39, 40, 32];
          if (methods.isGoalReached(e)) {

            // NOTE: // Using !$.inArray( e.keyCode, keys as a condition causes delays
            if (e.keyCode !== keys[0] && e.keyCode !== keys[1] && e.keyCode !== keys[2] &&
              e.keyCode !== keys[3] && e.keyCode !== keys[4] && e.keyCode !== keys[5] &&
              e.keyCode !== keys[6] && e.keyCode !== keys[7] && e.keyCode !== keys[8]) {

              // Stop typing when counting characters
              if (options.type === defaults.type) {
                // Allows command/control
                if (!e.keyCode === 49 || !e.keyCode === 17) {
                  return false;
                }

                // Counting words, only allow backspace & delete
              } else {
                return (e.keyCode !== keys[9] && e.keyCode !== keys[1] && options.type != defaults.type);
              }
            }
          }
        },
        /* Checks to see if the goal number has been reached */
        isGoalReached: function (e, _goal) {
          if (noLimit) {
            return false;
          }

          // Counting down
          if (options.count === defaults.count) {
            _goal = 0;
            return (countIndex <= _goal);
          } else {

            // Counting up
            _goal = options.goal;
            return (countIndex >= _goal);
          }
        },
        /* Removes extra words when the amount of words in
         * the input go over the desired goal.
         * @param {Number} numOfWords Amount of words you would like shown
         * @param {String} text The full text to condense */
        wordStrip: function (numOfWords, text) {

          // Get the word count by counting the spaces ( after eliminating trailing white space )
          var wordCount = text.replace(/\s+/g, " ").split(" ").length;
          text = $.trim(text);

          // Make it worth executing
          if (numOfWords <= 0 || numOfWords === wordCount) {
            return text;
          } else {
            text = $.trim(text).split(" ");
            text.splice(numOfWords, wordCount, "");
            return $.trim(text.join(" "));
          }
        },
        // If the goal is passed, trim the chars/words down to what is allowed. Also, reset the counter.
        passedGoal: function ($obj) {
          var userInput = $obj.val();
          if (options.type === "word") {
            $obj.val(methods.wordStrip(options.goal, userInput));
          }
          if (options.type === "char") {
            $obj.val(userInput.substring(0, options.goal));
          }

          // Reset to 0
          if (options.type === "down") {
            $countObj.val("0");
          }

          // Reset to goal
          if (options.type === "up") {
            $countObj.val(options.goal);
          }
        }
      };
      return this.each(function () {
        methods.init($(this));
      });
    }
  });
})(jQuery);