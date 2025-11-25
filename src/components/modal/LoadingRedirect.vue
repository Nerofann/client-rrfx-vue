<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        default: 'Redirecting...'
    }
});

const dots = ref('');
let interval = null;

watch(() => props.show, (newVal) => {
    if (newVal) {
        interval = setInterval(() => {
            dots.value = dots.value.length >= 3 ? '' : dots.value + '.';
        }, 400);
    } else {
        if (interval) {
            clearInterval(interval);
            dots.value = '';
        }
    }
});
</script>

<template>
    <Transition name="fade">
        <div v-if="show" class="loading-redirect-overlay">
            <div class="loading-redirect-content">
                <div class="spinner-container">
                    <div class="spinner"></div>
                </div>
                <h3 class="loading-message">{{ message }}<span class="dots">{{ dots }}</span></h3>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.loading-redirect-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
}

.loading-redirect-content {
    text-align: center;
    padding: 2rem;
}

.spinner-container {
    margin-bottom: 1.5rem;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top-color: var(--primary-color, #007bff);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-message {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    min-height: 2rem;
}

.dots {
    display: inline-block;
    width: 1.5rem;
    text-align: left;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
