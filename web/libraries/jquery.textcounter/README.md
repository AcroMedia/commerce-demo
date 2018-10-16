# jQuery Text Counter Plugin

A jQuery plugin for counting and limiting characters/words on text input, or textarea, elements.

## Installation

Include script after the jQuery library:

```html
<script src="/path/to/textcounter.min.js"></script>
```

or

#### npm

Install using [npm](https://www.npmjs.com/):

```
npm install jquery-text-counter
```

or

#### Bower

Install using [bower](http://bower.io/):

```
bower install jquery-text-counter
```

## Usage

Basic usage ([view editable code](http://jsfiddle.net/ractoon/p7x72La3/)):

```javascript
$('input').textcounter();
```

Define maximum words and allow further input ([view editable code](https://jsfiddle.net/ractoon/n4ufjo3b/)):

```javascript
$('input').textcounter({
	type: "word",
	max: 15,
	stopInputAtMaximum: false
});
```

Define minimum characters and set custom `countDownText` ([view editable code](https://jsfiddle.net/ractoon/jx8awxbb/)):

```javascript
$('input').textcounter({
	min: 20,
	countDownText: "%d characters remaining"
});
```

## Example

[View editable example](http://jsfiddle.net/ractoon/1xkuyp46/)

## Elements

By default the plugin creates and appends the following element after the input:

```html
<div class="text-count-wrapper">
	Total Count:
	<span class="text-count">0</span>
</div>
```

If an error is present it is appended within the element. The input gains the `inputErrorClass` and count wrapper gains the `counterErrorClass` as defined in the options:

```html
<input name="sample" class="error" />
<div class="text-count-wrapper error">
	Total Count:
	<span class="text-count">0</span>
	<div class="error-text">Error message text</div>
</div>
```

## Callbacks

### maxcount(el){}

Fires when a counter reaches the maximum word/character count.

### mincount(el){}

Fires when a counter reaches the minimum word/character count.

### init(el){}

Fires after the counter is initialized.

### maxunder(el){}

Fires when counter is under max limit.

### minunder(el){}

Fires when counter is under min limit.


## Options

```javascript
type                        : "character",                     // "character" or "word"
min                         : 0,                               // minimum number of characters/words
max                         : 200,                             // maximum number of characters/words, -1 for unlimited, 'auto' to use maxlength attribute, , 'autocustom' to use a custom attribute for the length (must set "autoCustomAttr")
autoCustomAttr              : "counterlimit",                  // custom attribute name with the counter limit if the max is 'autocustom'
countContainerElement       : "div",                           // HTML element to wrap the text count in
countContainerClass         : "text-count-wrapper",            // class applied to the countContainerElement
textCountMessageClass       : "text-count-message",            // class applied to the counter message
textCountClass              : "text-count",                    // class applied to the counter length (the count number)
inputErrorClass             : "error",                         // error class appended to the input element if error occurs
counterErrorClass           : "error",                         // error class appended to the countContainerElement if error occurs
counterText                 : "Total Count: %d",               // counter text
errorTextElement            : "div",                           // error text element
minimumErrorText            : "Minimum not met",               // error message for minimum not met,
maximumErrorText            : "Maximum exceeded",              // error message for maximum range exceeded,
displayErrorText            : true,                            // display error text messages for minimum/maximum values
stopInputAtMaximum          : true,                            // stop further text input if maximum reached
countSpaces                 : false,                           // count spaces as character (only for "character" type)
countDown                   : false,                           // if the counter should deduct from maximum characters/words rather than counting up
countDownText               : "Remaining: %d",                 // count down text
countExtendedCharacters     : false,                           // count extended UTF-8 characters as 2 bytes (such as Chinese characters)
twoCharCarriageReturn       : false,                           // count carriage returns/newlines as 2 characters
countOverflow               : false,                           // display text overflow element
countOverflowText           : "Maximum %type exceeded by %d",  // count overflow text
countOverflowContainerClass : "text-count-overflow-wrapper",   // class applied to the count overflow wrapper
minDisplayCutoff            : -1,                              // maximum number of characters/words above the minimum to display a count
maxDisplayCutoff            : -1,                              // maximum number of characters/words below the maximum to display a count

// Callback API
maxunder                    : function(el){},                  // Callback: function(element) - Fires when counter is under max limit
minunder                    : function(el){},                  // Callback: function(element) - Fires when counter is under min limit
maxcount                    : function(el){},                  // Callback: function(element) - Fires when the counter hits the maximum word/character count
mincount                    : function(el){},                  // Callback: function(element) - Fires when the counter hits the minimum word/character count
init                        : function(el){}                   // Callback: function(element) - Fires after the counter is initially setup
```

## Development

- Source hosted at [GitHub](https://github.com/ractoon/jQuery-Text-Counter)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/ractoon/jQuery-Text-Counter/issues)


## Authors

[ractoon](http://www.ractoon.com)


## Contributors

- [stgeneral](https://github.com/stgeneral) - count length newlines fix
- [moinism](https://github.com/moinism) - callback API
- [benr77](https://github.com/benr77) - bower support
- [SammyB](https://github.com/SammyB) - countdown starting count fix
- [eprincen2](https://github.com/eprincen2) - jQuery Validate compatibility fix
- [Hexodus](https://github.com/Hexodus) - minunder/maxunder events
- [juliovedovatto](https://github.com/juliovedovatto) / [alvaro-canepa](https://github.com/alvaro-canepa) - multiple classes support for counter container
- [dtipson](https://github.com/dtipson) - multiple classes error fix
- [jmichalicek](https://github.com/jmichalicek) - count carriage returns/newlines as 2 characters
- [diptopol](https://github.com/diptopol) - `stopInputAtMaximum` with `twoCharCarriageReturn` count fix, trimmed newline calculation fix, maximum text reached condition fix, text count overflow notification
- [trevorloflin](https://github.com/trevorloflin) - `minDisplayCutoff` and `maxDisplayCutoff` options
- [t3mujin](https://github.com/t3mujin) - autocustom support (maxlength workaround), text fixes
