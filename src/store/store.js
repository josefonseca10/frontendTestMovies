import {createStore} from "vuex";
import auth from "@/store/modules/auth";
import login from "@/store/modules/login";
import movies from "@/store/modules/movies";
import comments from "@/store/modules/comments";
const store = createStore({
    modules: {
        auth,
        login,
        movies,
        comments
    }
})

export default store;