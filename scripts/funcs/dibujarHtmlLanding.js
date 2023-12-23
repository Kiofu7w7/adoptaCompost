import { buscarMascota } from "../axios/mascotasAxios.js";
import { mostrarPopup } from "./dibujarPopup.js"

let perroGato;

export const PlantillaLanding = (contenedor) => {
    const plantilla = `
    <section id="sectionLanding">
        <h1>Adopta una adorable mascota</h1>
        <h2>Categorías de mascotas</h2>
        <button id="btnPerros">Perros</button>
        <button id="btnGatos">Gatos</button>
    </section>
    `
    contenedor.innerHTML = plantilla
}

export const dibujarHTML = (contenido, contenedor) => {
    contenedor.innerHTML += contenido
}

export const borrarContenido = (contenedor) => {
    contenedor.innerHTML = ''
}

export const crearContenedor = (contenedor, nombre) => {
    let seccion = document.createElement('section')
    seccion.setAttribute("id", nombre)
    seccion.setAttribute("class", nombre)
    contenedor.appendChild(seccion)
}

export const crearTarjetaMascota = (data, contenedor) => {
    data.forEach(element => {
        const tarjeta = document.createElement('article');
        tarjeta.id = element.id;
        tarjeta.className = element.id_usuario;

        const imagen = document.createElement('img');
        imagen.src = element.url;
        imagen.alt = 'TarjetaMascota';

        const titulo = document.createElement('h2');
        titulo.textContent = element.Nombre;

        const parrafo = document.createElement('p');
        parrafo.textContent = element.raza;

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(parrafo);

        tarjeta.addEventListener('click', () => {
            manejarClic(element.id, element.id_usuario);
        });

        contenedor.appendChild(tarjeta);
    });
    perroGato = sessionStorage.getItem("perroGato")
}

async function manejarClic(idMascota, idDueño) {
    const dataMascota = await buscarMascota(perroGato, idMascota)
    console.warn(dataMascota)
    mostrarPopup(`
    <p>Id de la mascota: ${idMascota}</p>
    <p>Id del dueño: ${idDueño}</p>
    <p>Perro o gato?: ${perroGato}</p>
    `)
}

export const eliminarEventListeners = (data) => {
    data.forEach(element => {
        const tarjeta = document.getElementById(element.id);
        if (tarjeta) {
            tarjeta.removeEventListener('click', tarjeta.manejadorClic);
        }
    });
}

export const paginaNuevaConFooter = (contenedor) => {
    contenedor.innerHTML = "";
}