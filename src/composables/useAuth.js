import { useLocalStorage } from "@vueuse/core";

export const saveToken = (accessToken, refreshToken) => {
    useLocalStorage('access_token', null).value = accessToken;
    useLocalStorage('refresh_token', null).value = refreshToken;
}

export const getToken = () => {
    return useLocalStorage('access_token', null).value;
}

export const clearToken = () => {
    useLocalStorage('access_token', null).value = null;
    useLocalStorage('refresh_token', null).value = null;
}

export const isAuthenticated = () => {
    return !!useLocalStorage('access_token', null).value;
}