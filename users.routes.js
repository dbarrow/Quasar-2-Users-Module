const routes = [  
    {
        path: "/users",
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: "", component: () => import("src/modules/users/pages/IndexView.vue") }],
      },   
      
      {
        path: "/register",
        component: () => import("layouts/Landing.vue"),
        children: [{ path: "", component: () => import("src/modules/auth/pages/Register.vue") }],
      },    
  ]
  
  export default routes
  
  