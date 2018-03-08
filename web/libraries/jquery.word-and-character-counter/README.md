JQuery Character and Word counter plugin
=========
This plug-in allows you to count characters or words, up or down. You can set a minimum or maximum goal for the counter to reach.

  - Create a custom message for your counter's message
  - Force character/word limit on user to prevent typing
  - Works against copy/paster's!

It will insert a <code>div</code> with an id of the name of the <code>input</code> area you are counting, appended with the string "_counter".
For example, if the input you want to count is called "awesome", the id of the div that keeps track of the count will be "awesome_counter".

Simple? You bet your ass it is.

[Demos and code samples](http://qwertypants.github.io/jQuery-Word-and-Character-Counter-Plugin/)


```
npm install jquery-word-and-character-counter-plugin
```


## Contributing

OMG you're awesome. 

Use the `gh-pages` branch for development. Run `npm install` to install the lint/build packages. 

The source file is `./jquery.word-and-character-counter.js

Build with `grunt` if you have it installed globally, otherwise `npm run build`.

### Code Style

Be nice and follow the [jsrc](http://jscs.info/overview.html) rules. These
are checked by the Grunt build.

If your text editor doesn't use it automatically, you can run it using `jscs jquery.word-and-character-counter.js`.

**Minify it!**

Bytes are precious. Use `uglifyjs jquery.word-and-character-counter.js -o
jquery.word-and-character-counter.min.js` to minify the output file. This
is run automatically by the Grunt build.
