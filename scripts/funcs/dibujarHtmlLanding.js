import { agregarMensajeAChat, buscarChat, buscarChatsUsuario } from "../axios/chastAxios.js";
import { buscarMascota } from "../axios/mascotasAxios.js";
import { buscarUsuario, ponerFavorito, quitarFavorito } from "../axios/usuariosAxios.js";
import { mostrarPopup } from "./dibujarPopup.js"

let perroGato;
let idUsuarioLocal = "1"

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
            detallesMascotas(element.id, element.id_usuario);
        });

        contenedor.appendChild(tarjeta);
    });
    perroGato = sessionStorage.getItem("perroGato")
}

async function detallesMascotas(idMascota, idDueño) {
    const dataMascota = await buscarMascota(perroGato, idMascota)
    const dataDueño = await buscarUsuario(idDueño)
    const dataUsuario = await buscarUsuario(idUsuarioLocal)

    let favoritoIdONoImg;

    function esFavoritoONo(datos, idMascota, tipoMascota) {
        const idsMascotas = datos["id_mascotas_favoritas_" + tipoMascota].split("|");
        let imagen = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/wutq9ccbbbbb5mgd3de8.png"
        favoritoIdONoImg = "botonFavoritos"
        idsMascotas.forEach(element => {
            if (element == idMascota) {
                imagen = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/jcmaxesvrzzuzudgksfe.png"
                favoritoIdONoImg = "botonNoFavoritos"
            }
        });
        return imagen

    }

    let imagenFovorito = esFavoritoONo(dataUsuario, idMascota, perroGato)

    let imagenSexo;
    if (dataMascota.sexo == "macho") {
        imagenSexo = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/ctqwlhlhnopqmpeqyehb.png"
    } else {
        imagenSexo = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613337/reto1/icons/kkjjhsprraelueayhsen.png"
    }

    let personalidadesHTML = "";

    function crearPersonalidad(personalidad) {
        if (personalidad == "cariñoso") {
            personalidadesHTML += `
            <div class="divPerosonalidad">
                <img class="imgPersonalidades" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/ldsyknj4wcgg5vrtyhy6.png">
                <p id="persoPHTML">Cariñoso</p>
            </div>
            `;
        } else if (personalidad == "inquieto") {
            personalidadesHTML += `
            <div class="divPerosonalidad">
                <img class="imgPersonalidades" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/nmkhlzpgkk9f6njvuy4d.png">
                <p id="persoPHTML">Inquieto</p>
            </div>
            `;
        } else if (personalidad == "jugueton") {
            personalidadesHTML += `
            <div class="divPerosonalidad">
                <img class="imgPersonalidades" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/wxdkaqxkonf7ho4raxrt.png">
                <p id="persoPHTML">Jugueton</p>
            </div>
            `;
        }
    }

    for (let propiedad in dataMascota.personalidades) {
        let valor = dataMascota.personalidades[propiedad];
        if (valor) {
            crearPersonalidad(propiedad)
        }
    }

    mostrarPopup(`
    <img class="imgMascota" src="${dataMascota.url}">
    <div class="tarjetaDetalles">
        <h1>${dataMascota.Nombre}</h1>
        <img class="imgIcono" src="${imagenSexo}">
        <img id="${favoritoIdONoImg}" class="imgIcono" src="${imagenFovorito}">
        <img class="imgIcono" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613340/reto1/icons/a54f5iqoit6tnqhbbic4.png">
        <p>${dataMascota.raza}</p>
        <img class="imgIcono" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1703370928/reto1/icons/oko4zqchcwitojpl4si4.png">
        <p>${dataMascota.edad}</p>
        <img class="imgIcono" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613340/reto1/icons/m2obn4yiyegfje2dvpmw.png">
        <p>${dataMascota.direccion}</p>
        <div class="contenedorPersonalidades">
            ${personalidadesHTML}
        </div>
        <h2>${dataMascota.extra.titulo}</h2>
        <h3>${dataMascota.extra.descripcion}</h3>
        <img class="fotoDueño" src="${dataDueño.url_foto_perfil}">
        <p>${dataDueño.nombre} ${dataDueño.apellidos}</p>
        <button id="botonContactar">Contactar</button>
    </div>
    `)
    document.getElementById("botonContactar").addEventListener('click', () => {
        chatDetalles(idUsuarioLocal, idDueño, dataDueño.url_foto_perfil, dataDueño.nombre, dataDueño.apellidos)
    })

    const favoritosClickHandler = () => {
        const botonFavoritos = document.getElementById("botonFavoritos");
        botonFavoritos.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/jcmaxesvrzzuzudgksfe.png");
        ponerFavorito(dataUsuario, idMascota, perroGato);
        botonFavoritos.id = "botonNoFavoritos";
        botonFavoritos.removeEventListener('click', favoritosClickHandler);
        const botonNoFavoritos = document.getElementById("botonNoFavoritos");
        botonNoFavoritos.addEventListener('click', noFavoritosClickHandler);
    };
    
    const noFavoritosClickHandler = () => {
        const botonNoFavoritos = document.getElementById("botonNoFavoritos");
        botonNoFavoritos.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/wutq9ccbbbbb5mgd3de8.png");
        quitarFavorito(dataUsuario, idMascota, perroGato);
        botonNoFavoritos.id = "botonFavoritos";
        botonNoFavoritos.removeEventListener('click', noFavoritosClickHandler);
        const botonFavoritos = document.getElementById("botonFavoritos");
        botonFavoritos.addEventListener('click', favoritosClickHandler);
    };

    if (favoritoIdONoImg == "botonFavoritos") {
        const botonFavoritos = document.getElementById("botonFavoritos");
        botonFavoritos.addEventListener('click', favoritosClickHandler);
    } else {
        const botonNoFavoritos = document.getElementById("botonNoFavoritos");
        botonNoFavoritos.addEventListener('click', noFavoritosClickHandler);
    }

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

const chatDetalles = async (idUsuario, idUsuario2, imagen, nombre, apellidos) => {

    //const chatsUser = await buscarChatsUsuario("1")
    const chatsUserEspecifico = await buscarChat(idUsuario, idUsuario2)
    //console.warn(chatsUser)
    mostrarPopup(`
    <div id="detallesChat">
        <img src="${imagen}">
        <h1>${nombre} ${apellidos}</h1>
        <div id="contenedorMensajes">
        </div>
    </div>
    <input id="inputEnviarTexto" type="text">
    `)
    const contenedorMensajes = document.getElementById("contenedorMensajes")
    const contenedorChat = document.getElementById("detallesChat")
    const mensajes = chatsUserEspecifico.mensajes.split("|")
    if (mensajes[0] != "") {
        mensajes.forEach((mensaje) => {
            const [remitente, texto, hora] = mensaje.match(/(\d+):'([^']+)',(\d+:\d+)/).slice(1);

            if (remitente == idUsuario) {
                contenedorMensajes.innerHTML += `
                <div class="mensaje mensajeSalidaContenedor">
                    <p>${hora}</p>
                    <div class="contenedorTexto mensajeSalida">
                        <div class="texto">
                            <p>${texto}</p>
                        </div>
                    </div>
                </div>`;
            } else {
                contenedorMensajes.innerHTML += `
                <div class="mensaje mensajeEntradaContenedor">
                    <p>${hora}</p>
                    <div class="contenedorTexto mensajeEntrada">
                        <div class="texto">
                            <p>${texto}</p>
                        </div>
                    </div>
                </div>`;
            }
        });
    }

    inputEnviarTexto.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await agregarMensajeAChat(chatsUserEspecifico.id, chatsUserEspecifico, idUsuario, inputEnviarTexto.value)
            contenedorChat.innerHTML = ""
            plantillaChatDetalles(nombre, apellidos, imagen)
        }
    })

}

const plantillaChatDetalles = (nombre, apellidos, imagen) => {
    contenedorChat.innerHTML += `
    <div id="detallesChat">
        <img src="${imagen}">
        <h1>${nombre} ${apellidos}</h1>
        <div id="contenedorMensajes">
        </div>
    </div>
    <input id="inputEnviarTexto" type="text">`
}