import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RoomManagementView from "../views/RoomManagementView.vue";
import BookingsView from "../views/BookingsView.vue";
import TransactionsView from "../views/TransactionsView.vue";

import PublicBookingView from "../views/PublicBookingView.vue";
import CustomerLoginView from "../views/CustomerLoginView.vue";
import MyBookingsView from "../views/MyBookingsView.vue";
import CustomerRegisterView from "../views/CustomerRegisterView.vue";

const routes = [
  {
    path: "/",
    component: PublicBookingView
  },
  {
    path: "/admin/login",
    component: LoginView
  },
  {
  path: "/dashboard",
  component: DashboardView,
  meta: {
    requiresAuth: true
  }
},
{
  path: "/rooms",
  component: RoomManagementView,
  meta: {
    requiresAuth: true
  }
},
{
  path: "/bookings",
  component: BookingsView,
  meta: {
    requiresAuth: true
  }
},
{
  path: "/transactions",
  component: TransactionsView,
  meta: {
    requiresAuth: true
  }
},
{
  path: "/customer/login",
  component: CustomerLoginView
},
{
  path: "/customer/register",
  component: CustomerRegisterView
},
{
  path: "/my-bookings",
  component: MyBookingsView
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("token");

  if (
    to.meta.requiresAuth &&
    !token
  ) {
    next("/admin/login");
    return;
  }

  next();

});

export default router;