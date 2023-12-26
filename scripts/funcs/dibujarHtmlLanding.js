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
        <div class="botonesPerrosGatos">
            <div class="botonAnimal" id="btnPerros">
                <div class="circuloAzul">
                    <img class="imagenBotonPerrosGatos" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/p3h1ogahwohtq2j5fzzs.png">
                </div>
                <p class="nombreBtn">Perros</p>
            </div>
            <div class="botonAnimal" id="btnGatos">
                <div class="circuloAzul">
                    <img class="imagenBotonPerrosGatos" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/dyvyu5ojjrxd2ui3bcjx.png">
                </div>
                <p class="nombreBtn">Gatos</p>
            </div>
        </div>
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
        perroGato = sessionStorage.getItem("perroGato")
        tarjeta.setAttribute("data-value", perroGato)

        const imagen = document.createElement('img');
        imagen.src = element.url;
        imagen.alt = 'TarjetaMascota';

        const contenido = document.createElement('div');
        contenido.className = 'contenido';

        const titulo = document.createElement('h2');
        titulo.textContent = element.Nombre;

        const parrafo = document.createElement('p');
        parrafo.textContent = element.raza;

        contenido.appendChild(titulo);
        contenido.appendChild(parrafo);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);

        tarjeta.addEventListener('click', () => {
            detallesMascotas(element.id, element.id_usuario, tarjeta.getAttribute("data-value"));
        });

        contenedor.appendChild(tarjeta);
    });
    perroGato = sessionStorage.getItem("perroGato")
}

export async function detallesMascotas(idMascota, idDueño, esPeOGa) {
    const dataMascota = await buscarMascota(esPeOGa, idMascota)
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

    let imagenFovorito = esFavoritoONo(dataUsuario, idMascota, esPeOGa)

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
    <div class="contenedorDetallesMascotas">
        <img class="imgMascota" src="${dataMascota.url}">
        <div class="tarjetaDetalles">
            <div class="nombreSexoFavoritos">
                <div class="nombreSexo">
                    <h1>${dataMascota.Nombre}</h1>
                    <img class="imgIcono" src="${imagenSexo}">
                </div>
                <div class="favoritoDIv">
                    <img id="${favoritoIdONoImg}" class="imgIconoFav" src="${imagenFovorito}">
                </div>
            </div>
            <div class="razaEdad">
                <div class="raza">
                    <img class="imgIcono" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613340/reto1/icons/a54f5iqoit6tnqhbbic4.png">
                    <p>${dataMascota.raza}</p>
                </div>
                <div class="edad">
                    <img class="imgIcono" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1703370928/reto1/icons/oko4zqchcwitojpl4si4.png">
                    <p>${dataMascota.edad}</p>
                </div>
            </div>
            <div class="direccionDiv">
                <img class="imgIcono" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613340/reto1/icons/m2obn4yiyegfje2dvpmw.png">
                <p>${dataMascota.direccion}</p>
            </div>
            <div class="contenedorPersonalidades">
                ${personalidadesHTML}
            </div>
            <div class="historia">
                <h2 class="tituloHistoria">${dataMascota.extra.titulo}</h2>
                <h3 class="detallesHistoria">${dataMascota.extra.descripcion}</h3>
            </div>
            <div class="dueñoDiv">
                <div class="fotoNombre">
                    <img class="fotoDueño" src="${dataDueño.url_foto_perfil}">
                    <div class="publicadoPorDiv">
                        <p>publicado por</p>
                        <p>${dataDueño.nombre} ${dataDueño.apellidos}</p>
                    </div>
                </div>
                <button id="botonContactar">Contactar</button>
            </div>
        </div>
    </div>
    `)
    document.getElementById("botonContactar").addEventListener('click', () => {
        chatDetalles(idUsuarioLocal, idDueño, dataDueño.url_foto_perfil, dataDueño.nombre, dataDueño.apellidos)
    })

    const favoritosClickHandler = () => {
        const botonFavoritos = document.getElementById("botonFavoritos");
        botonFavoritos.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/jcmaxesvrzzuzudgksfe.png");
        ponerFavorito(dataUsuario, idMascota, esPeOGa);
        botonFavoritos.id = "botonNoFavoritos";
        botonFavoritos.removeEventListener('click', favoritosClickHandler);
        const botonNoFavoritos = document.getElementById("botonNoFavoritos");
        botonNoFavoritos.addEventListener('click', noFavoritosClickHandler);
    };

    const noFavoritosClickHandler = () => {
        const botonNoFavoritos = document.getElementById("botonNoFavoritos");
        botonNoFavoritos.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/wutq9ccbbbbb5mgd3de8.png");
        quitarFavorito(dataUsuario, idMascota, esPeOGa);
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

export const chatDetalles = async (idUsuario, idUsuario2, imagen, nombre, apellidos) => {
    mostrarPopup(`
    <div class="contenedorChatDetalles">
        <div id="detallesChat">
            <div class="informacionChat">
                <img src="${imagen}">
                <h1>${nombre} ${apellidos}</h1>
            </div>
            <div id="contenedorMensajes">
            </div>
        </div>
        <input id="inputEnviarTexto" placeholder="Aa" type="text">
        </div>
        `)

        chatDibujar(idUsuario, idUsuario2, imagen, nombre, apellidos)

}

async function chatDibujar (idUsuario, idUsuario2, imagen, nombre, apellidos) {
    const chatsUserEspecifico = await buscarChat(idUsuario, idUsuario2)
    const contenedorMensajes = document.getElementById("contenedorMensajes")
    const contenedorChat = document.getElementById("detallesChat")
    const mensajes = chatsUserEspecifico.mensajes.split("|")
    console.warn(chatsUserEspecifico.mensajes)
    if (mensajes[0] != "") {
        mensajes.forEach((mensaje) => {
            const [remitente, texto, hora] = mensaje.match(/(\d+):'([^']+)',(\d+:\d+)/).slice(1);

            if (remitente == idUsuario) {
                contenedorMensajes.innerHTML += `
                <div class="mensaje mensajeSalidaContenedor">
                    <p>${hora}</p>
                    <div class="contenedorTexto mensajeSalida">
                        <div class="textoChat">
                            <p>${texto}</p>
                        </div>
                    </div>
                </div>`;
            } else {
                contenedorMensajes.innerHTML += `
                <div class="mensaje mensajeEntradaContenedor">
                    <p>${hora}</p>
                    <div class="contenedorTexto mensajeEntrada">
                        <div class="textoChat">
                            <p>${texto}</p>
                        </div>
                    </div>
                </div>`;
            }
        });
    }

    document.getElementById("inputEnviarTexto").addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await agregarMensajeAChat(chatsUserEspecifico.id, chatsUserEspecifico, idUsuario, inputEnviarTexto.value)
            await plantillaChatDetalles(contenedorChat, nombre, apellidos, imagen, idUsuario, idUsuario2)
        }
    })
}

const plantillaChatDetalles = async (contenedorChat, nombre, apellidos, imagen, id1, id2) => {
    contenedorChat.innerHTML = `
    <div class="contenedorChatDetalles">
    <div id="detallesChat">
        <div class="informacionChat">
            <img src="${imagen}">
            <h1>${nombre} ${apellidos}</h1>
        </div>
        <div id="contenedorMensajes">
        </div>
    </div>
    <input id="inputEnviarTexto" placeholder="Aa" type="text">
    </div>`
    await chatDibujar(id1, id2, imagen, nombre, apellidos)
}