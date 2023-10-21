import mutations from "@/store/modules/comments/mutations";
import getters from "@/store/modules/comments/getters";
import actions from "@/store/modules/comments/actions";

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