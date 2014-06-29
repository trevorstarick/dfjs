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
        src: './build/lib/application.js',
        dest: './build/dist/dfjs.js'
      }
    },

    //Configure Watchify build used while developing, debug map and constant file watch
    watchify: {
      options: {
        debug: true,
        keepalive: true
      },
      default: {
        src: './build/lib/application.js',
        dest: './build/dist/dfjs.js'
      }
    },

    //Configure Uglify that is executed when creating a new build
    uglify: {
      dist: {
        files: {
          './public/dist/dfjs.min.js': './public/dist/dfjs.js'
        }
      }
    },

    nodewebkit: {
      options: {
        build_dir: './build', // Where the build version of my node-webkit app is saved
        mac: true, // We want to build it for mac
        win: true, // We want to build it for win
        linux32: false, // We don't need linux32
        linux64: false // We don't need linux64
      },
      src: ['./public/**/*'] // Your node-webkit app
    }

  });

  //Load plug-ins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-watchify');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  //Define 'grunt debug' task
  grunt.registerTask('debug', [
    'jshint',
  ]);

  //Define 'grunt build' task
  grunt.registerTask('build', [
    'browserify',
    'uglify',
    'nodewebkit'
  ]);

  //Define 'grunt dev' task
  grunt.registerTask('dev', [
    'watchify',
  ]);

};