import mutations from "@/store/modules/login/mutations";
import getters from "@/store/modules/login/getters";
import actions from "@/store/modules/login/actions";

export default {
    namespaced: true,
    state() {
        return {
            token: ''
        };
    },
    mutations,
    getters,
    actions
};