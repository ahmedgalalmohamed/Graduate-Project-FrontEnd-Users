import { createStore } from "vuex";
import auth from "../../auth/auth";
export default createStore({
  state: {
    userlogin: auth(),
    user: "",
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    login(state) {
      state.userlogin = true;
    },
    logout(state) {
      state.userlogin = false;
      window.$cookies.remove("token");
      window.$cookies.remove("user");
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
  },
  modules: {},
});
