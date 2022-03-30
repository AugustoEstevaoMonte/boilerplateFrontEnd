// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
var cache = require('gulp-cache');
const browsersync = require('browser-sync').create();
//the module to convert images to webp
const webp = require('gulp-webp');


//The task to convert images to webp
function webpTask() {
	return src('app/images/*.{jpg,png}')
		.pipe(webp({
			quality: 50 // Change here the value if you want to change the quality of the webp images
		}))
		.pipe(dest('dist/images'));
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
exports.default = series(clearCache, scssTask, jsTask, webpTask, browserSyncServe, watchTask);

//Comente este código se for minificar a imagem, caso o contrário descomente.
//exports.default = series(clearCache, scssTask, jsTask, browserSyncServe, watchTask);
