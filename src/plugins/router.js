// 3. Create the router instance and pass the `routes` option
import routes from "../router/routes";
import { createWebHashHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
