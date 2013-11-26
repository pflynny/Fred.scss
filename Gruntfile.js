module.exports = function(grunt) {

    var fred_core = ["scss/_variables.scss", "scss/helpers/*.scss", "scss/objects/_core.scss"];
    var objects = ["scss/objects/*.scss", "!scss/objects/_core.scss"];

    grunt.initConfig({

        fred_objects: ["scss/objects/_*.scss"],
        custom: false,

        concat: {
            core: {
                src: ["scss/_variables.scss", "scss/helpers/*.scss", "scss/objects/_core.scss"],
                dest: "build/fred.core.scss"
            },
            objects: {
                src: objects,
                dest: "build/fred.objects.scss"
            },
            dist: {
                src: ["build/fred.core.scss", "build/fred.objects.scss"],
                dest: "dist/fred.scss"
            }
        },
        clean: {
            dist: ["build"]
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
                            config: 'custom', // arbitray name or config for any other grunt task
                            type: 'confirm', // list, checkbox, confirm, input, password
                            message: 'Do you want to customise Fred\'s modules?',
                            default: false // default value if nothing is entered
                        },
                        {
                            config: 'concat.objects.src', // arbitray name or config for any other grunt task
                            type: 'checkbox', // list, checkbox, confirm, input, password
                            message: 'Which modules would you like to include?',
                            default: 'value', // default value if nothing is entered
                            when: function(answers) {
                                return answers['custom'] === true;
                            },
                            choices: function(answers) {
                                var answers = grunt.file.expand(objects);
                                // answers.unshift({name: "Gimme everythang!", value: objects})
                                return answers;
                            }
                       }
                    ]
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-prompt');

    // grunt.registerTask('default', ['sass', 'concat:core', "concat:objects", "concat:dist", "clean:dist"]);

    grunt.registerTask('default', ["prompt:build", 'concat:core', "concat:objects", "concat:dist", "clean:dist", "sass:build"]);

};
