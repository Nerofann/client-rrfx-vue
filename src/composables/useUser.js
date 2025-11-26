import { userInterface } from "@/interface/user.interface";
import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

export const useUser = () => {
    const store = userStore();
    const { User, isLoaded } = storeToRefs(store); 
    const { fetchUser } = store;
    const loading = ref(false);
    const error = ref(null);
    
    /** Load User */
    const loadUser = async () => {
        if(isLoaded.value) {
            return;
        }

        try {
            loading.value = true;
            await fetchUser();

        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    /** Refresh User Data */
    const refresh = () => loadUser();

    /** Initial */
    onMounted(loadUser)

    return {
        User,
        loading,
        error,
        loadUser,
        refresh
    }
} 