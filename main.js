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
    crearContenedor(bodyDibujableLanding,"contenedorTarjetas")
    const contenedorTarjetas = document.getElementById("contenedorTarjetas")
    const data = await obtenerDataMascotas()
    
    const perrosGatos = (animal) => {
        const tipoAnimal = animal ? "perros" : "gatos";
        eliminarEventListeners(data[tipoAnimal])
        borrarContenido(contenedorTarjetas);
        crearTarjetaMascota(data[tipoAnimal], contenedorTarjetas);
    };
    
    botonPerros.addEventListener('click', async () => {
        sessionStorage.setItem("perroGato","perro")
        perrosGatos(true)
    })
    
    botonGatos.addEventListener('click', async () => {
        sessionStorage.setItem("perroGato","gato")
        perrosGatos(false)
    })
    
    dibujarFooter(bodyOriginal)
}

dibuajarLanding()

