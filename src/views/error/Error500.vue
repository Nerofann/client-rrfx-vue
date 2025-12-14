<script setup>
import Icon500 from '@/components/icons/Icon500.vue';
</script>

<template>
    <div class="panel error-panel">
        <div class="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
            <div class="part-img mb-3">
                <Icon500 />
            </div>
            <div class="part-txt text-center">
                <h2 class="error-subtitle">Internal Server Error</h2>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .panel.error-panel {
        height: 100vh;
    }
</style>