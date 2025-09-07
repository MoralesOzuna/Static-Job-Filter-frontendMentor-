const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');

// Compilar SCSS a CSS y ponerlo en build/css
function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
}

// Copiar JS a build/js
function javascript() {
    return src('js/**/*.js')
        .pipe(dest('build/js'));
}

// Optimizar imágenes
function imagenes() {
    return src('src/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/images'));
}

// Convertir imágenes a WebP
function versionWebp() {
    return src('src/images/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/images'));
}

// Convertir imágenes a AVIF
function versionAvif() {
    return src('src/images/**/*.{png,jpg}')
        .pipe(avif({ quality: 50 }))
        .pipe(dest('build/images'));
}

// Tarea default
exports.default = series(css, javascript, imagenes, versionWebp, versionAvif);