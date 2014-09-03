module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          compass: true,
          update: true
        },
        files: [
          {
            expand: true,
            src: ['components/*/*.scss'],
            dest: 'css/',
            ext: '.css'
          },
          {
            src: 'sass/base.scss',
            dest: 'css/base.css'
          },
          {
            src: 'sass/layouts/library.scss',
            dest: 'css/layouts/library.css'
          }
        ]
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'components/*/*.js'
        ],
        dest: 'dist/ncarb-design-library-<%= pkg.version %>.min.js'
      },
    },
    cssmin: {
      minify: {
        src: [
          'css/base.css',
          'css/components/*/*.css'
        ],
        dest: 'css/ncarb-design-library-<%= pkg.version %>.min.css'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: false,
        globals: {
          jQuery: true
        }
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        'components/*/*.js'
      ],
      gruntfile: 'Gruntfile.js'
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: [
          'js/*.js',
          'components/*/*.js'
        ],
        tasks: ['jshint'],
        options: {
          debounceDelay: 250
        }
      },
      base_files: {
        files: [
          'index.html'
        ],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      base_styles: {
        files: [
          'sass/base.scss',
          'sass/*/*.scss',
        ],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      },
      component_styles: {
        files: [
          'components/*/*.scss'
        ],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['sass', 'concat:js', 'cssmin']);
  grunt.registerTask('css', ['cssmin']);
};