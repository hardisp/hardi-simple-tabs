/**
* Author: Hardisuputra Arimawa
* email: hardisuputra.arimawa@ogilvy.com.au
*
*/
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');
const htmlmin = require('gulp-html-minifier');
const fileinclude = require('gulp-file-include')

var dest = 'dist';
var src = './src';

// Logs Message
gulp.task('message',function(){
  console.log('Gulp is running...');
});

// Copy all html file
gulp.task('copyHtml', function(){
  gulp.src(src + '/*.html').
    pipe(gulp.dest(dest));
});

//Optimize Images
gulp.task('imageMin', () =>
	gulp.src(src + '/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dest +  '/images'))
);

// Sass
gulp.task('sass', function(){
  gulp.src(src + '/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(dest +  '/css'));
})

// Less
gulp.task('less', function(){
  gulp.src(src + '/less/*.less')
    .pipe(less().on('error', less.logError))
    .pipe(concat('style.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(dest +  '/css'));
})

// Merge js
gulp.task('scripts', function(){
  gulp.src([src + '/js/vendor/**/*.js',src + '/js/plugins/*.js',src + '/js/**/*.js' ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest +  '/js'));
})

gulp.task('minifyHtml', function() {
  gulp.src(src + '/*.html')
    .pipe(fileinclude({
      prefix: '<!--#',
      suffix: '-->',
      basepath: src + '/include/'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dest))
});

gulp.task('mergeHtml', function() {
  gulp.src(src + '/*.html')
    .pipe(fileinclude({
      prefix: '<!--#',
      suffix: '-->',
      basepath: src + '/include/'
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function(){
  gulp.watch([src + '/js/vendor/**/*.js',src + '/js/plugins/*.js',src + '/js/**/*.js' ], ['scripts']);
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/*.html', ['mergeHtml']); /* Comment if you need to minify the HTML */

  //gulp.watch('src/*.html', ['minifyHtml']); // Uncoment if you need to minify the HTML
});

/* Comment if you need to minify the HTML */
gulp.task('default', ['message','sass','scripts','mergeHtml','watch']);

/* Uncoment if you need to minify the HTML */
//gulp.task('default', ['message','sass','scripts','minifyHtml','watch']);
