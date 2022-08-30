//MAIN.JS

/*
Este archivo existe solamente para tomar los archivos pug/sass del proyecto
y renderizarlos a html/css
*/

const pug = require('pug');
const sass = require('sass');
const files = require('./fileFunctions'); //Funciones para simplificar la creación de archivos

//Renderizar estilos:
let styleRules = sass.compile(__dirname + '/src/sass/main.sass');
files.writeFile(__dirname + '/dist/css/styles.css', styleRules.css);

//Renderizar páginas HTML
const pageSrcPath = __dirname + '/src/pug/pages/';
files.writeFile(__dirname + '/dist/index.html', pug.renderFile(pageSrcPath + 'index.pug'));

//Renderizar modales HTML
const modalSrcPath = __dirname + '/src/pug/modals/';
const outputPath = __dirname + '/dist/contents/';
const modalFilenames = [
    'mariela-A',
    'mariela-A1',
    'mariela-A2',
    'mariela-A3',
    'mariela-A4',
    'mariela-B',
    'mariela-B1',
    'mariela-C',
    'mariela-C1',
    'mariela-C2',
    'mariela-D',
    'mariela-D1',
    'mariela-E',
    'mariela-E1',
    'mariela-E2',
    'ana-01',
    'ana-01-A',
    'ana-01-B',
    'ana-01-C',
    'ana-01-D',
    'ana-01-E',
    'ana-02',
    'ana-03',
    'ana-04',
    'ana-05',
    'ana-06',
];

for ( let filename of modalFilenames ) {
    files.writeFile(outputPath + filename + '.html', pug.renderFile(modalSrcPath + filename + '.pug'));
}