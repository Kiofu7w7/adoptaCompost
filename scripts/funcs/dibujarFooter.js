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
        handleBtnChatClick();
    });

    footer.querySelector('#btnFavoritos').addEventListener('click', () => {
        handleBtnFavoritosClick();
    });

    footer.querySelector('#btnPerfil').addEventListener('click', () => {
        handleBtnPerfilClick();
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
    // Agrega la lógica para el botón Home
    console.log("Home")
};

const handleBtnChatClick = () => {
    // Agrega la lógica para el botón Chat
    console.log("Chat")
};

const handleBtnFavoritosClick = () => {
    // Agrega la lógica para el botón Favoritos
    console.log("Favoritos")
};

const handleBtnPerfilClick = () => {
    // Agrega la lógica para el botón Perfil
    console.log("Perfil")
};