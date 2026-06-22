<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import {
  customerLogin
} from "../services/customerAuthService";

const router = useRouter();

const phone = ref("");

const login = async () => {

  try {

    const result =
      await customerLogin(
        phone.value
      );

    localStorage.setItem(
      "customer",
      JSON.stringify(
        result.data
      )
    );

    alert("Login berhasil");

    router.push(
      "/my-bookings"
    );

  } catch (error) {

    alert(
      "Customer tidak ditemukan"
    );

  }

};
</script>

<template>
  <div
    style="
      max-width:400px;
      margin:100px auto;
    "
  >
    <h1>
      Login Customer
    </h1>

    <input
      v-model="phone"
      placeholder="Nomor HP"
    />

    <br /><br />

    <button
      @click="login"
    >
      Login
    </button>

    <p>
      Belum punya akun?
    </p>

    <button
      @click="
        router.push(
          '/customer/register'
        )
      "
    >
      Register
    </button>
  </div>
</template>