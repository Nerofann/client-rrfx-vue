<script setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/views/layouts/AppFooter.vue';
</script>

<template>
    <div class="main-content login-panel login-panel-2">
        <RouterView />
        <AppFooter />
    </div>
</template>