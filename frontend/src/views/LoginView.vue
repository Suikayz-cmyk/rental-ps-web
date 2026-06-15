<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/authService";

const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  // 1. Cek apakah fungsi ini terpanggil saat tombol diklik
  console.log("=== Proses Login Dimulai ===");
  console.log("Username input:", username.value);
  console.log("Password input:", password.value);

  try {
    // 2. Kirim data ke backend
    const result = await login(username.value, password.value);
    console.log("Respon dari server:", result);

    if (result.success) {
  localStorage.setItem("isLogin", "true");
  localStorage.setItem("token", result.token);
  localStorage.setItem("username", username.value);

  localStorage.setItem(
    "token",
    result.token
  );
  router.push("/dashboard");
}

  } catch (err) {
    // 5. Tangkap error jika backend mati atau network error
    error.value = "Username atau Password Salah / Server tidak merespon";
    console.error("Terjadi error pada Axios/Network:", err);
  }
};
</script>

<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Login Rental PS</h1>

    <form @submit.prevent="handleLogin">
      <input
        v-model="username"
        placeholder="Username"
        required
      />

      <br><br>

      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <br><br>

      <button type="submit">
        Masuk
      </button>
    </form>

    <br><br>

    <p style="color: red; font-weight: bold;">{{ error }}</p>
  </div>
</template>