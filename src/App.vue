<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// Set dynamic title
onMounted(() => {
  // Bisa menggunakan environment variable atau default
  document.title = import.meta.env.VITE_APP_NAME || 'App'
})
</script>

<template>
  <RouterView />
</template>