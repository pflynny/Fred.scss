module.exports = function(grunt) {

    var objects = ["scss/objects/*.scss"];

    grunt.initConfig({

        fred_core: ["scss/_fred-defaults.scss", "scss/helpers/*.scss", "scss/_fred-core.scss"],
        fred_objects: ["scss/objects/*.scss"],
        fred_theme: "_fred-defaults.scss",
        src_theme: "scss/_fred-defaults.scss",
        fred_dist: "dist/fred.scss",

        concat: {
            core: {
                src: "<%= grunt.config('fred_core') %>",
                dest: "build/fred.core.scss"
            },
            vars: {
                src: "<%= grunt.config('src_theme') %>",
                dest: "dist/<%= grunt.config('fred_theme') %>"
            },
            objects: {
                src: "<%= grunt.config('fred_objects') %>",
                dest: "build/fred.objects.scss"
            },
            dist: {
                src: ["build/fred.core.scss", "build/fred.objects.scss"],
                dest: "<%= grunt.config('fred_dist') %>"
            },
            build: {
                src: ["dist/fred.scss"],
                dest: "build/fred.build.scss"
            }
        },
        clean: {
            build: ["build"]
        },
        copy: {
            build: {
                src: "build/<%= grunt.config('fred_variables') %>",
                dest: "dist/<%= grunt.config('fred_variables') %>"
            },
            install: {
                src: "<%= grunt.config('fred_dist') %>",
                dest: "<%= copy.install.fred %>/lib/_fred.scss"
            },
            vars: {
                src: "dist/<%= grunt.config('fred_variables') %>",
                dest: "<%= copy.install.fred %>/_fred-theme.scss"
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
                tasks: ['build'],
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
                            config: 'copy.install.fred', // arbitray name or config for any other grunt task
                            type: 'text', // list, checkbox, confirm, input, password
                            message: 'Where would you like Fred deployed to?',
                            default: "www/assets/sass", // default value if nothing is entered
                            when: function(answers) {
                                return answers['install_now'] === true;
                            }
                        },
                        {
                            config: 'copy.install.vars', // arbitray name or config for any other grunt task
                            type: 'confirm', // list, checkbox, confirm, input, password
                            message: 'Copy the variables file too (will replace your current variables)?',
                            default: false, // default value if nothing is entered
                            when: function(answers) {
                                return answers['install_now'] === true;
                            }
                        }

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
        var dest = grunt.config('copy.install.fred');
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

    grunt.registerTask('default', [
        'prompt:build',
        'build',
        'prompt:install',
        'installer'
    ]);

    grunt.registerTask('build', [
        'concat:vars',
        'concat:core',
        'concat:objects',
        'concat:dist',
        'concat:build',
        'copy:build',
        'sass:build',
        'clean:build'
    ]);
};
