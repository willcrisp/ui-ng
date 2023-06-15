const routes = [
  {
    path: "/",
    component: () => import("@/App.vue"),
    children: [
      {
        path: "/status",
        component: () => import("@Pages/statusPage.vue"),
      },
      {
        path: "/zAxisCtrl",
        component: () => import("@Pages/zAxisCtrlPage.vue"),
      },
      {
        path: "/analytics",
        component: () => import("@Pages/analyticsPage.vue"),
      },
      {
        path: "/resinProfiles",
        component: () => import("@Pages/resinProfilesPage.vue"),
      },
      {
        path: "/settings",
        component: () => import("@Pages/settingsPage.vue"),
      },
      {
        path: "/prints",
        component: () => import("@Pages/printsPage.vue"),
      },
      {
        path: "/slicer",
        component: () => import("@Pages/slicerPage.vue"),
      },
    ],
  },
];

export default routes;
