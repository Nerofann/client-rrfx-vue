import { getCountries } from "@/api/util/country.api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountryStore = defineStore("countries", () => {
    const isLoaded = ref(false);
    const countries = ref([]);

    const load = async () => {
        try {
            isLoaded.value = true;
            countries.value = await getCountries();
            
        } catch (error) {
            isLoaded.value = false;
        } finally {
            isLoaded.value = false;
        }
    }

    return { 
        countries, 
        load
    };
})