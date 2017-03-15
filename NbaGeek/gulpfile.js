'use strict';

const gulp = require('gulp');
const styl = require('gulp-stylus');
const prefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant')
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');
const svgMin = require('gulp-svgmin');

var path = {
    build: { 
        fonts: 'public/build/fonts',
        js: 'public/build/js/',
        css: 'public/build/css/',
        img: 'public/build/img/',
        svg: 'public/build/'
    },
  
    src: { 
        fonts: 'public/src/fonts/*.*',
        js: 'public/src/js/*.js',
        style: 'public/src/style/style.styl',
        img: 'public/src/img/**/*.*',
        svg: 'public/src/img/**/*.svg'
    },
    watch: {
        fonts: 'public/src/fonts/*.*',
        js: 'public/src/js/**/*.js',
        style: 'public/src/style/**/*.styl',
        img: 'public/src/img/**/*.*',
        icons: 'public/src/img/**/*.svg'
    },
};




gulp.task('fonts', function(){
  return gulp.src(path.src.fonts)
         .pipe(gulp.dest(path.build.fonts))
})

gulp.task('style:build', function () {
   return gulp.src(path.src.style)
        .pipe(styl())
        .pipe(prefixer()) 
        .pipe(cleanCss()) 
        .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('js:build', function(){
  return gulp.src(path.src.js) 
         .pipe(gulp.dest(path.build.js))
})

gulp.task('image:build', function () {
   return gulp.src(path.src.img, {since: gulp.lastRun('image:build')}) 
        .pipe(newer('public/build/img/'))
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
});

gulp.task('svg:build', function(){
  return gulp.src(path.src.svg)
  
          .pipe(svgMin({
			 js2svg: {
				pretty: true
			 }
          }))
  
         .pipe(svgSprite({
            svg: {
              dimensionAttributes: false
            },
            mode:{
              symbol:{
                dest: '.',
                prefix: '$',
                sprite: 'sprite.symbol.svg',
                layout: 'vertical',
                dimensions: true,
                bast: false,
                render:{
                  css: false,
                  styl: false
                },
                example: true
              }
              
            }
          }))
         .pipe(gulp.dest(path.build.svg))
});

gulp.task('build', gulp.parallel('fonts','style:build', 'js:build','image:build'));  
  
gulp.task('watch', function(){
  gulp.watch(path.watch.fonts, gulp.series('fonts'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.src.img, gulp.series('image:build'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch')));