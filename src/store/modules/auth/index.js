import mutations from "@/store/modules/auth/mutations";
import getters from "@/store/modules/auth/getters";
import actions from "@/store/modules/auth/actions";

export default {
    namespaced: true,
    state() {
        return {
            name: 'Jose Emilio'
        };
    },
    mutations,
    getters,
    actions
};