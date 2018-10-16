/**
 * Build process for CKEditor Codemirror Plugin
 * This file contributed by Timm Stokke <timm@stokke.me>
 *
 * Don't know where to start?
 * Try: http://24ways.org/2013/grunt-is-not-weird-and-hard/
 */
module.exports = function(grunt) {

    var addons = [
        'addon/comment/continuecomment.js',
        'addon/edit/closebrackets.js',
        'addon/edit/closetag.js',
        'addon/edit/matchbrackets.js',
        'addon/edit/matchtags.js',
        'addon/edit/trailingspace.js',
        //'addon/fold/foldcode.js' // gets included as a dependency
        'addon/fold/foldgutter.js',
        'addon/fold/brace-fold.js',
        'addon/fold/comment-fold.js',
        'addon/fold/indent-fold.js',
        //'addon/fold/xml-fold.js', // gets included as a dependency
        'addon/format/autoFormatAll.js',
        'addon/format/formatting.js',
        'addon/selection/active-line.js',
        'addon/search/match-highlighter.js',
        'addon/mode/multiplex.js', // TODO also required from htmlembedded
    ];
// CONFIGURATION
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
        core: {
            options: {
                baseUrl: 'codemirror/js',
                include: ['codemirror.js'],
                preserveLicenseComments: false,
                optimize: 'none',
                out: 'codemirror/js/codemirror.min.r.js',
                wrap: {
                    end:'(function(window){' +
                        '    "function"==typeof window.define && ' +
                        '    window.define("core", ["codemirror.js"], function (codemirror){'+
                        '        window.CodeMirror = codemirror;'+
                        '    });' +
                        '})(this)'
                }
            }
        },
        modeTwig: {
            options: {
                baseUrl: 'codemirror/js',
                include: ['mode/twig/twig.js'],
                paths: {
                    'lib/codemirror': 'empty:'
                },
                preserveLicenseComments: false,
                out: 'codemirror/js/codemirror.mode.twig.min.js',
                wrap: {
                    end:'(function(window){' +
                    '    "function"==typeof window.define && ' +
                    '    window.define("modeTwig", ["mode/twig/twig.js"], function (){'+
                    '    });' +
                    '})(this)'
                }
            }
        },
        modeHtml: {
            options: {
                baseUrl: 'codemirror/js',
                paths: {
                    'lib/codemirror': 'empty:',
                    'codemirror.js': 'empty:'
                },
                preserveLicenseComments: false,
                include: [
                    'mode/htmlembedded/htmlembedded.js'
                ],
                out: 'codemirror/js/codemirror.mode.htmlmixed.min.js',
                wrap: {
                    end:'(function(window){' +
                    '    "function"==typeof define && ' +
                    '    define("modeHtml",["mode/htmlembedded/htmlembedded.js"], function (){'+
                    '    });' +
                    '})(this)'
                },
            }
        },
        modePHP: {
            options: {
                baseUrl: 'codemirror/js',
                paths: {
                    'lib/codemirror': 'empty:',
                },
                preserveLicenseComments: false,
                include: [
                    'mode/php/php.js'
                ],
                out: 'codemirror/js/codemirror.mode.php.min.js',
                wrap: {
                    end:'(function(window){' +
                    '    "function"==typeof window.define && ' +
                    '    window.define("modePHP",["mode/php/php.js"], function (){'+
                    '    });' +
                    '})(this)'
                },
            }
        },
        modeJs: {
            options: {
                baseUrl: 'codemirror/js',
                paths: {
                    'lib/codemirror': 'empty:',
                },
                preserveLicenseComments: false,
                include: [
                    'mode/javascript/javascript.js'
                ],
                out: 'codemirror/js/codemirror.mode.javascript.min.js',
                wrap: {
                    end:'(function(window){' +
                    '    "function"==typeof window.define && ' +
                    '    window.define("modeJs",["mode/javascript/javascript.js"], function (){'+
                    '    });' +
                    '})(this)'
                },
            }
        },
        addons: {
            options: {
                baseUrl: 'codemirror/js',
                paths: {
                    'lib/codemirror': 'empty:',
                },
                preserveLicenseComments: false,
                include: addons,
                out: 'codemirror/js/codemirror.addons.min.js',
                wrap: {
                        end:'(function(window){' +
                        '    "function"==typeof window.define && ' +
                        '    window.define("addons",["' + addons.join('","') + '"], function (){'+
                        '    });' +
                        '})(this)'
                }
            }
        },
        addonSearch: {
            options: {
                baseUrl: 'codemirror/js',
                paths: {
                    'lib/codemirror': 'empty:',
                },
                preserveLicenseComments: false,
                include: [
                    'addon/search/search.js',
                ],
                out: 'codemirror/js/codemirror.addons.search.min.js',
                wrap: {
                        end:'(function(window){' +
                        '    "function"==typeof window.define && ' +
                        '    window.define("addonSearch",["addon/search/search.js"], function (){'+
                        '    });' +
                        '})(this)'
                },
            }
        },
        beautify: {
            options: {
                baseUrl: 'codemirror/js',
                paths: {
                    'beautify-css': 'empty:'
                },
                preserveLicenseComments: false,
                include: [
                    'beautify.js',
                    'beautify-html.js'
                ],
                map:{
                    '*':{
                        './beautify': 'beautify.js',
                        'beautify': 'beautify.js'
                    }
                },
                out: 'codemirror/js/beautify.min.js',
                wrap: {
                    end:'(function(window){' +
                    '    if("function"==typeof window.define){ ' +
                    '    window.define("beautify",["beautify.js"], function (b){return b;}); '+
                    '    window.define("beautify-css",[], function (){return {css_beautify:undefined};}); '+    //I know, i know...
                    '    window.define("beautifyModule",["beautify", "beautify-html.js"], function (js_beautify, html_beautify){'+
                    '        window.js_beautify = js_beautify.js_beautify;' +
                    '        window.html_beautify = html_beautify.html_beautify;' +
                    '    });}' +
                    '})(this)'
                },
            }
        },
    },
    // Minimize JS
    min: {
      options: {
        report: false
      },
      core: {
        src: [
            'codemirror/js/codemirror.min.r.js',
        ],
        dest: 'codemirror/js/codemirror.min.js'
      },
      modeBBCode: {
        src: [
          'codemirror/js/mode/bbcode/bbcode.js'
          ],
        dest: 'codemirror/js/codemirror.mode.bbcode.min.js'
      },
      modeBBCodeMixed: {
        src: [
          'codemirror/js/mode/xml/xml.js',
          'codemirror/js/mode/javascript/javascript.js',
          'codemirror/js/mode/css/css.js',
          'codemirror/js/mode/htmlmixed/htmlmixed.js',
          'codemirror/js/mode/bbcode/bbcodemixed.js',
          'codemirror/js/mode/bbcodemixed/bbcodemixed.js'
          ],
        dest: 'codemirror/js/codemirror.mode.bbcodemixed.min.js'
      },
    },

    // Optimize images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'codemirror/icons/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'codemirror/icons/'
        }]
      }
    },

    // CSS Minify
    cssmin: {
      combine: {
        files: {
          'codemirror/css/codemirror.min.css': 
		  [
		  'codemirror/css/codemirror.css', 
		  'codemirror/css/codemirror.ckeditor.css',
 		  'codemirror/js/addon/dialog/dialog.css',
		  'codemirror/js/addon/fold/foldgutter.css'
		  ]
        }
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['codemirror/js/*.js', 'codemirror/addon/*.js', 'codemirror/mode/*.js'],
        tasks: ['min'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['codemirror/css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      }
    }

  });

  // PLUGINS
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
 
  grunt.registerTask('watch', [
    'requirejs',
    'min',
    'cssmin',
    'watch'
    ]);

  grunt.registerTask('default', [
    'requirejs',
    'min',
    'cssmin'
    ]);

};
