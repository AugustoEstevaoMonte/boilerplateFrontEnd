// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin'); // npm i gulp-imagemin@7.1.0
var cache = require('gulp-cache');
const browsersync = require('browser-sync').create();


// Minify images inside "app/images" folder and put the minified images inside "dist" folder
// 
function minifyImage(cb) {
	src('app/images/*')
		.pipe(cache(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({quality:75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		])))
		.pipe(dest('dist/images'));
	cb();
}


//Cache clean task
function clearCache(cb) {
	return cache.clearAll();
}

// Sass Task
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
	return src('app/js/script.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/scss/**/*.scss', 'app/**/*.js'],
		series(scssTask, jsTask, browserSyncReload)
	);
}

// Default Gulp Task

//Descomente o código abaixo para minificar as imagens, é recomendado usar somente 1 vez e aguardar que otimize as imagens
exports.default = series(clearCache, scssTask, jsTask, minifyImage, browserSyncServe, watchTask);

//Comente este código se for minificar a imagem, caso o contrário descomente.
//exports.default = series(clearCache, scssTask, jsTask, browserSyncServe, watchTask);
