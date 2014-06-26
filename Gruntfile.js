'use strict';

module.exports = function(grunt) {

  //Configure Grunt
  grunt.initConfig({

    //Point to the package file
    pkg: grunt.file.readJSON('package.json'),

    //Configure JSHint with files to exclude and options
    jshint: {
      files: [
        '**/*.js',
        '!Gruntfile.js',
        '!lib/libraries/*',
        '!node_modules/**/*',
        '!dist/**/*'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    //Configure Browserify build, no debug map and don't keep alive
    browserify: {
      options: {
        debug: true,
        keepalive: true
      },
      default: {
        src: './lib/application.js',
        dest: './dist/dfjs.js'
      }
    },

    //Configure Watchify build used while developing, debug map and constant file watch
    watchify: {
      options: {
        debug: true,
        keepalive: true
      },
      default: {
        src: './lib/application.js',
        dest: './dist/dfjs.js'
      }
    },

    //Configure Uglify that is executed when creating a new build
    uglify: {
      dist: {
        files: {
          'dist/dfjs.min.js': 'dist/dfjs.js'
        }
      }
    }

  });

  //Load plug-ins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-watchify');

  //Define 'grunt debug' task
  grunt.registerTask('debug', [
    'jshint',
  ]);

  //Define 'grunt build' task
  grunt.registerTask('build', [
    'browserify',
    'uglify'
  ]);

  //Define 'grunt dev' task
  grunt.registerTask('dev', [
    'watchify',
  ]);

};