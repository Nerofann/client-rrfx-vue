<script setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/layouts/AppFooter.vue';
import AppHeader from '@/layouts/AppHeader.vue';
import AppSidebar from '@/layouts/AppSidebar.vue';
import { useUser } from '@/composables/useUser';

const user = useUser();
console.log(user);
</script>

<template>
    <div class="main-content login-panel login-panel-2">
        <AppHeader />
        <AppSidebar />
        <RouterView />
        <AppFooter />
    </div>
</template>