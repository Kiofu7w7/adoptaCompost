import { urlChats } from "../urls.js";

export const obtenerDataChats = async () => {
    try {
        const responseUsuarios = await axios.get(urlChats);
        return responseUsuarios.data
    } catch (error) {
        console.error("Error al obtener la informacion de las mascotas: " + error)
    }
}

export const buscarChatsUsuario = async (id) => {
    try {
        const responseChatUsuario = await axios.get(urlChats);
        const chatsUsuario = filtrarPorMiemborsChats(responseChatUsuario.data, id)
        return chatsUsuario
    } catch (error) {
        console.error("Error al obtener la informacion del usuario: " + error)
    }
}

export const buscarChat = async (id, receptor) => {
    try {
        const responseChatUsuario = await axios.get(urlChats);
        const chatEncontrado = getChat(responseChatUsuario.data, id, receptor)
        return chatEncontrado
    } catch (error) {
        console.error("Error al obtener la informacion del usuario: " + error)
    }
}

function filtrarPorMiemborsChats(chats, idUsuario) {
    const chatsFiltrados = []
    for (const chat of chats) {
        if (chat.integrantes.miembro1_id === idUsuario || chat.integrantes.miembro2_id === idUsuario) {
            chatsFiltrados.push(chat)
        }
    }
    return chatsFiltrados
}

async function getChatOCrear(idMiembro1, idMiembro2) {
    const chatNuevo = {
        id: crypto.randomUUID(),
        integrantes: {
            miembro1_id: idMiembro1,
            miembro2_id: idMiembro2
        },
        mensajes: ""
    }
    await axios.post(urlChats, chatNuevo)
    return chatNuevo
}

async function getChat(chats, idMiembro1, idMiembro2) {
    for (const chat of chats) {
        if (chat.integrantes.miembro1_id === idMiembro1 && chat.integrantes.miembro2_id === idMiembro2) {
            return chat
        }
    }
    const nuevoChat = await getChatOCrear(idMiembro1, idMiembro2)
    return nuevoChat

}

export async function agregarMensajeAChat(idChat,chat, idRemitente, mensaje) {
    const horaActual = obtenerHoraActual()
    // Crea un nuevo objeto mensaje
    console.error(chat.mensajes)
    if(chat.mensajes == ""){
        chat.mensajes += `${idRemitente}:'${mensaje}',${horaActual}`
    }else{
        chat.mensajes += `|${idRemitente}:'${mensaje}',${horaActual}`
    }
    await axios.put(urlChats+"/"+idChat, chat)
}

const obtenerHoraActual = () => {
    const now = new Date();
    const hora = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
}
