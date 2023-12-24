import { dibuajarLanding } from "../../main.js";
import { ejecutarChats } from "./dibujarChats.js";
import { ejecutarFavoritos } from "./dibujarFavoritos.js";
import { ejecutrarPerfil } from "./dibujarHtmlPerfil.js";

let footer;

export const dibujarFooter = (contenedor) => {
    footer = document.createElement('div');
    footer.innerHTML = `
        <button id="btnHome">Home</button>
        <button id="btnChat">Chat</button>
        <button id="btnFavoritos">Favoritos</button>
        <button id="btnPerfil">Perfil</button>
    `;

    contenedor.appendChild(footer);
    footer.querySelector('#btnHome').addEventListener('click', () => {
        handleBtnHomeClick();
    });

    footer.querySelector('#btnChat').addEventListener('click', () => {
        handleBtnChatClick(contenedor);
    });

    footer.querySelector('#btnFavoritos').addEventListener('click', () => {
        handleBtnFavoritosClick(contenedor);
    });

    footer.querySelector('#btnPerfil').addEventListener('click', () => {
        handleBtnPerfilClick(contenedor);
    });
};

export const borrarFooter = () => {
    footer.querySelector('#btnHome').removeEventListener('click', handleBtnHomeClick);
    footer.querySelector('#btnChat').removeEventListener('click', handleBtnChatClick);
    footer.querySelector('#btnFavoritos').removeEventListener('click', handleBtnFavoritosClick);
    footer.querySelector('#btnPerfil').removeEventListener('click', handleBtnPerfilClick);
    if (footer && footer.parentNode) {
        footer.parentNode.removeChild(footer);
    }
};

const handleBtnHomeClick = () => {
    dibuajarLanding()
};

const handleBtnChatClick = (contenedor) => {
    contenedor.innerHTML = ""
    ejecutarChats(contenedor)
};

const handleBtnFavoritosClick = (contenedor) => {
    contenedor.innerHTML = ""
    ejecutarFavoritos(contenedor)
};

const handleBtnPerfilClick = (contenedor) => {
    contenedor.innerHTML = ""
    ejecutrarPerfil(contenedor)
};