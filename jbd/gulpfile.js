var gulp = require('gulp');
var PATH = require('path');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var notify = require("gulp-notify");

//HTML
var extender = require('gulp-html-extend');

//Styles
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');

var replace = require('gulp-replace');

var fontelloConfig = require('gulp-fontello-config');
var exec = require('child_process').exec;

//Build
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

var requireResolve = require('require-resolve');
function fetchModules(modulesName) {
    var resultArray = [];
    modulesName.forEach(function (currentValue,index,array) {
        var module = requireResolve(currentValue, __filename)
        if (module) {
            console.log(module);
            resultArray.push(module['src']);
        } else {
            console.error(
                '\x1b[31m',
                '\t >> Error! Module \''+currentValue+'\' not found in <<node_modules>>!',
                '\x1b[0m' );
        }
    });
    return resultArray;
}

PATH = {
    root: './',
    src: {
    	root: 'src/',
    	rootSCSS: 'src/scss/',
    	scssBaseFolder: 'src/scss/base/',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        index: 'src/html/index.html',
        html: 'src/html/',
        htmlFolder: 'src/html/**/*.html',
        fontello: './src/scss/vendor/fontello/',
        fontsFontello: './src/fonts/fontello/',
        node: './node_modules/'
    },
    build: {
    	root: 'design/',
        css: 'design/css/',
        js: 'design/js/',
        fontello: 'design/fonts/fontello/'
    }
};

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: PATH.root
        }
    });
    gulp.start('watch');
    gulp.watch(PATH.build.root+"*.html").on("change", reload);
});

gulp.task('sass', function() {
    return gulp.src(/*PATH.src.scss*/ 'src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATH.build.css))
        .pipe(notify("SASS was compiled successfully!"));
});

gulp.task('sass:watch', function() {
    gulp.watch(PATH.src.scss, ['sass']);
});

gulp.task('extend', function () {
    gulp.src(PATH.src.index)
        .pipe(extender({annotations:true,verbose:true,root:PATH.src.html}))
        .pipe(gulp.dest(PATH.root))
        .pipe(notify("HTML was extended successfully!"));
 
});

gulp.task('html:watch', function () {
    gulp.watch([PATH.src.htmlFolder], ['extend'])
})

gulp.task('js:watch', function () {
    gulp.watch([PATH.src.js], ['js']);
    console.log(PATH.src.js);
})

gulp.task('watch', ['html:watch','sass:watch','js:watch']);

gulp.task('js', function () {
    gulp.src(PATH.src.js)
        .pipe(gulp.dest(PATH.build.js))
        .pipe(notify("JavaScript was copied successfully!"));
 
});

gulp.task('autoprefix', function() {
    return gulp.src(PATH.build.css)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('/' + PATH.build.css));
});

gulp.task('normalize', function () {
	gulp.src("./node_modules/normalize.css/normalize.css")
	    .pipe(rename(PATH.src.scssBaseFolder + '_normalize.scss'))
	    .pipe(gulp.dest(PATH.root));
});

gulp.task('get_grid', function () {
	var srcPath = './node_modules/bootstrap-sass/assets/stylesheets/bootstrap/';
	[
		/*'_normalize.scss',*/
		'_grid.scss',
		'mixins/_clearfix.scss',
		'mixins/_grid.scss',
		'mixins/_grid-framework.scss',
		'mixins/_responsive-visibility.scss',
	].forEach(function (currentValue, index, array) {
		console.log('Get: '+srcPath + currentValue);
		gulp.src(srcPath + currentValue)
			.pipe(rename(currentValue))
			.pipe(gulp.dest('./src/scss/vendor/grid/'));
	})
});


//Fontello
var options = {
       name: 'fontello',        // The font name. Will be used as file name 
       prefix: 'fa-',           // The default css prefix 
       suffix: false,           // The css suffix 
       hinting: 1000,
       units: 1000,             // Units per em 
       ascent: 85,
       alias: {                 // Alias to use for parsing 
          fontawesome: 'fa',
          fontelico: 'fo',
          entypo: 'en'
       },
       //packs: ['meteocons'],    // Use this option to add all glyphs in the  
                                // fonts pack meteocons for example 
       done: function(config) { // The callback function 
            // you can change config object here 
            // config.glyphs contains glyphs 
            console.log(config.glyphs);
       }
};

gulp.task('get_fontello', function() {
    gulp.src(PATH.build.root + 'index.html')
        .pipe(fontelloConfig(options))
        .pipe(rename('config.json'))
        .pipe(gulp.dest(PATH.src.fontello));

        var args = [
            'fontello-cli',
            /*'install',*/
            ' open',
            ' --config ' + PATH.src.fontello + 'config.json',
            ' --css ' + PATH.src.fontello,
            ' --font ' + PATH.src.fontsFontello
        ].join('');
        console.log(args);
        exec(args, function(err, out, code) {
            if (err instanceof Error) {
                throw err;
                process.stderr.write(err);
            }
            process.stdout.write(out);
            process.exit(code);
        });
});

gulp.task('fontello', function() {
        var args = [
            'fontello-cli',
            ' install',
            ' --config ' + PATH.src.fontello + 'config.json',
            ' --css ' + PATH.src.fontello,
            ' --font ' + PATH.build.fontello
        ].join('');
        console.log(args);
        exec(args, function(err, out, code) {
            if (err instanceof Error) {
                throw err;
                process.stderr.write(err);
            }
            process.stdout.write(out);
            process.exit(code);
        });
        gulp.start('get_fontello_codes');
});

gulp.task('get_fontello_codes', function () {
    console.log('RUN: get_fontello_codes');
    gulp.src(PATH.src.fontello + 'fontello-codes.css')
        //.pipe(replace(':before', '::after'))
        .pipe(rename('_fontello-codes.scss'))
        .pipe(gulp.dest(PATH.src.fontello));
})

gulp.task('build:scripts', function() {
  gulp.src( fetchModules([
        'readmore-js',
        'lightbox2',
        'select2',
        'swiper'
    ]))
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(concat('plugins.min.js'))
    .pipe(gulp.dest('./'+PATH.build.js));
});

gulp.task('build',['build:scripts']);

gulp.task('cssnano', function() {
    return gulp.src('./main.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./out'));
});



gulp.task('test',function () {
    var a = ['select2','gulp','swiper'];
    console.log('Type of A: '+typeof a);
    var t = fetchModules(['select2','gulp','swiper']);
    console.log(fetchModules(['select2','gulp','swiper3']));
})