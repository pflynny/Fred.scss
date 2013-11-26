module.exports = function(grunt) {

    grunt.initConfig({

        fred_objects: ["scss/objects/_*.scss"],

        concat: {
            fred: {
                src: [
                    "scss/_variables.scss",
                    "scss/helpers/*.scss",
                    "scss/objects/_core.scss",
                    "scss/objects/_grid.scss",
                    "scss/objects/_typography.scss",
                    "scss/objects/_arrows.scss",
                    "scss/objects/_badge.scss",
                    "scss/objects/_blocks.scss",
                    "scss/objects/_breadcrumbs.scss",
                    "scss/objects/_buttons.scss",
                    "scss/objects/_forms.scss",
                    "scss/objects/_headings.scss",
                    "scss/objects/_icon-text.scss",
                    "scss/objects/_images.scss",
                    "scss/objects/_lists.scss",
                    "scss/objects/_media.scss",
                    "scss/objects/_radii.scss",
                    "scss/objects/_spacing.scss"
                ],
                dest: "dist/fred.scss"
            }
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'dist/fred.css': 'scss/fred.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'dist/fred.css': 'dist/fred.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['sass', 'concat:sass'],
                options: {
                    spawn: false
                }
            }
        },
        prompt: {
            build: {
                options: {
                    questions: [
                        {
                            config: 'concat.fred.src', // arbitray name or config for any other grunt task
                            type: 'checkbox', // list, checkbox, confirm, input, password
                            message: 'Which modules would you like to include?',
                            default: 'value', // default value if nothing is entered
                            choices: function(answers) {
                                var answers = grunt.file.expand(["scss/objects/_*.scss"]);
                                console.log(answers);
                                return answers;
                            }
//                            validate: function(value), // return true if valid, error message if invalid
//                            filter:  function(value), // modify the answer
//                            when: function(answers) // only ask this question when this function returns true
                        }
                    ]
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.registerTask('default', ['sass', 'concat:fred']);

    grunt.registerTask('build', ["prompt:build", "concat:fred", "sass:build"]);

};
