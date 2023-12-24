import { urlUsuarios } from "../urls.js";

export const obtenerDataUsuarios = async () => {
    try {
        const responseUsuarios = await axios.get(urlUsuarios);
        return responseUsuarios.data
    } catch (error) {
        console.error("Error al obtener la informacion de las mascotas: " + error)
    }
}

export const buscarUsuario = async (id) => {
    try {
        const responseUsuarios = await axios.get(urlUsuarios + "/" + id);
        return responseUsuarios.data
    } catch (error) {
        console.error("Error al obtener la informacion del usuario: " + error)
    }
}

export const ponerFavorito = async (data, idMascota, tipo) => {
    const datosModificados = agregarIdMascota(data, idMascota, tipo)
    await axios.put(urlUsuarios + "/" + data.id, datosModificados)
}

function agregarIdMascota(datos, idMascota, tipo) {
    if (tipo == "perro") {
        const idsMascotas = datos["id_mascotas_favoritas_perro"].split("|");
        idsMascotas.push(idMascota);
        datos["id_mascotas_favoritas_perro"] = idsMascotas.join("|");
        return datos;
    } else {
        const idsMascotas = datos["id_mascotas_favoritas_gato"].split("|");
        idsMascotas.push(idMascota);
        datos["id_mascotas_favoritas_gato"] = idsMascotas.join("|");
        return datos;
    }
}

export const quitarFavorito = async (data, idMascota, tipo) => {
    const datosModificados = quitarIdMascota(data, idMascota, tipo)
    await axios.put(urlUsuarios+"/"+data.id, datosModificados)
}

function quitarIdMascota(datos, idMascota, tipo) {
    if (tipo === "perro") {
        const idsMascotas = datos["id_mascotas_favoritas_perro"].split("|");
        const index = idsMascotas.indexOf(idMascota.toString());
        if (index !== -1) {
            idsMascotas.splice(index, 1);
            datos["id_mascotas_favoritas_perro"] = idsMascotas.join("|");
        }
    } else if (tipo === "gato") {
        const idsMascotas = datos["id_mascotas_favoritas_gato"].split("|");

        const index = idsMascotas.indexOf(idMascota.toString());

        if (index !== -1) {
            idsMascotas.splice(index, 1);
            datos["id_mascotas_favoritas_gato"] = idsMascotas.join("|");
        }
    }

    return datos;
}

export const cambiarUsuario = async (id, data) => {
    try {
        await axios.put(urlUsuarios+"/"+id, data)
    } catch (error) {
        console.log(error)
    }
}