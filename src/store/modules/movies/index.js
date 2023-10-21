import mutations from "@/store/modules/movies/mutations";
import getters from "@/store/modules/movies/getters";
import actions from "@/store/modules/movies/actions";

export default {
    namespaced: true,
    state() {
        return {
            test: ''
        };
    },
    mutations,
    getters,
    actions
};