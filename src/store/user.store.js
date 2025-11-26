import { userProfile } from '@/api/user/user.api.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userInterface } from "@/interface/user.interface";

export const userStore = defineStore("user", () => {
    const User = ref(userInterface());
    const isLoaded = ref(false);

    const fetchUser = async () => {
        // Skip jika sedang loading atau sudah ada data
        const data = await userProfile();
        if(data) {
            User.value = {
                ...userInterface(),
                ...data
            };

            isLoaded.value = true;
        }
        
        return User.value;
    }
    
    return {
        User,
        isLoaded,
        fetchUser
    }
});
