import { http } from "@/api/http";
import countriesData from "@/data/countries.json";

export const getCountries = async () => {
    // const { data } = await http.get("/public/countries");
    // return data.countries;
    return countriesData;
}