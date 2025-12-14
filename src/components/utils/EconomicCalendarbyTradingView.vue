<script setup>
import { useUserStore } from '@/store/user.store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const container = ref(null);
onMounted(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
        colorTheme: user.value.app_theme || "light",
        isTransparent: false,
        locale: "en",
        countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
        importanceFilter: "-1,0,1",
        width: "100%",
        height: 550
    });

    container.value.appendChild(script);
})

</script>
<template>
    <div class="tradingview-widget-container" ref="container">
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/economic-calendar/" target="_blank" rel="noopener nofollow">
                <span class="blue-text">Economic Calendar</span>
            </a>
            <span class="trademark">by TradingView</span>
        </div>
    </div>
</template>