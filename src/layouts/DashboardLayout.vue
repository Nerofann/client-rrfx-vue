<script setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/layouts/AppFooter.vue';
import AppHeader from '@/layouts/AppHeader.vue';
import AppSidebar from '@/layouts/AppSidebar.vue';
import { userStore } from '@/store/user';
import { onMounted } from 'vue';

const store = userStore();

onMounted(async () => {
    await store.fetchUser();
    console.log('User loaded:', store.User)
})
</script>

<template>
    <div class="main-content login-panel login-panel-2">
        <AppHeader :user="store.User" />
        <AppSidebar />
        <RouterView />
        <AppFooter />
    </div>
</template>