
document.addEventListener('DOMContentLoaded', function () {
    inicirApp();
});

function inicirApp() {
    navegacionfija();
    crearGaleria();
    scrollNav();
}

function navegacionfija() {
    const barra = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    const body = document.querySelector('body');
    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" height="300" width="200" src="/src/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}
function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" height="300" width="200" src="/src/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // overlay
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };


    // boton para cerrar el modal
    const cerrarmodal = document.createElement('p');
    cerrarmodal.textContent = 'X';
    cerrarmodal.classList.add('btm-cerrar');
    cerrarmodal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarmodal);

    // agregar al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')

}





// bounding::mover dando saltos
// get:::::::consegir,llegar,obtener
// smoots::::suaviza,suave
// behavior::comportamiento
// view::::::vista,ver,mirar
// target:::::el objetivo,el blanco
// forEach::::para cada
// all::::::::tod@s
// add::::::::agregar
// append:::::añadir
// fixed:::::fijo
// inner::::::interno
// items:::::elementos
// let::::::::permitir,dejar
// listener:::oyente
// overlay:::cubrirse,cubrir
// query::::::consulta
// <= ::::::::menor o igual