import { Output } from "gulp-typescript/release/output";

// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var cache = require('gulp-cache');
const browsersync = require('browser-sync').create();
const webp = require('gulp-webp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');


function tsTask() {
		return src('app/ts/**/*.ts')
			.pipe(ts({
				declaration: false,
				target: 'es5',
				noImplicitAny: true,
				outFile: 'script.js',
			}))
			.pipe(uglify())
			.pipe(dest('dist/js',{ sourcemaps: '.' }));
}




//The task to convert images to webp
function webpTask() {
	return src('app/images/*.{jpg,png}')
		.pipe(webp({
			quality: 50 // Change here the value if you want to change the quality of the webp images
		}))
		.pipe(dest('dist/images'));
}

//Cache clean task
function clearCache(cb:any) {
	return cache.clearAll();
}

// Sass Task
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}


// Browsersync
function browserSyncServe(cb:any) {
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
function browserSyncReload(cb:any) {
	browsersync.reload();
	cb();
}
// Create a watch task for typescript files and SASS files
// Use series to run the tasks with browserSync
function watchTask() {
	watch('*.html', browserSyncReload);
	watch('app/scss/**/*.scss', series(scssTask, browserSyncReload));
	watch('app/ts/**/*.ts', series(tsTask, browserSyncReload));
	watch('app/images/*.{jpg,png}', series(webpTask, browserSyncReload));
}


// Default Gulp Task

//Descomente o código abaixo para minificar as imagens, é recomendado usar somente 1 vez e aguardar que otimize as imagens
exports.default = series(clearCache, scssTask, tsTask, webpTask, browserSyncServe, watchTask);

//Comente este código se for minificar a imagem, caso o contrário descomente.
//exports.default = series(clearCache, scssTask, tsTask, browserSyncServe, watchTask);
