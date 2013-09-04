module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            demoBuild: {
                // the files to concatenate
                src: ['js/**/*.js'],
                // the location of the resulting JS file
                dest: 'js/concat.js'
            }
        },
        jshint: {
            // define the files to lint
            files: {
                src: ['Gruntfile.js', 'js/**/*.js']
            }
        },
        phplint: {
            good: ["*.php"]
            //bad: ["test/rsrc/*-fail.php"]
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-phplint");


    // Default task(s).
    // grunt.registerTask('default', ['jshint']);

    // Lint and concat the js files
    grunt.registerTask('demoBuild', 'Concat and minify the JavaScript files in the js dir', function() {
        grunt.log.writeln('Starting the build');
        grunt.task.run(['jshint', 'concat:demoBuild']);
    });

    // Run JSHint on custom files or directories
    grunt.registerTask('jsHintFiles', 'Use JSHint on specific files.', function(files) {
        if (arguments.length === 0) {
            grunt.fail.warn('Please pass in a file or directory to jshint e.g. jsHintFiles:/some/path/*.js');
        } else {
            grunt.config(['jshint', 'all'], files);
            grunt.task.run(['jshint']);
            if (grunt.task.current.errorCount === 0) {
                //grunt.event.emit('rockNRoll');
            }
        }
    });

    // Run phplint on custom files or directories
    grunt.registerTask('phpLintFiles', 'Use phplint on specific files.', function(files) {
        if (arguments.length === 0) {
            grunt.fail.warn('Please specify a file or directory to phplint e.g. grunt phpLintFiles:/some/path/*.php');
        } else {
            grunt.config(['phplint', 'good'], files);
            grunt.task.run(['phplint']);
        }
    });

};
