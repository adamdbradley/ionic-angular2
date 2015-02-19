var gulp = require('gulp');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var gulpPlugins = require('gulp-load-plugins')();
var argv = require('yargs').argv;


var CONFIG = {

  sass: {
    file: 'src/scss/app.scss',
    src: 'src/**/*.scss',
    dest: 'www/css/',
    options: {
      debug: {
        outputStyle: 'nested',
        errLogToConsole: true
      },
      release: {
        outputStyle: 'compressed'
      }
    }
  },

  transpile: {
    src: ['src/app/**/*.js', 'src/**/*.es6'],
    dest: 'www/js/',
    options: {
      debug: {
        concat: false,
        minify: false,
        sourceMaps: true,
        annotations: true,
        types: true,
        script: false,
        memberVariables: true,
        modules: 'instantiate'
      },
      release: {
        concat: true,
        minify: true,
        sourceMaps: true,
        annotations: true,
        types: true,
        script: false,
        memberVariables: true,
        modules: 'instantiate'
      }
    }
  },

  templates: {
    src: 'src/app/**/*.html',
    dest: 'www/',
    options: {
      debug: {
        inline: false
      },
      release: {
        inline: true
      }
    }
  },

  lib: {
    src: [
      '/Users/adam/Git/angular/dist/js/prod/es5/**/*',
    ],
    dest: 'www/lib/',
    options: {
      debug: {
        concat: false
      },
      release: {
        concat: true
      }
    }
  }

};


gulp.task('build', ['templates', 'sass', 'transpile', 'lib']);


gulp.task('watch', ['build'], function() {
  gulp.watch(CONFIG.sass.src, ['sass']);
  gulp.watch(CONFIG.transpile.src, ['transpile']);
  gulp.watch(CONFIG.templates.src, ['templates']);
});


gulp.task('sass', function(done) {
  gulp.src(CONFIG.sass.file)
    .pipe(sass(options('sass')))
    .pipe(gulp.dest(CONFIG.sass.dest))
    .on('end', done);
});


gulp.task('transpile', function() {
  return gulp.src(CONFIG.transpile.src)
         .pipe(traceur(options('transpile')))
         .pipe(gulp.dest(CONFIG.transpile.dest));
});


gulp.task('templates', function() {
  return gulp.src(CONFIG.templates.src)
         .pipe(gulp.dest(CONFIG.templates.dest));
});


gulp.task('lib', function(done) {
  return gulp.src(CONFIG.lib.src)
         .pipe(gulp.dest(CONFIG.lib.dest));
});


gulp.task('serve', ['build', 'watch'], function() {
  gulpPlugins.connect.server({
    root: [__dirname + '/www'],
    port: 8080,
    livereload: false,
    open: false
  })();
})

function options(type) {
  return CONFIG[type].options[isRelease() ? 'release' : 'debug'];
}

function isRelease() {
  return !!(argv.release || argv.r);
}
