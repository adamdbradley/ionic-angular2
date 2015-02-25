var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpPlugins = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var gulpTraceur = require('gulp-traceur');
var runSequence = require('run-sequence');

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
    src: 'src/app/**/*.js',
    dest: 'www/js',
    options: {
      debug: {
        sourceMaps: false,
        annotations: true,
        types: true,
        script: false,
        memberVariables: true,
        modules: 'instantiate'
      },
      release: {
        sourceMaps: false,
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
    dest: 'www',
    options: {
      debug: {
        inline: false
      },
      release: {
        inline: true
      }
    }
  },

  deps: {
    src: [
      'node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
      'node_modules/zone.js/long-stack-trace-zone.js',
      'node_modules/zone.js/zone.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/systemjs/lib/extension-register.js',
      'src/lib/snippets/runtime_paths.js'
    ],
    dest: 'www/lib/deps/'
  },

  angular2: {
    src: 'node_modules/angular2/es6/prod',
    dest: 'www/angular2'
  }

};


gulp.task('build', function(done) {
  runSequence(
    'lib',
    'sass',
    'transpile',
    'templates',
    done
  );
});


gulp.task('watch', function() {
  gulp.watch(CONFIG.sass.src, ['sass']);
  gulp.watch(CONFIG.transpile.src, ['transpile']);
  gulp.watch(CONFIG.templates.src, ['templates']);
});


gulp.task('lib', ['build.angular.es5', 'deps']);


gulp.task('deps', function() {
  return gulp.src(CONFIG.deps.src)
         .pipe(gulp.dest(CONFIG.deps.dest));
});


gulp.task('build.angular.es5', function() {
  var es5build = require('./node_modules/angular2/es6/prod/es5build');
  return es5build({
    src: CONFIG.angular2.src,
    dest: CONFIG.angular2.dest,
    modules: 'instantiate'
  });
});


gulp.task('sass', function(done) {
  gulp.src(CONFIG.sass.file)
    .pipe(sass(options('sass')))
    .pipe(gulp.dest(CONFIG.sass.dest))
    .on('end', done);
});


gulp.task('transpile', function() {
  return gulp.src(CONFIG.transpile.src)
         .pipe(gulpTraceur(options('transpile')))
         .pipe(gulp.dest(CONFIG.transpile.dest));
});


gulp.task('templates', function() {
  return gulp.src(CONFIG.templates.src)
         .pipe(gulp.dest(CONFIG.templates.dest));
});


gulp.task('serve', ['watch'], function() {
  gulpPlugins.connect.server({
    root: [__dirname + '/' + CONFIG.templates.dest],
    port: (argv.port || argv.p || 8080),
    livereload: !!(argv.livereload || argv.l),
    open: !!(argv.browser || argv.b)
  })();
})


function options(type) {
  return CONFIG[type].options[isProd() ? 'release' : 'debug'];
}

function isProd() {
  return !!(argv.production || argv.prod);
}
