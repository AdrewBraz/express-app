import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browser from 'browser-sync';
import rimraf from 'rimraf';
import panini from 'panini';
import yargs from 'yargs';
import lazypipe from 'lazypipe';
import inky from 'inky';
import fs from 'fs';
import siphon from 'siphon-media-query';
import path from 'path';
import merge from 'merge-stream';
import beep from 'beepbeep';
import colors from 'colors';
import pngquant from 'imagemin-pngquant';


const $ = plugins();

// Look for the --production flag
const PRODUCTION = !!(yargs.argv.production);
const EMAIL = yargs.argv.to;

// Declar var so that both AWS and Litmus task can use it.
var CONFIG;

// Build the "dist" folder by running all of the above tasks
gulp.task('build',
    gulp.series(clean, pages, sass, images, inline));

// Build emails, run the server, and watch for file changes
gulp.task('default',
    gulp.series('build', server, watch));

// Build emails, then send to litmus
gulp.task('litmus',
    gulp.series('build', creds, aws, litmus));

// Build emails, then send to EMAIL
gulp.task('mail',
    gulp.series('build', creds, aws, mail));

// Build emails, then zip
gulp.task('zip',
    gulp.series('build', zip));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
    rimraf('dist', done);
}

// Compile layouts, pages, and partials into flat HTML files
// Then parse using Inky templates
function pages() {
    return gulp.src('email/src/pages/**/*.html')
        .pipe(panini({
            root: 'email/src/pages',
            layouts: 'email/src/layouts',
            partials: 'email/src/partials',
            helpers: 'email/src/helpers'
        }))
        .pipe(inky())
        .pipe(gulp.dest('email/dist'));
}

// Reset Panini's cache of layouts and partials
function resetPages(done) {
    panini.refresh();
    done();
}

// Compile Sass into CSS
function sass() {
    return gulp.src('email/src/assets/scss/app.scss')
        .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
        .pipe($.sass({
            includePaths: ['node_modules/foundation-emails/scss']
        }).on('error', $.sass.logError))
        .pipe($.if(PRODUCTION, $.uncss({
            html: ['email/dist/**/*.html']
        })))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest('email/dist/css'));
}

