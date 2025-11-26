<script setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/layouts/AppFooter.vue';
import AppHeader from '@/layouts/AppHeader.vue';
import AppSidebar from '@/layouts/AppSidebar.vue';
import { onMounted } from 'vue';

onMounted(() => {
    window.document.body.className = 'body-padding body-p-top light-theme'
});
</script>

<template>
    <AppHeader />
    <AppSidebar />
    
    <div class="main-content">
        <RouterView />
        <AppFooter />
    </div>
</template>