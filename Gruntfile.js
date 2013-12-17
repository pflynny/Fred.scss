module.exports = function(grunt) {

    grunt.initConfig({


        copy: {
            // copy sass to compile the acutal styles for our documentation
            sass: {
                src: "../fred/dist/lib/fred.scss",
                dest: "assets/sass/lib/fred.scss"
            }
        },

        shell: {
            docs: {
                command: './mark.sh assets/sass/lib/fred.scss index.md'
            }
        },

        markdown: {
            docs: {
                files: [
                    {
                        expand: true,
                        src: 'index.md',
                        dest: '',
                        ext: '.html'
                    }
                ],
                options: {
                    template: 'templates/template.html',
                    gfm: true,
                    highlight: 'manual',
                    preCompile: function(src, context) {
                        src = src.replace(/```html([^`]*)```/g, '```html$1```\n<div class="block codedemo">\n$1\n</div>');
                        return src;
                    }
                }
            }
        },

        dom_munger: {
            reader: {
                options: {
                    read: {selector:'h1,h2',attribute: 'id', writeto:'myHeads'},
                    callback: function($){
                        var headlines = grunt.config.data.dom_munger.data.myHeads ;// dom_munger.data.myHeads;
                        var navItems = "";
                        for(var key in headlines) {
                            var headlineId = headlines[key];
                            var $headline = $('#'+headlineId);
                            var headlineText = $headline.html();
                            var headlineClass = ($headline[0].name == "h1") ? "nav--h1" : "font-size-xxs nav--"+$headline[0].name;
                            navItems += '<li class="'+headlineClass+'"><a href="#'+headlineId+'">'+headlineText+'</a></li>\n';
                        }
                        $('#nav').html(navItems);
                    }
                },
                src: 'index.html'
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'assets/css/screen.css': 'assets/sass/screen.scss'
                }
            }
        },

        watch: {
            sass: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }



    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-dom-munger');


    grunt.registerTask('build', [
        'sass:dist'
    ]);

    grunt.registerTask('docs', [
        'copy:sass',
        'shell:docs',
        'markdown:docs',
        'dom_munger'
    ]);

    grunt.registerTask('default', [
        'docs',
        'build'
    ]);

};
