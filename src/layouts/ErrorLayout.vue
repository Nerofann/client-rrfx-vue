<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
    // Reset body classes dari layout lain
    document.body.style.padding = '0';
    document.body.style.margin = '0';
})
</script>

<template>
    <div class="error-layout">
        <RouterView />
    </div>
</template>

<style scoped>
.error-layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
