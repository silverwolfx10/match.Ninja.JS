var bower = require('bower');
var concat = require('gulp-concat');
var gulp = require('gulp');
var inject = require('gulp-inject');
var underscore = require('underscore');
var underscoreStr = require('underscore.string');
var uglify = require('gulp-uglify');

gulp.task('bower', function (cb) {
  bower.commands.install([], { save: true }, {})
    .on('end', function (installed) {
      cb();
    });
});

gulp.task('ninja-modules-auto-load', ['bower'], function () {
  
  var bowerDir = './bower_components';
  var bowerFile = require('./bower.json');
  var bowerPackages = bowerFile.dependencies;
  var exclude = [];
  var packagesOrder = [];
  var mainFiles = [];

  function addPackage(name) {
    
    var dependencies = require(bowerDir + '/' + name + '/bower.json').dependencies;
    
    if (!!dependencies) {
      underscore.each(dependencies, function (value, key) {
        if (exclude.indexOf(key) === -1) {
          addPackage(key);
        }
      });
    }
    
    if (packagesOrder.indexOf(name) === -1) {
      packagesOrder.push(name);
    }
    
  }

  underscore.each(bowerPackages, function (value, key) {
    if (exclude.indexOf(key) === -1) {
      addPackage(key);
    }
  });

  underscore.each(packagesOrder, function(bowerPackage){
    
    var main = require(bowerDir + '/' + bowerPackage + '/bower.json').main;
    var mainFile = main;

    if (underscore.isArray(main)) {
      underscore.each(main, function (file) {
        if (underscoreStr.endsWith(file, '.js')) {
          mainFile = file;
        }
      });
    }

    mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;

    if (underscoreStr.endsWith(mainFile, '.js')) {
      mainFiles.push(mainFile);
    }
    
  });

  return gulp.src(mainFiles)
             .pipe(concat('ninja.min.js'))
             .pipe(uglify())
             .pipe(gulp.dest('./dest'));

});

gulp.task('ninja-smoke-bomb', ['ninja-modules-auto-load'], function () {

  return gulp.src('./script.txt')
             .pipe(inject(gulp.src(['./dest/ninja.min.js']), {
                starttag: "javascript:(function () {",
                endtag: "}).call({})",
                transform: function (filePath, file) {
                  return file.contents.toString('utf8');
                }
             }))
             .pipe(gulp.dest('./dest'));
  
});