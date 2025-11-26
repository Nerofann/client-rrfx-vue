import { userProfile } from '@/api/user/user.api.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore("user", () => {
    const User = ref(null);
    const loading = ref(false);

    const fetchUser = async () => {
        // Skip jika sedang loading atau sudah ada data
        if (loading.value || User.value) return User.value;
        
        loading.value = true;
        const data = await userProfile();
        if(data) {
            User.value = data;
        }
        
        loading.value = false;
        return User.value;
    }
    
    return {
        User,
        loading,
        fetchUser
    }
});
