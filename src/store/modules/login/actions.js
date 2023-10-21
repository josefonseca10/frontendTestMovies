import {LOGIN_ACTION} from "@/store/storeConstants";
import Axios from "axios";

export default {
    async [LOGIN_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
        }
        let result = await Axios.post(`${process.env.VUE_APP_SERVICE_API_URL}/user/login`, postData)
        return result
    }
};