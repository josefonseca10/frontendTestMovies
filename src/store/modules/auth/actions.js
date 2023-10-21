import {SIGNUP_ACTION} from "@/store/storeConstants";
import Axios from "axios";

export default {
    async [SIGNUP_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
        }
        console.log('jjsjsj', postData)
        let result = await Axios.post(`${process.env.VUE_APP_SERVICE_API_URL}/user/register`, postData)
        console.log('rrrr', result )
        return result
    }
};