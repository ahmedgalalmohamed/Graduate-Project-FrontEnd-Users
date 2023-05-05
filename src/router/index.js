import { createRouter, createWebHistory } from "vue-router";
import auth from "../../auth/auth";
import axios from "axios";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/profile/:id/:role",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/profileupdate",
    name: "ProfileUpdate",
    component: () => import("../views/ProfileUpdate.vue"),
    children: [
      {
        path: "info",
        name: "UpdateInfo",
        component: () => import("../components/ProfileUpdate/UpdateInfo.vue"),
      },
      {
        path: "password",
        name: "UpdatePassword",
        component: () =>
          import("../components/ProfileUpdate/UpdatePassword.vue"),
      },
    ],
  },
  {
    path: "/course",
    name: "Courses",
    component: () => import("../views/Student/Courses.vue"),
    beforeEnter: (to, from, next) => {
      if (window.$cookies.get("user").role != "proffessor") next();
      else next("/");
    },
  },
  {
    path: "/course/teams/:id",
    name: "teams",
    component: () => import("../views/Student/Teams.vue"),
    beforeEnter: (to, from, next) => {
      if (window.$cookies.get("user").role == "student") next();
      else next("/");
    },
  },
  {
    path: "/myteam/:id",
    name: "MyTeam",
    component: () => import("../views/Student/MyTeam.vue"),
  },
  {
    path: "/myteam/:id/chat",
    name: "Chat",
    component: () => import("../views/Student/Chat.vue"),
  },
  {
    path: "/proffessor/myteams",
    name: "Proffessor_Myteams",
    component: () => import("../views/Professor/Teams.vue"),
    beforeEnter: (to, from, next) => {
      if (window.$cookies.get("user").role == "proffessor") next();
      else next("/");
    },
  },
  {
    path: "/instructor/myteams/:id",
    name: "Instructor_Myteams",
    component: () => import("../views/Instructor/Teams.vue"),
    beforeEnter: (to, from, next) => {
      if (window.$cookies.get("user").role == "instructor") next();
      else next("/");
    },
  },
  {
    path: "/login",
    name: "UserLogin",
    component: () => import("../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (auth()) next("/");
      else next();
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
  if (to.name != "UserLogin" && !auth()) {
    router.push("/login");
    next({ name: "UserLogin" });
  } else if (to.name == "ProfileUpdate") next({ name: "home" });
  else next();
});

export default router;
