module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'browserify:dist', 'copy:dist']
    },
    copy: {
      dist: {
        src: ['app.js'],
        dest: 'slip/components/',
        filter: 'isFile',
        cwd: 'dist/',
        flatten: true,
        expand: true
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/app.js': ['src/**/*.js']
        }
      }
    },
    patch: {
      speaktts: {
        options: {
          patch: 'speak-tts.js.patch'
        },
        files: {
          'node_modules/speak-tts/lib/speak-tts.js': 'node_modules/speak-tts/lib/speak-tts.js'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-patch'); 

  grunt.registerTask('default', ['jshint', 'browserify:dist', 'copy:dist']);
  grunt.registerTask('watcher', ['watch']);
};
