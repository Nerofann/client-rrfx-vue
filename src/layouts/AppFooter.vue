<script setup>
const appName = import.meta.env.VITE_APP_NAME || 'App';
</script>

<template>
    <div class="footer" style="position: fixed;">
        <p>Copyright &copy; {{ new Date().getFullYear() }} All Rights Reserved By <span class="text-primary">{{ appName }}</span></p>
    </div>
</template>