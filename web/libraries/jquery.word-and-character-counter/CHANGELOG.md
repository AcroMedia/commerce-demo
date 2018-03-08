*   **2.5.1** Allows for using `ctrl`/`command` `a` to select input text when a [character limit is reached #23](https://github.com/qwertypants/jQuery-Word-and-Character-Counter-Plugin/issues/23)
*   **2.5.0** Support jQuery 3.0
*   **2.4.5**
    *   Added support for DOM elements with the `contentedtiable` attribute set to `true`. Suggested [here #17](https://github.com/qwertypants/jQuery-Word-and-Character-Counter-Plugin/issues/17) by [Globulopolis](https://github.com/Globulopolis)
*   **2.4.4**
    *   For easier collaboration, support grunt to [automatically run jscs and uglify #15](https://github.com/qwertypants/jQuery-Word-and-Character-Counter-Plugin/pull/15)

    *   Using [jsrc](http://jscs.info/overview.html) for code quality control

*   **2.4**
    *   Support for adding a [custom class on the counter container #11](https://github.com/qwertypants/jQuery-Word-and-Character-Counter-Plugin/pull/11)

    *   Using [jsrc](http://jscs.info/overview.html) for code quality control

*   **2.3**
    *   Added ability to use a custom DOM element to place the counter. Also includes an update for placement of the counter (before of after the DOM element.)

*   **2.2**
    *   Added ablity to use custom language message used for the default message used in this plugin. Suggested (and sample code provide) by [@johnleniel](https://twitter.com/johnleniel)
*   **2.1**
    *   Added new `'Sky'` _string_ value to the `goal` option that enforces counting up without a limit.
    *   Pasting over the limit when counting down does not show negative numbers
*   **2.0**
    *   Added ability for custom messages.
    *   Modularized functions and made enhancements.
    *   Text only: Gives you the option to only display the amount of words/characters remaining (or counting up to), kinda like twitter.
    *   Paste in words past limit: Before, I had it that once you paste over the allowed words, the whole field will blank out. This time, I have it so that it cuts off the extra words!
*   1.0: initial release 🎂