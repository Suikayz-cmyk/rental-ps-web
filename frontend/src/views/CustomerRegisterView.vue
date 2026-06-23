<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  registerCustomer
} from "../services/customerAuthService";
import "../css/customer.css";

const router = useRouter();
const route = useRoute();

const name = ref("");
const phone = ref("");

const handleRegister = async () => {
  if (!name.value.trim() || !phone.value.trim()) {
    alert("Nama dan nomor HP wajib diisi");
    return;
  }

  try {
    await registerCustomer({
      name: name.value,
      phone: phone.value
    });

    alert("Registrasi berhasil, silakan login");

    router.push({
      path: "/customer/login",
      query: {
        redirect: route.query.redirect || "/"
      }
    });
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Registrasi gagal"
    );
  }
};
</script>

<template>
  <div class="customer-shell auth-page">
    <div class="auth-card">
      <h1>Register Customer</h1>
      <p class="auth-subtitle">Buat akun supaya booking dan riwayat bisa tersimpan.</p>

      <form @submit.prevent="handleRegister">
        <div class="auth-field">
          <label>Nama</label>
          <input
            v-model="name"
            placeholder="Nama customer"
          />
        </div>

        <div class="auth-field">
          <label>Nomor HP</label>
          <input
            v-model="phone"
            placeholder="Contoh: 081234567890"
          />
        </div>

        <button class="btn-primary" type="submit">
          Daftar
        </button>
      </form>

      <div class="auth-footer">
        Sudah punya akun?
        <button
          class="btn-secondary"
          @click="
            router.push({
              path: '/customer/login',
              query: {
                redirect: route.query.redirect || '/'
              }
            })
          "
        >
          Login Customer
        </button>
      </div>
    </div>
  </div>
</template>
