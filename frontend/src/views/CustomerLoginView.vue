<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  customerLogin
} from "../services/customerAuthService";
import "../css/customer.css";

const router = useRouter();
const route = useRoute();

const phone = ref("");

const login = async () => {
  if (!phone.value.trim()) {
    alert("Nomor HP wajib diisi");
    return;
  }

  try {
    const result = await customerLogin(phone.value);

    localStorage.setItem(
      "customer",
      JSON.stringify(result.data)
    );

    router.push(route.query.redirect || "/");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Customer tidak ditemukan"
    );
  }
};
</script>

<template>
  <div class="customer-shell auth-page">
    <div class="auth-card">
      <h1>Login Customer</h1>
      <p class="auth-subtitle">Masuk dengan nomor HP untuk mulai booking room.</p>

      <form @submit.prevent="login">
        <div class="auth-field">
          <label>Nomor HP</label>
          <input
            v-model="phone"
            placeholder="Contoh: 081234567890"
          />
        </div>

        <button class="btn-primary" type="submit">
          Login
        </button>
      </form>

      <div class="auth-footer">
        Belum punya akun?
        <button
          class="btn-secondary"
          @click="
            router.push({
              path: '/customer/register',
              query: {
                redirect: route.query.redirect || '/'
              }
            })
          "
        >
          Daftar Customer
        </button>
      </div>
    </div>
  </div>
</template>
