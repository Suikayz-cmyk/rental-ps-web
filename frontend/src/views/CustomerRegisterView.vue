<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import {
  registerCustomer
} from "../services/customerAuthService";

const router = useRouter();

const name = ref("");
const phone = ref("");

const handleRegister =
  async () => {

    try {

      await registerCustomer({

        name: name.value,
        phone: phone.value

      });

      alert(
        "Registrasi berhasil"
      );

      router.push(
        "/customer/login"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registrasi gagal"
      );

    }

  };
</script>

<template>

  <div style="padding:30px">

    <h1>
      Register Customer
    </h1>

    <input
      v-model="name"
      placeholder="Nama"
    />

    <br /><br />

    <input
      v-model="phone"
      placeholder="Nomor HP"
    />

    <br /><br />

    <button
      @click="handleRegister"
    >
      Daftar
    </button>

  </div>

</template>