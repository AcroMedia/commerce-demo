/*!
* jQuery Text Counter Plugin v0.8.0
* https://github.com/ractoon/jQuery-Text-Counter
*
* Copyright 2014 ractoon
* Released under the MIT license
*/
;(function($) {
    $.textcounter = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data('textcounter', base);

        base.init = function() {
            base.options = $.extend({}, $.textcounter.defaultOptions, options);

            // append the count element
            var counterText = base.options.countDown ? base.options.countDownText : base.options.counterText,
                counterNum = base.options.countDown ? base.options.max : 0,
                $formatted_counter_text = $('<div/>').addClass(base.options.textCountMessageClass)
                .html(counterText.replace('%d', '<span class="' + base.options.textCountClass + '">' + counterNum + '</span>')),
                $count_overflow_text = $('<div/>').addClass(base.options.countOverflowContainerClass);

            base.hideMessage($count_overflow_text);

            base.$container = $('<' + base.options.countContainerElement + '/>')
                .addClass(base.options.countContainerClass)
                .append($formatted_counter_text)
                .append($count_overflow_text);

            base.$text_counter = base.$container.find('span');
            base.$el.after(base.$container);

            // bind input events
            base.$el.bind('keyup.textcounter click.textcounter blur.textcounter focus.textcounter change.textcounter paste.textcounter', base.checkLimits).trigger('click.textcounter');

            // TextCounter: init(el) Callback
            base.options.init(base.el);
        };

        base.checkLimits = function(e) {
            var $this = base.$el,
            $countEl = base.$container,
            $text = $this.val(),
            textCount = 0,
            textTotalCount = 0,
            eventTriggered =  e.originalEvent === undefined ? false : true;

            if (!$.isEmptyObject($text)) {
                textCount = base.textCount($text);
            }

            // if max is auto retrieve value
            if (base.options.max == 'auto') {
                var max = base.$el.attr('maxlength');

                if (typeof max !== 'undefined' && max !== false) {
                    base.options.max = max;
                }
                else {
                    base.$container.text('error: [maxlength] attribute not set');
                }
            }
            else if (base.options.max == 'autocustom') {
                var max = base.$el.attr(base.options.autoCustomAttr);
            
                if (typeof max !== 'undefined' && max !== false) {
                    base.options.max = max;
                }
                else {
                    base.$container.text('error: [' + base.options.autoCustomAttr  + '] attribute not set');
                }
            }

            // if this is a countdown counter deduct from the max characters/words
            textTotalCount = base.options.countDown ? base.options.max - textCount : textCount;

            // set the current text count
            base.setCount(textTotalCount);

            if (base.options.min > 0 && eventTriggered) {   // if a minimum value has been set
                if (textCount < base.options.min) {
                    base.setErrors('min');

                    // TextCounter: minunder(el) Callback
                    base.options.minunder(base.el);
                }
                else if (textCount >= base.options.min) {
                    // TextCounter: mincount(el) Callback
                    base.options.mincount(base.el);

                    base.clearErrors('min');
                }
            }

            if (base.options.max !== -1) {  // if a maximum value has been set
                if (textCount === base.options.max && base.options.max !== 0) {
                    // TextCounter: maxcount(el) Callback
                    base.options.maxcount(base.el);
                    base.clearErrors('max');

                } else if (textCount > base.options.max && base.options.max !== 0) {
                    if (base.options.stopInputAtMaximum) {  // if the string should be trimmed at the maximum length
                        var trimmedString = '';

                        if (base.options.type == "word") {  // word type
                            var wordArray = $text.split(/[^\S\n]/g);
                            var i = 0;

                            // iterate over individual words
                            while (i < wordArray.length) {
                                // if over the maximum words allowed break;
                                if (i >= base.options.max) break;

                                if (wordArray[i] !== undefined) {
                                    trimmedString += wordArray[i] + ' ';
                                    i++;
                                }
                            }
                        }
                        else {  // character type
                            var maxLimit = (base.options.twoCharCarriageReturn) ?
                                base.options.max - base.twoCharCarriageReturnCount($text)
                                : base.options.max;

                            if (base.options.countSpaces) {     // if spaces should be counted
                                trimmedString = $text.substring(0, maxLimit);
                            }
                            else {
                                var charArray = $text.split(''),
                                totalCharacters = charArray.length,
                                charCount = 0,
                                i = 0;

                                while (charCount < maxLimit && i < totalCharacters) {
                                    if (charArray[i] !== ' ') charCount++;
                                    trimmedString += charArray[i++];
                                }
                            }
                        }

                        $this.val(trimmedString.trim());

                        textCount = base.textCount($this.val());
                        textTotalCount = base.options.countDown ? base.options.max - textCount : textCount;
                        base.setCount(textTotalCount);
                    } else {
                        base.setErrors('max');
                    }
                }
                else {
                    // TextCounter: maxunder(el) Callback
                    base.options.maxunder(base.el);
                    base.clearErrors('max');
                }
            }
            
            // hide the counter if it doesn't meet either the minimum or maximum display cutoff
            if  (base.options.minDisplayCutoff == -1 && base.options.maxDisplayCutoff == -1) {
                base.$container.show();             
            } else if (textCount <= base.options.min + base.options.minDisplayCutoff) { 
                base.$container.show();
            } else if (base.options.max !== -1 && textCount >= base.options.max - base.options.maxDisplayCutoff) {
                base.$container.show();
            } else {
                base.$container.hide();
            }
        };

        base.textCount = function(text) {
            var textCount = 0;

            if (base.options.type == "word") {  // word count
                textCount = base.wordCount(text);
            }
            else {  // character count
                textCount = base.characterCount(text);
            }

            return textCount;
        };

        base.wordCount = function(text) {
            return text.trim().replace(/\s+/gi, ' ').split(' ').length;
        };

        base.characterCount = function(text) {
            var textCount = 0,
                carriageReturnsCount = 0;

            // count carriage returns/newlines as 2 characters
            if (base.options.twoCharCarriageReturn) {
                carriageReturnsCount = base.twoCharCarriageReturnCount(text);
            }

            if (base.options.countSpaces) { // if need to count spaces
                textCount = text.replace(/[^\S\n|\r|\r\n]/g, ' ').length;
            }
            else {
                textCount = text.replace(/\s/g, '').length;
            }

            // count extended characters (e.g. Chinese)
            if (base.options.countExtendedCharacters) {
                var extended = text.match(/[^\x00-\xff]/gi);

                if (extended == null) {
                    textCount = text.length;
                } else {
                    textCount = text.length + extended.length;
                }
            }

            if (base.options.twoCharCarriageReturn) {
                textCount += carriageReturnsCount;
            }

            return textCount;
        };

        base.twoCharCarriageReturnCount = function(text) {
            var carriageReturns = text.match(/(\r\n|\n|\r)/g),
                carriageReturnsCount = 0;

            if (carriageReturns !== null) {
                carriageReturnsCount = carriageReturns.length;
            }

            return carriageReturnsCount;
        };

        base.setCount = function(count) {
            base.$text_counter.text(count);
        };

        base.setErrors = function(type) {
            var $this = base.$el,
            $countEl = base.$container,
            errorText = '';

            $this.addClass(base.options.inputErrorClass);
            $countEl.addClass(base.options.counterErrorClass);

            switch(type) {
                case 'min':
                    errorText = base.options.minimumErrorText;
                    break;
                case 'max':
                    errorText = base.options.maximumErrorText;

                    if (base.options.countOverflow) {
                        base.setOverflowMessage();
                    }

                    break;
            }

            if (base.options.displayErrorText) {
                if (!$countEl.children('.error-text-' + type).length) {
                    $countEl.append('<' + base.options.errorTextElement + ' class="error-text error-text-' + type + '">' + errorText + '</' + base.options.errorTextElement + '>');
                }
            }
        };

        base.setOverflowMessage = function () {
            base.hideMessage(base.$container.find('.' + base.options.textCountMessageClass));

            base.removeOverflowMessage();

            var overflowText = base.options.countOverflowText
                .replace('%d', base.textCount(base.$el.val()) - base.options.max)
                .replace('%type', base.options.type + 's');

            var overflowDiv = base.$container.find('.' + base.options.countOverflowContainerClass).append(overflowText);
            base.showMessage(overflowDiv);
        },

        base.removeOverflowMessage = function () {
            base.$container.find('.' + base.options.countOverflowContainerClass).empty();
        },

        base.showMessage = function ($selector) {
            $selector.css('display', 'inline');
        },

        base.hideMessage = function ($selector) {
            $selector.css('display', 'none');
        },

        base.clearErrors = function(type) {
            var $this = base.$el,
            $countEl = base.$container;

            $countEl.children('.error-text-' + type).remove();

            if ($countEl.children('.error-text').length == 0) {
                base.removeOverflowMessage();
                base.showMessage(base.$container.find('.' + base.options.textCountMessageClass));
                $this.removeClass(base.options.inputErrorClass);
                $countEl.removeClass(base.options.counterErrorClass);
            }
        };

        // kick it off
        base.init();
    };

    $.textcounter.defaultOptions = {
        'type'                        : "character",                     // "character" or "word"
        'min'                         : 0,                               // minimum number of characters/words
        'max'                         : 200,                             // maximum number of characters/words, -1 for unlimited, 'auto' to use maxlength attribute, 'autocustom' to use a custom attribute for the length (must set "autoCustomAttr")
        'autoCustomAttr'              : "counterlimit",                  // custom attribute name with the counter limit if the max is 'autocustom'
        'countContainerElement'       : "div",                           // HTML element to wrap the text count in
        'countContainerClass'         : "text-count-wrapper",            // class applied to the countContainerElement
        'textCountMessageClass'       : "text-count-message",            // class applied to the counter message
        'textCountClass'              : "text-count",                    // class applied to the counter length (the count number)
        'inputErrorClass'             : "error",                         // error class appended to the input element if error occurs
        'counterErrorClass'           : "error",                         // error class appended to the countContainerElement if error occurs
        'counterText'                 : "Total Count: %d",               // counter text
        'errorTextElement'            : "div",                           // error text element
        'minimumErrorText'            : "Minimum not met",               // error message for minimum not met,
        'maximumErrorText'            : "Maximum exceeded",              // error message for maximum range exceeded,
        'displayErrorText'            : true,                            // display error text messages for minimum/maximum values
        'stopInputAtMaximum'          : true,                            // stop further text input if maximum reached
        'countSpaces'                 : false,                           // count spaces as character (only for "character" type)
        'countDown'                   : false,                           // if the counter should deduct from maximum characters/words rather than counting up
        'countDownText'               : "Remaining: %d",                 // count down text
        'countExtendedCharacters'     : false,                           // count extended UTF-8 characters as 2 bytes (such as Chinese characters)
        'twoCharCarriageReturn'       : false,                           // count carriage returns/newlines as 2 characters
        'countOverflow'               : false,                           // display text overflow element
        'countOverflowText'           : "Maximum %type exceeded by %d",  // count overflow text
        'countOverflowContainerClass' : "text-count-overflow-wrapper",   // class applied to the count overflow wrapper
        'minDisplayCutoff'            : -1,                              // maximum number of characters/words above the minimum to display a count
        'maxDisplayCutoff'            : -1,                              // maximum number of characters/words below the maximum to display a count

        // Callback API
        'maxunder'                    : function(el){},                  // Callback: function(element) - Fires when counter under max limit
        'minunder'                    : function(el){},                  // Callback: function(element) - Fires when counter under min limit
        'maxcount'                    : function(el){},                  // Callback: function(element) - Fires when the counter hits the maximum word/character count
        'mincount'                    : function(el){},                  // Callback: function(element) - Fires when the counter hits the minimum word/character count
        'init'                        : function(el){}                   // Callback: function(element) - Fires after the counter is initially setup
    };

    $.fn.textcounter = function(options) {
        return this.each(function() {
            new $.textcounter(this, options);
        });
    };

})(jQuery);
