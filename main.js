import { obtenerDataMascotas } from "./scripts/axios/mascotasAxios.js";
import { borrarFooter, dibujarFooter } from "./scripts/funcs/dibujarFooter.js";
import { PlantillaLanding, borrarContenido, crearContenedor, crearTarjetaMascota, eliminarEventListeners } from "./scripts/funcs/dibujarHtmlLanding.js";

const bodyOriginal = document.getElementById("bodyOriginal")

export const dibuajarLanding = async () => {
    bodyOriginal.innerHTML = ""
    PlantillaLanding(bodyOriginal)
    const bodyDibujableLanding = document.getElementById("sectionLanding")
    const botonPerros = document.getElementById("btnPerros")
    const botonGatos = document.getElementById("btnGatos")
    crearContenedor(bodyDibujableLanding, "contenedorTarjetas")
    const contenedorTarjetas = document.getElementById("contenedorTarjetas")
    const data = await obtenerDataMascotas()

    const perrosGatos = (animal) => {
        const tipoAnimal = animal ? "perros" : "gatos";
        eliminarEventListeners(data[tipoAnimal])
        borrarContenido(contenedorTarjetas);
        crearTarjetaMascota(data[tipoAnimal], contenedorTarjetas);
    };

    botonPerros.addEventListener('click', async () => {
        sessionStorage.setItem("perroGato", "perro")
        perrosGatos(true)
    })

    botonGatos.addEventListener('click', async () => {
        sessionStorage.setItem("perroGato", "gato")
        perrosGatos(false)
    })

    dibujarFooter(bodyOriginal)
}

//dibuajarLanding()

const img = document.getElementById("inicioLogo");
let contador = 0
const boton1 = document.getElementById("btn-siguente")
const container2 = document.getElementById("container-pagina2")
const container3 = document.getElementById("container-pagina3")
let timeoutId;

bodyOriginal.addEventListener("click", () => {
    if (contador == 0) {

        img.classList.add("zoom");
        timeoutId = setTimeout(() => {
            bodyOriginal.style.cursor = "auto";
            img.style.opacity = "0";
            setTimeout(() => {
                img.style.display = "none";
                container2.style.display = "block";
                setTimeout(() => {
                    container2.style.opacity = "1";
                }, 50);
            }, 50);
        }, 1000);

        contador++
    }
});

boton1.addEventListener('click', function () {
    container2.style.opacity = "0";
    setTimeout(function () {
        container2.style.display = "none";
        container3.style.display = "block";
        setTimeout(function () {
            container3.style.opacity = "1";
        }, 50);
    }, 50);
    contador++;
    document.getElementById('container-pagina2').classList.add('fade-in');
})

container3.addEventListener('click', function () {
    bodyOriginal.innerHTML = ""
    dibuajarLanding()
})