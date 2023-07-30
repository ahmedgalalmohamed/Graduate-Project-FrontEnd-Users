import { createApp } from "vue";
import Root from "./Root.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueCookies from "vue-cookies";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

import { Promise } from "core-js";


axios.defaults.baseURL = "https://imz1304-001-site1.atempurl.com"; 
// axios.defaults.baseURL = "https://localhost:7184"; 

axios.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      store.commit("logout");
      router.push("/login");
    }
    return response;
  },
  function (error) {
    if (error.code === "ERR_NETWORK") {
      // alert("The Server Is Not Connect");
      // store.commit("logout");
      // router.push("/login");
    }
    if (error.response.status === 401) {
      store.commit("logout");
      router.push("/login");
    }
    if (error.response.status === 400) {
      router.push("/");
    }
    return Promise.reject(error);
  }
);

const app = createApp(Root);
app.config.globalProperties.$http = axios;
app.use(VueCookies);
app.use(store);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.mount("#app");
