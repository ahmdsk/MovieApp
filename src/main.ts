import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import router from "./router";

const app = createApp(App);

app.use(VueAwesomePaginate);
app.use(VueSweetalert2);
app.use(router);
app.mount("#app");
