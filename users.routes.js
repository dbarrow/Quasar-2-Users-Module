const routes = [
  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("src/modules/Quasar-2-Users-Module/pages/IndexView.vue"),
      },
    ],
  },

  {
    path: "/register",
    component: () => import("layouts/Landing.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("src/modules/Quasar-2-Users-Module/pages/Register.vue"),
      },
    ],
  },
];

export default routes;
