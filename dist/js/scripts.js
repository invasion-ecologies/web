//Inicializar funciones de a-frame y popups en el home
if(document.querySelector('html').classList.contains('home')){
    //Wanderers
    const WDR = new Wanderers('.wanderer');
    //Popups
    setupGlobalLoaderListeners();
}

//TODO: Agrupar estas funciones en un componente/clase Popup

function setupLocalClosingListeners(wrapper) {
    const contentClosers = wrapper.querySelectorAll('.js-close-modal');

    for(let closer of contentClosers){
        closer.addEventListener('click', function localContentCloser(event) {
            event.preventDefault();
            let element = event.target;
            console.log(element);
            if(element.classList.contains('js-close-modal')){
                element.removeEventListener('click', localContentCloser);
                //Ocultar y eliminar contenido actual
                hideModal(wrapper).then(() => {
                    wrapper.remove();
                });
            }

        });
    }

}

function setupGlobalLoaderListeners () {
    //Listeners que existen mientras la página esté abierta
    const contentLoaders = document.querySelectorAll('.js-load-content');
    for(let loader of contentLoaders){
        loader.addEventListener('click', (event) => {
            console.log('global click');
            event.preventDefault();
            let element = event.target;
            let link = element.getAttribute('href');
            loadContent(link);
        })
    }
}

function setupLocalLoaderListeners (wrapper) {
    //Loaders que dejan de existir al cargar un nuevo contenido
    const contentLoaders = wrapper.querySelectorAll('.js-load-content');
    for(let loader of contentLoaders){

        loader.addEventListener('click', function localContentLoader(event) {
            event.preventDefault();
            let element = event.target;
            element.removeEventListener('click', localContentLoader)
            let link = element.getAttribute('href');

            //Eliminar contenido actual, y después mostrar el nuevo contenido
            hideModal(wrapper).then(() => {
                wrapper.remove();
                loadContent(link);
            });
        });
    }
}

function hideModal(wrapper){
    const popupBody = wrapper.querySelector('#popup-main');

    return new Promise((resolve, reject) => {

        popupBody.addEventListener('transitionend', () => {
            resolve();
        })

        if(popupBody.classList.contains('view-fade-in--visible')){
            popupBody.classList.remove('view-fade-in--visible');
        }
    
        if(popupBody.classList.contains('view-togglable-pointer-events--active')){
            popupBody.classList.remove('view-togglable-pointer-events--active');
        }
    });
}

function showModal(wrapper) {
    const popupBody = wrapper.querySelector('#popup-main');

    popupBody.getBoundingClientRect(); //Forzar reflow

    if(! popupBody.classList.contains('view-fade-in--visible')){
        popupBody.classList.add('view-fade-in--visible');
    }
    if(! popupBody.classList.contains('view-togglable-pointer-events--active')){
        popupBody.classList.add('view-togglable-pointer-events--active');
    }
}


function loadContent(url) {
    fetch('contents/'+url).then((response) => {
        console.log('content promise done');
        return response.text();
    })
    .then((content) => {
        const modal = document.createElement('div');
        modal.innerHTML = content;
        const body = document.querySelector('body');
        body.append(modal); //agregar el contenido

        showModal(modal);
        setupLocalLoaderListeners(modal);
        setupLocalClosingListeners(modal);
    });



    // Manage content visibility
    // console.log('loading content...');

    // const transitionPromise = new Promise((resolve) => {
    //     //If the popup already has content, wait until it has faded out before resolving:
    //     if(contentWrapper.classList.contains('view-fade-in--visible')){
    //         console.log('popup has content');
    //         contentWrapper.classList.remove('view-fade-in--visible');
    //         contentWrapper.addEventListener('transitionend', function animationendListener() {
    //             contentWrapper.removeEventListener('transitionend', animationendListener);
    //             contentWrapper.classList.add('view-fade-in--visible');
    //             resolve();
    //         });
    //     }
    //     //Else, resolve immediately:
    //     else {
    //         console.log('popup does not have content');
    //         contentWrapper.classList.add('view-fade-in--visible');
    //         resolve();
    //     }
    //     console.log('transition promise done');
    // });

    // Promise.all([
    //     fetch('contents/'+url).then((response) => {
    //         console.log('content promise done');
    //         return response.text();
    //     }),
    //     transitionPromise
    // ])
    // .then((returnedValues) => {
    //     const content = returnedValues[0];
    //     contentWrapper.innerHTML = content;
    //     setupLocalLoaderListeners();
    // });
}