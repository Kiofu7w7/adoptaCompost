import { urlMascotasGatos, urlMascotasPerros } from "../urls.js";

export const obtenerDataMascotas = async () =>{
    try {
        const responsePerros = await axios.get(urlMascotasPerros);
        const responseGatos = await axios.get(urlMascotasGatos)
        const mascotasCombinadas = {
            perros: responsePerros.data,
            gatos: responseGatos.data
        };
        return mascotasCombinadas
    } catch (error) {
        console.error("Error al obtener la informacion de las mascotas: " + error)
    }
}

export const buscarMascota = async (tipo,id) => {
    try {
        let response;
        if (tipo == "perro") {
            response = await axios.get(`${urlMascotasPerros}/${id}`);
        }else{
            response = await axios.get(`${urlMascotasGatos}/${id}`);
        }
        return response.data
    } catch (error) {
        console.error("Error al obtener la informacion de la mascota: " + error)
    }
}