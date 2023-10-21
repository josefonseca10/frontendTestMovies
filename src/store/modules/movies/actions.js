import {GET_MOVIES, ADD_MOVIE, REMOVE_MOVIE, SAVE_MOVIE} from "@/store/storeConstants";
import Axios from "axios";

export default {
    async [GET_MOVIES](context, payload) {
        const { page, limit } = payload
        let result = await Axios.get(`${process.env.VUE_APP_SERVICE_API_URL}/movies/findAllMovies?page=${page}&limit=${limit}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia el token en el encabezado 'Authorization'
                    'Content-Type': 'application/json', // Especifica el tipo de contenido (application/json en este caso)
                },
            });
        return result
    },
    async [ADD_MOVIE](context, payload) {
        let postData = {
            name: payload.name,
            description: payload.description,
            image: payload.image,
        }
        let result = await Axios.post(`${process.env.VUE_APP_SERVICE_API_URL}/movies/createMovie`, postData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia el token en el encabezado 'Authorization'
                'Content-Type': 'application/json', // Especifica el tipo de contenido (application/json en este caso)
            },
        })
        return result
    },
    async [SAVE_MOVIE](context, payload) {
        console.log('pppp', payload)
        delete payload.model.id
        let result = await Axios.put(`${process.env.VUE_APP_SERVICE_API_URL}/movies/updateMovie/${payload.id}`, payload.model, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia el token en el encabezado 'Authorization'
                'Content-Type': 'application/json', // Especifica el tipo de contenido (application/json en este caso)
            },
        })
        console.log('rrrr', result )
        return result
    },
    async [REMOVE_MOVIE](context, payload) {
        console.log('pppp', payload)
        let result = await Axios.delete(`${process.env.VUE_APP_SERVICE_API_URL}/movies/deleteMovie/${payload.id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia el token en el encabezado 'Authorization'
                'Content-Type': 'application/json', // Especifica el tipo de contenido (application/json en este caso)
            },
        })
        console.log('rrrr', result )
        return result
    }
};