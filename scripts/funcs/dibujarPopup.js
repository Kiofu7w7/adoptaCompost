export function mostrarPopup(contenido) {
    const nuevoPopup = document.createElement('div');
    nuevoPopup.className = 'popup';

    nuevoPopup.innerHTML = `
        <div class="contenido">${contenido}</div>
        <div class="cerrar">X</div>
    `;

    document.body.appendChild(nuevoPopup);

    nuevoPopup.querySelector('.cerrar').addEventListener('click', function() {
        cerrarPopup(nuevoPopup);
    });

    setTimeout(() => {
        nuevoPopup.style.right = '0';
    }, 0);

    nuevoPopup.style.display = 'block';
}

function cerrarPopup(popup) {
    popup.style.right = '-100%';
    setTimeout(() => {
        popup.style.display = 'none';
        document.body.removeChild(popup);
    }, 250); 
}