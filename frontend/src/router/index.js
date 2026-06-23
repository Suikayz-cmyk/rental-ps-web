import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RoomManagementView from "../views/RoomManagementView.vue";
import BookingsView from "../views/BookingsView.vue";
import TransactionsView from "../views/TransactionsView.vue";

const routes = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/dashboard",
    component: DashboardView,
  },
  {
    path: "/rooms",
    component: RoomManagementView,
  },
  {
    path: "/bookings",
    component: BookingsView,
  },
  {
    path: "/transactions",
    component: TransactionsView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});