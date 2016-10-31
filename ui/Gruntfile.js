/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      specs: {
        src: ['test/specs/**/spec.*.js'],
        dest: 'test/specs.js',
        options: {
          browserifyOptions: {
            debug: true,
            paths: ["./node_modules", "./client"]
          }
        }
      }
    },

    jasmine: {
      specs: {
          src: [],
          options: {
              outfile: '_SpecRunner.html',
              specs: 'test/specs.js',
              keepRunner: true
          }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('specs',['browserify:specs','jasmine:specs']);

};
