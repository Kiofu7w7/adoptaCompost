import { buscarUsuario, cambiarUsuario } from "../axios/usuariosAxios.js"
import { dibujarFooter } from "./dibujarFooter.js"

let idUsuarioLocal = "1"

export const ejecutrarPerfil = async (cont) => {
    const dataUser = await buscarUsuario(idUsuarioLocal)
    plantillaPerfil(cont, dataUser)
}

const plantillaPerfil = async (contenedor, data) => {
    contenedor.innerHTML += `
    <h1 class="tituloPerfil">Perfil</h1>
    <section id="sectionChats">
        <div id="contenedorPerfil">
            <img src="${data.url_foto_perfil}">
            <h2 class="centerText" id="nombreCompletoPerfil">${data.nombre} ${data.apellidos}</h2>
            <h3 class="centerText editCuenta">Editar Cuenta</h3>
            <div class="inputsContainer">
                <h2>Nombre</h2>
                <input id="nombrePerfil" type="text">
            </div>
            <div class="inputsContainer">
                <h2>Apellido</h2>
                <input id="apellidoPerfil" type="text">
            </div>
            <div  class="inputsContainer">
                <h2>Correo</h2>
                <input id="correoPerfil"  type="text">
            </div>
            <button id="btnGuardarPerfil">Guardar</button>
        </div>
    </section>
    `
    const nombreInput = document.getElementById("nombrePerfil")
    const apellidosInput = document.getElementById("apellidoPerfil")
    const correoInput = document.getElementById("correoPerfil")
    const nombreCompleto = document.getElementById("nombreCompletoPerfil")

    nombreInput.value = data.nombre
    apellidosInput.value = data.apellidos
    correoInput.value =  data.email

    const botonGuardar = document.getElementById("btnGuardarPerfil")
    botonGuardar.addEventListener('click', async () => {
        data.nombre = nombreInput.value
        data.apellidos = apellidosInput.value
        data.email = correoInput.value
        try {
            await cambiarUsuario(data.id, data)
            const dataUserNuevo = await buscarUsuario(idUsuarioLocal)
            nombreInput.value = dataUserNuevo.nombre
            apellidosInput.value = dataUserNuevo.apellidos
            correoInput.value =  dataUserNuevo.email
            nombreCompleto.innerText = `${dataUserNuevo.nombre} ${dataUserNuevo.apellidos}`
        } catch (error) {
            console.log(error)
        }

    })

    dibujarFooter(contenedor)
}