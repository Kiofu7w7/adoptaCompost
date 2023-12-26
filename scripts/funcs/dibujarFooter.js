import { dibuajarLanding } from "../../main.js";
import { ejecutarChats } from "./dibujarChats.js";
import { ejecutarFavoritos } from "./dibujarFavoritos.js";
import { ejecutrarPerfil } from "./dibujarHtmlPerfil.js";

let footer;

export const dibujarFooter = (contenedor) => {

    let paginaAcual = localStorage.getItem("paginaActual")

    footer = document.createElement('div');
    footer.classList.add("footerStyle")
    footer.innerHTML = `
        <button class="buttonFooter clicked" id="btnHome"><img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702674499/reto1/icons/en21y23yvx6u2fzqcoat.png"><p class="texto">Home</p></button>
        <button class="buttonFooter" id="btnChat"><img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/d8ox1ghc66blpfcybwyw.png"><p class="texto">Chat</p></button>
        <button class="buttonFooter" id="btnFavoritos"><img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613337/reto1/icons/o81ybsomjxlqudxy9coo.png"><p class="texto">Favoritos</p></button>
        <button class="buttonFooter" id="btnPerfil"><img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613340/reto1/icons/upk7gqynowydza7mnius.png"><p class="texto">Perfil</p></button>
    `;

    contenedor.appendChild(footer);

    const BotonHome = document.getElementById("btnHome")
    const BotonChat = document.getElementById("btnChat")
    const BotonFavoritos = document.getElementById("btnFavoritos")
    const BotonPerfil = document.getElementById("btnPerfil")

    if (paginaAcual == "home") {
        BotonHome.classList.add("clicked")
        BotonChat.classList.remove("clicked")
        BotonFavoritos.classList.remove("clicked")
        BotonPerfil.classList.remove("clicked")
        BotonHome.querySelector("img").src = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/fvgiiawms7tsil7uxell.png"
    }else if (paginaAcual == "chats") {
        BotonChat.classList.add("clicked")
        BotonHome.classList.remove("clicked")
        BotonFavoritos.classList.remove("clicked")
        BotonPerfil.classList.remove("clicked")
        BotonChat.querySelector("img").src = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702616180/reto1/icons/bejm8wfrt8i8ve20wrgu.png"
    }else if (paginaAcual == "favoritos") {
        BotonFavoritos.classList.add("clicked")
        BotonHome.classList.remove("clicked")
        BotonChat.classList.remove("clicked")
        BotonPerfil.classList.remove("clicked")
        BotonFavoritos.querySelector("img").src = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702616163/reto1/icons/clrtzm7xqurpdy1klfjb.png"
    }else{
        BotonPerfil.classList.add("clicked")
        BotonHome.classList.remove("clicked")
        BotonChat.classList.remove("clicked")
        BotonFavoritos.classList.remove("clicked")
        BotonPerfil.querySelector("img").src = "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702616157/reto1/icons/h8tjejrh30m11bb9yrqq.png"
    }

    footer.querySelector('#btnHome').addEventListener('click', () => {
        localStorage.setItem("paginaActual", "home")
        handleBtnHomeClick();
    });

    footer.querySelector('#btnChat').addEventListener('click', () => {
        localStorage.setItem("paginaActual", "chats")
        handleBtnChatClick(contenedor);
    });

    footer.querySelector('#btnFavoritos').addEventListener('click', () => {
        localStorage.setItem("paginaActual", "favoritos")
        handleBtnFavoritosClick(contenedor);
    });

    footer.querySelector('#btnPerfil').addEventListener('click', () => {
        localStorage.setItem("paginaActual", "perfil")
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