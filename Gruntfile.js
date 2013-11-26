module.exports = function(grunt) {

    var fred_core = ["scss/helpers/*.scss", "scss/objects/_core.scss"];
    var objects = ["scss/objects/*.scss", "!scss/objects/_core.scss"];

    grunt.initConfig({

        fred_objects: ["scss/objects/_*.scss"],
        fred_variables: "_fred-variables.scss",

        concat: {
            core: {
                src: ["scss/helpers/*.scss", "scss/objects/_core.scss"],
                dest: "build/fred.core.scss"
            },
            vars: {
                src: ["scss/_variables.scss"],
                dest: "build/_fred-variables.scss"
            },
            objects: {
                src: objects,
                dest: "build/fred.objects.scss"
            },
            dist: {
                src: ["build/fred.core.scss", "build/fred.objects.scss"],
                dest: "dist/fred.scss"
            },
            build: {
                src: ["build/_fred-variables.scss", "dist/fred.scss"],
                dest: "build/fred.build.scss"
            }
        },
        clean: {
            build: ["build"]
        },
        copy: {
            build: {
                src: "build/_fred-variables.scss",
                dest: "dist/_fred-variables.scss"
            },
            install: {
                // files: [{
                    // expand: true,
                    // cwd: "dist/",
                    src: "dist/fred.scss",
                    dest: "<%= copy.install.thing %>/lib/_fred.scss"
                // }]    
            },
            vars: {
                src: "dist/_fred-variables.scss",
                dest: "<%= copy.install.thing %>/_fred-variables.scss"
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
                    'dist/fred.css': 'build/fred.build.scss'
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
            install: {
                options: {
                    questions: [
                        {
                            config: 'install_now', // arbitray name or config for any other grunt task
                            type: 'confirm', // list, checkbox, confirm, input, password
                            message: 'Do you want to install Fred into your project now?',
                            default: true // default value if nothing is entered
                        },
                        {
                            config: 'copy.install.thing', // arbitray name or config for any other grunt task
                            type: 'text', // list, checkbox, confirm, input, password
                            message: 'Where would you like Fred deployed to?',
                            default: "www/assets/sass", // default value if nothing is entered
                            when: function(answers) {
                                return answers['install_now'] === true;
                            },
                        },
                        {
                            config: 'copy.install.vars', // arbitray name or config for any other grunt task
                            type: 'confirm', // list, checkbox, confirm, input, password
                            message: 'Copy the variables file too (will replace your current variables)?',
                            default: false // default value if nothing is entered
                        },

                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-prompt');


    grunt.registerTask("installer", function() {
        var dest = grunt.config('copy.install.thing');
        var vars = grunt.config('copy.install.vars');

            if (dest) {
                grunt.task.run('copy:install');
                if (vars) {
                    grunt.task.run('copy:vars');
                }
            } else {
                return true;
            }

    });

    // grunt.registerTask('default', ['sass', 'concat:core', "concat:objects", "concat:dist", "clean:dist"]);

    grunt.registerTask('default', [
        "prompt:build",
        'concat:vars',
        'concat:core',
        "concat:objects",
        "concat:dist",
        "concat:build",
        "copy:build",
        "sass:build",
        "clean:build",
        "prompt:install",
        "installer"
        ]);

};
