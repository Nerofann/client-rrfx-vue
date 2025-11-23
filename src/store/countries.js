import { getCountries } from "@/api/util/country.api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountryStore = defineStore("countries", () => {
    const countries = ref([]);

    const load = async () => {
        if(countries.value.length > 0) {
            return;
        }
        
        countries.value = await getCountries();
    }

    return { 
        countries, 
        load
    };
})