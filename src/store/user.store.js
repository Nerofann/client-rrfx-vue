import { userProfile } from '@/api/user/user.api.js';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { userInterface } from "@/interface/user.interface";

export const useUserStore = defineStore("user", () => {
    const user = ref(userInterface());
    const loading = ref(false);
    const isLoaded = ref(false);
    const isAuthed = computed(() => !!user.value);

    async function loadProfile(force = false) {
        if(loading.value) return;
        if(isLoaded.value && !force) return;
        loading.value = true;
        
        try {
            const data = await userProfile();
            user.value = {
                ...userInterface(),
                ...data
            }
            
            isLoaded.value = true;

        } finally {
            loading.value = false;
            // isLoaded.value = false;
        }
    }

    function clear() {
        user.value = null;
        isLoaded.value = false;
    }
    
    return {
        user,
        loading,
        isLoaded,
        isAuthed,
        loadProfile,
        clear
    }
});
