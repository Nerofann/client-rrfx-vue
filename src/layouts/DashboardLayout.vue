<script setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/layouts/AppFooter.vue';
import AppHeader from '@/layouts/AppHeader.vue';
import AppSidebar from '@/layouts/AppSidebar.vue';
import { computed, onMounted, watch } from 'vue';
import { useUserStore } from '@/store/user.store';

const store = useUserStore()
const profileReady = computed(() => store.isLoaded && !store.loading);
onMounted(() => {
    window.document.body.className = 'body-padding body-p-top light-theme'
});
</script>

<template>
    <div v-if="!profileReady">
        <p>Loading...</p>
    </div>

    <div v-else>
        <AppHeader />
        <AppSidebar />
        
        <div class="main-content">
            <RouterView />
            <AppFooter />
        </div>
    </div>
</template>