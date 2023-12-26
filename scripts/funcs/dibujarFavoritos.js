import { buscarMascota, obtenerDataMascotas } from "../axios/mascotasAxios.js"
import { buscarUsuario } from "../axios/usuariosAxios.js"
import { dibujarFooter } from "./dibujarFooter.js"
import { borrarContenido, crearTarjetaMascota, detallesMascotas, eliminarEventListeners } from "./dibujarHtmlLanding.js"

let idUsuarioLocal = "1"

export const ejecutarFavoritos = (cont) => {
    plantillaFavoritos(cont)
    dibujarFavoritos()
}

const plantillaFavoritos = (contenedor) => {
    contenedor.innerHTML += `
    <section id="sectionFavoritos">
        <h1>Favoritos</h1>
        <div id="contenedorFavoritos">
        </div>
    </section>
    `
    dibujarFooter(contenedor)
}

const dibujarFavoritos = async () => {
    const contFavoritos = document.getElementById("contenedorFavoritos")
    const dataLocalUser = await buscarUsuario(idUsuarioLocal)
    let favoritosPerro = dataLocalUser.id_mascotas_favoritas_perro
    favoritosPerro = favoritosPerro.split("|")
    let favoritosGato = dataLocalUser.id_mascotas_favoritas_gato
    favoritosGato = favoritosGato.split("|")

    const dibujarTarjeta = (data, tipo) => {
        if (tipo == "perro") {
            const tarjeta = document.createElement('article');
            tarjeta.id = data.id;
            tarjeta.className = data.id_usuario;
            tarjeta.setAttribute("data-value", tipo)

            const imagen = document.createElement('img');
            imagen.src = data.url;
            imagen.alt = 'TarjetaMascota';

            const contenido = document.createElement('div');
            contenido.className = 'contenido';

            const titulo = document.createElement('h2');
            titulo.textContent = data.Nombre;

            const parrafo = document.createElement('p');
            parrafo.textContent = data.raza;

            contenido.appendChild(titulo);
            contenido.appendChild(parrafo);

            tarjeta.appendChild(imagen);
            tarjeta.appendChild(contenido)

            tarjeta.addEventListener('click', () => {
                detallesMascotas(data.id, data.id_usuario, tarjeta.getAttribute("data-value"));
            });

            contFavoritos.appendChild(tarjeta);
        }else{
            const tarjeta = document.createElement('article');
            tarjeta.id = data.id;
            tarjeta.className = data.id_usuario;
            tarjeta.setAttribute("data-value", tipo)


            const imagen = document.createElement('img');
            imagen.src = data.url;
            imagen.alt = 'TarjetaMascota';

            const contenido = document.createElement('div');
            contenido.className = 'contenido';

            const titulo = document.createElement('h2');
            titulo.textContent = data.Nombre;

            const parrafo = document.createElement('p');
            parrafo.textContent = data.raza;

            contenido.appendChild(titulo);
            contenido.appendChild(parrafo);

            tarjeta.appendChild(imagen);
            tarjeta.appendChild(contenido)

            tarjeta.addEventListener('click', () => {
                detallesMascotas(data.id, data.id_usuario, tarjeta.getAttribute("data-value"));
            });

            contFavoritos.appendChild(tarjeta);
        }
    }

    for (let i = 0; i < favoritosPerro.length; i++) {
        const mascota = await buscarMascota("perro", favoritosPerro[i]);
        dibujarTarjeta(mascota, "perro")
    }

    for (let i = 0; i < favoritosGato.length; i++) {
        const mascota = await buscarMascota("gato", favoritosGato[i]);
        dibujarTarjeta(mascota, "gato")
    }


}