import {ADD_COMMENT, GET_COMMENTS} from "@/store/storeConstants";
import Axios from "axios";

export default {
    async [GET_COMMENTS](context, payload) {
        const { page, limit, idMovie } = payload
        let result = await Axios.get(`${process.env.VUE_APP_SERVICE_API_URL}/comments/findAllComments/${idMovie}?page=${page}&limit=${limit}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia el token en el encabezado 'Authorization'
                'Content-Type': 'application/json', // Especifica el tipo de contenido (application/json en este caso)
            },
        });
        return result
    },
    async [ADD_COMMENT](context, payload) {
        let result = await Axios.post(`${process.env.VUE_APP_SERVICE_API_URL}/comments/createComment`, payload,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envia el token en el encabezado 'Authorization'
                'Content-Type': 'application/json', // Especifica el tipo de contenido (application/json en este caso)
            },
        })
        return result
    },
};