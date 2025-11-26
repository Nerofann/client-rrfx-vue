<script setup>
import Icon404 from '@/components/icons/Icon404.vue';
</script>

<template>
    <div class="panel error-panel">
        <div class="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
            <div class="part-img">
                <Icon404 />
            </div>
            <div class="part-txt text-center">
                <h2 class="error-subtitle">Page Not Found</h2>
                <RouterLink to="/dashboard" class="btn btn-primary py-2 px-5 rounded-pill">Go to Home Page</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .panel.error-panel {
        height: 100vh;
    }
</style>