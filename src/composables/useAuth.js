import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage('token', { 
    accessToken: null, 
    refreshToken: null 
});

export const saveToken = (accessToken, refreshToken) => {
    token.value = {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
    return token.value;
}

export const getToken = () => {
    return token.value;
}

export const clearToken = () => {
    token.value = {
        accessToken: null,
        refreshToken: null
    };
}

export const isAuthenticated = () => {
    return !!token.value.accessToken;
}