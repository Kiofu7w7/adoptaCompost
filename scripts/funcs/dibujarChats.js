import { buscarChatsUsuario } from "../axios/chastAxios.js"
import { buscarUsuario } from "../axios/usuariosAxios.js"
import { dibujarFooter } from "./dibujarFooter.js"
import { chatDetalles } from "./dibujarHtmlLanding.js"

let idUsuarioLocal = "1"

export const ejecutarChats = (cont) => {
    plantillaChats(cont)
    dibujarChats()
}

const plantillaChats = (contenedor) => {
    contenedor.innerHTML += `
    <section id="sectionChats">
        <h1>Mensajes</h1>
        <div id="contenedorChats">
        </div>
    </section>
    `
    dibujarFooter(contenedor)
}

const dibujarChats = async () => {
    const chatsUser = await buscarChatsUsuario("1")
    recorrerChats(chatsUser)
}

async function recorrerChats(chats) {
    const contenedorChats = document.getElementById("contenedorChats")
    let datosU2;
    for (const chat of chats) {
        const id = chat.id;
        const integrantes = chat.integrantes;
        const mensajes = chat.mensajes;
        const datosUser2 = await buscarUsuario(integrantes.miembro2_id)
        const mensajesString = mensajes;
        const mensajesIndividuales = mensajesString.split('|');
        const ultimoMensaje = mensajesIndividuales[mensajesIndividuales.length - 1];
        if (ultimoMensaje){
            const [remitente, mensaje, hora] = ultimoMensaje.match(/(\d+):'([^']+)',(\d+:\d+)/).slice(1);
    
            contenedorChats.innerHTML += `
            <a class="linkchat" id="${integrantes.miembro2_id}">
                <div class="contenedorChats">
                    <div class="contenedorChat">
                        <div class="contenedorImagenChat">
                            <img id="imgChat" src="${datosUser2.url_foto_perfil}">
                        </div>
                        <div class="containerDetalles">
                            <div class="primeraFila">
                                <h3 id="NombreChat">${datosUser2.nombre}</h3>
                                <p id="horaUltimoMensaje">${hora}</p>
                            </div>
                            <div class="segundaFila">
                                <p id="ultimoMensaje">${mensaje}</p>
                            </div>
                        </div>
                        <div class="divFlechaEntrar" >
                            <img class="flechaEntrar" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702750222/reto1/icons/b8dizgwyhrlshqyhq8d3.png">
                        </div>
                    </div>
                </div>
            </a>
            `
     
        }
    }

    document.addEventListener("click",async function(event) {
        let targetElement = event.target; 
        while (targetElement != null) {
            if (targetElement.classList.contains("linkchat")) {
                const datosUser2 = await buscarUsuario(targetElement.id)
                chatDetalles(idUsuarioLocal,  targetElement.id, datosUser2.url_foto_perfil, datosUser2.nombre, datosUser2.apellidos)
                return;
            }
            targetElement = targetElement.parentElement;
        }
    });
}