<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/authService";
import "../css/login.css";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  error.value = "";
  try {
    const result = await login(username.value, password.value);
    const data = result.data || result;

    if (data.success || data.token) {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username.value);
      router.push("/dashboard");
    } else {
      error.value = data.message || "Username atau Password salah.";
    }
  } catch (err) {
    error.value = "Gagal terhubung ke server. Pastikan backend menyala.";
  }
};
</script>

<template>
  <div class="login-container">
    
    <!-- ELEMEN BACKGROUND GAMBAR + BLUR -->
    <div class="login-bg-blur">
      <!-- Ganti URL di src ini kalau kamu punya gambar pilihan lain -->
      <img src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200" alt="PS Background" />
      <div class="bg-overlay"></div>
    </div>

    <!-- KOTAK FORM LOGIN DI TENGAH -->
    <div class="login-card">
      <div class="login-brand">
        <div class="brand-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.12 4.25A4.75 4.75 0 0 0 13.41 8h-2.82a4.75 4.75 0 0 0-4.71-3.75C3.27 4.25 1 6.55 1 9.42v3c0 2.22 1.39 4.11 3.33 4.81l.46 2.76A1.75 1.75 0 0 0 6.51 21.5h1.34a1.75 1.75 0 0 0 1.71-1.38l.38-2.12h4.12l.38 2.12a1.75 1.75 0 0 0 1.71 1.38h1.34a1.75 1.75 0 0 0 1.72-1.51l.46-2.76a5.006 5.006 0 0 0 3.33-4.81v-3c0-2.87-2.27-5.17-4.88-5.17zM7.5 12h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0v1h1a.5.5 0 0 1 0 1zm11-1a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-2 2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
          </svg>
        </div>
        <h1>PSRental</h1>
        <span>Admin Portal System</span>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="username">Username</label>
          <input id="username" type="text" v-model="username" placeholder="admin2" required autocomplete="off" />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" placeholder="••••••••" required />
        </div>

        <div v-if="error" class="error-alert">
          <span class="error-icon">⚠️</span>
          <p class="error-text">{{ error }}</p>
        </div>

        <button type="submit" class="login-button">Masuk Aplikasi</button>
      </form>
    </div>

  </div>
</template>