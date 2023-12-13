// gulp es para automatizar tareas
// cada funcion es una tarea para gulp
// todas las tareas las defines mediante una funcion
// todas las funciones las mandas llamar por el nombre que le das ejmplo.- function (tarea)
// .pipe::::::es una accion que se realiza despues de otra
// .pipe:::::se ejecutan en cadena uno tras otro, nunca todos juntos
// require(requerir)::::: es para extraer de otras partes

// funciones
// dest::::sirve para guardar los archivos
// src:::::sirve para identificar un archivo
//collback,done u cb::::::es una funcion que se llama despues de otra funcion o para decirle gulp que ya finalizo la tarea

// (autoprefixer y cssnano) van dentro de ((postcss))
// (autoprefixer) se va asegurar de funcionar en el navegador que tu le pidas 
// (cssnano) va comprimir el codigo
// (postcss ) le hace unas modificaciones al codigo por medio del (autoprefixer) y (cssnano)



const { src, dest, watch, parallel } = require('gulp');



// css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');  
const cssnano = require('cssnano');            
const postcss = require('gulp-postcss');  
const sourcemaps = require('gulp-sourcemaps');     
// imagenes 
const avif = require('gulp-avif');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
// javaScript  
const terser = require('gulp-terser-js')


function javaScript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))
    done();
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
};
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}
function versionWebp(done) {
    const opciones = {
        quality: 50 //quality:::calidad
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
    done();
}
function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())           //conpilar / reunir
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done();
}
function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javaScript)
    done();
}

exports.js = javaScript;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.css = css;
exports.dev = parallel(javaScript,versionAvif, imagenes, versionWebp, dev);