// Copy and compress images
function images() {
    return gulp.src('email/src/assets/img/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('email/dist/assets/img'));
}

// Inline CSS and minify HTML
function inline() {
    return gulp.src('email/dist/**/*.html')
        .pipe($.if(PRODUCTION, inliner('email/dist/css/app.css')))
        .pipe(gulp.dest('email/dist'));
}

// Start a server with LiveReload to preview the site in
function server(done) {
    browser.init({
        server: 'public/dist'
    });
    done();
}

// Watch for file changes
function watch() {
    gulp.watch('email/src/pages/**/*.html').on('all', gulp.series(pages, inline, browser.reload));
    gulp.watch(['email/src/layouts/**/*', 'email/src/partials/**/*']).on('all', gulp.series(resetPages, pages, inline, browser.reload));
    gulp.watch(['../scss/**/*.scss', 'email/src/assets/scss/**/*.scss']).on('all', gulp.series(resetPages, sass, pages, inline, browser.reload));
    gulp.watch('email/src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
}

// Inlines CSS into HTML, adds media query CSS into the <style> tag of the email, and compresses the HTML
function inliner(css) {
    var css = fs.readFileSync(css).toString();
    var mqCss = siphon(css);

    var pipe = lazypipe()
        .pipe($.inlineCss, {
            applyStyleTags: false,
            removeStyleTags: true,
            preserveMediaQueries: true,
            removeLinkTags: false
        })
        .pipe($.replace, '<!-- <style> -->', `<style>${mqCss}</style>`)
        .pipe($.replace, '<link rel="stylesheet" type="text/css" href="css/app.css">', '')
        .pipe($.htmlmin, {
            collapseWhitespace: true,
            minifyCSS: true
        });

    return pipe();
}

// Ensure creds for Litmus are at least there.
function creds(done) {
    var configPath = './config.json';
    try { CONFIG = JSON.parse(fs.readFileSync(configPath)); } catch (e) {
        beep();
        console.log('[AWS]'.bold.red + ' Sorry, there was an issue locating your config.json. Please see README.md');
        process.exit();
    }
    done();
}

// Post images to AWS S3 so they are accessible to Litmus and manual test
function aws() {
    var publisher = !!CONFIG.aws ? $.awspublish.create(CONFIG.aws) : $.awspublish.create();
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return gulp.src('email//dist/assets/img/*')
        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    //.pipe(publisher.cache())

    // print upload updates to console
    .pipe($.awspublish.reporter());
}

// Send email to Litmus for testing. If no AWS creds then do not replace img urls.
function litmus() {
    var awsURL = !!CONFIG && !!CONFIG.aws && !!CONFIG.aws.url ? CONFIG.aws.url : false;

    return gulp.src('email/dist/**/*.html')
        .pipe($.if(!!awsURL, $.replace(/=('|")(\/?assets\/img)/g, "=$1" + awsURL)))
        .pipe($.litmus(CONFIG.litmus))
        .pipe(gulp.dest('email/dist'));
}

// Send email to specified email for testing. If no AWS creds then do not replace img urls.
function mail() {
    var awsURL = !!CONFIG && !!CONFIG.aws && !!CONFIG.aws.url ? CONFIG.aws.url : false;

    if (EMAIL) {
        CONFIG.mail.to = [EMAIL];
    }

    return gulp.src('email/dist/**/*.html')
        .pipe($.if(!!awsURL, $.replace(/=('|")(\/?assets\/img)/g, "=$1" + awsURL)))
        .pipe($.mail(CONFIG.mail))
        .pipe(gulp.dest('email/dist'));
}

// Copy and compress into Zip
function zip() {
    var dist = 'dist';
    var ext = '.html';

    function getHtmlFiles(dir) {
        return fs.readdirSync(dir)
            .filter(function(file) {
                var fileExt = path.join(dir, file);
                var isHtml = path.extname(fileExt) == ext;
                return fs.statSync(fileExt).isFile() && isHtml;
            });
    }

    var htmlFiles = getHtmlFiles(dist);

    var moveTasks = htmlFiles.map(function(file) {
        var sourcePath = path.join(dist, file);
        var fileName = path.basename(sourcePath, ext);

        var moveHTML = gulp.src(sourcePath)
            .pipe($.rename(function(path) {
                path.dirname = fileName;
                return path;
            }));

        var moveImages = gulp.src(sourcePath)
            .pipe($.htmlSrc({ selector: 'img' }))
            .pipe($.rename(function(path) {
                path.dirname = fileName + '/' + path.dirname;
                return path;
            }));

        return merge(moveHTML, moveImages)
            .pipe($.zip(fileName + '.zip'))
            .pipe(gulp.dest('dist'));
    });

    return merge(moveTasks);
}

//=============================PUBLIC BUILD=============================//
var paths = {
    build: {
        html: 'public/build/',
        js: 'public/build/js/',
        css: 'public/build/css/',
        img: 'public/build/img/'
    },

    src: {
        html: 'public/src/index.html',
        js: 'public/src/js/*.js',
        style: 'public/src/styles/style.scss',
        img: 'public/src/img/**/*.*'
    },
    watch: {
        html: 'public/src/**/*.html',
        js: 'public/src/js/**/*.js',
        style: 'public/src/styles/**/*.scss',
        img: 'public/src/img/**/*.*'
    },
};

gulp.task('js:build', function() {
    return gulp.src(paths.src.js)
        .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(paths.build.js))
});

gulp.task('fonts', function() {
    return gulp.src('public/src/fonts/*.*')
        .pipe(gulp.dest('public/build/fonts/'))
})

gulp.task('style:build', function() {
    return gulp.src(paths.src.style)
        .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.cleanCss())
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(paths.build.css))
});

gulp.task('image:build', function() {
    return gulp.src(paths.src.img)
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(paths.build.img))
});

gulp.task('public', gulp.parallel('fonts', 'style:build', 'image:build', 'js:build'));

gulp.task('watch', function() {
    gulp.watch(paths.watch.style, gulp.series('style:build'));
    gulp.watch(paths.src.img, gulp.series('image:build'));
    gulp.watch(paths.watch.js, gulp.series('js:build'));
});

gulp.task('dev', gulp.series('public', gulp.parallel('watch')));