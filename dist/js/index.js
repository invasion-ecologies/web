//Funciones de modal inicializadas en modal.js
//TODO: refactorizar modales como ¿objetos?
//¿Considerar al DOM del index como un solo objeto mutado por las funciones de modales?

//Inicializar objeto global app
const App = {};

//Inicializar utilidades globales (refactorizar?)
const utils = {
    forceReflow: (el) => {
        el.getBoundingClientRect();
    }
};

//Si estamos en el home, inicializar las figuras que se desplazan en a-frame
if(document.querySelector('html').classList.contains('home')){
    //Wanderers
    const WDR = new Wanderers('.wanderer');
    //Asignar event listeners a las figuras para abrir los modales
    setupGlobalLoaderListeners();
}

// Preloader
//TODO: Agregar un método .add() a StateComponents, para poder agregar componentes en distintas secciones

App.StateComponents = new StateComponents({
    'overlay': {
        stateClasses: {
        'default': ['view-fade-in', 'view-togglable-pointer-events'],
        'active': ['view-fade-in--visible', 'view-togglable-pointer-events--active'],
        }
    }
});

const preloader = document.querySelector('#app-preloader');
const aframeScene = document.querySelector('a-scene');

aframeScene.addEventListener('loaded', ()=>{
    App.StateComponents.changeState(preloader, 'overlay', 'default');
});
