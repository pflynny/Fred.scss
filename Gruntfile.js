module.exports = function(grunt) {

    grunt.initConfig({


        copy: {
            // copy sass to compile the acutal styles for our documentation
            sass: {
                src: "../fred/dist/lib/fred.scss",
                dest: "www/assets/sass/lib/fred.scss"
            }
        },

        shell: {
            docs: {
                command: './mark.sh www/assets/sass/lib/fred.scss www/index.md'
            }
        },

        markdown: {
            docs: {
                files: [
                    {
                        expand: true,
                        src: 'www/index.md',
                        dest: '',
                        ext: '.html'
                    }
                ],
                options: {
                    template: 'templates/template.html',
                    gfm: true,
                    highlight: 'manual',
                    preCompile: function(src, context) {
                        src = src.replace(/```html([^`]*)```/g, '```html $1```\n<div class="block codedemo">\n$1\n</div>');
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
                src: 'www/index.html'
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'www/assets/css/screen.css': 'www/assets/sass/screen.scss'
                }
            }
        },

        watch: {
            sass: {
                files: ['www/assets/sass/**/*.scss'],
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




};
