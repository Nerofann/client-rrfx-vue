import { useLocalStorage } from "@vueuse/core";

export const saveToken = async ({string: accessToken, string: refreshToken}) => {
    const token = useLocalStorage('token', { accessToken: null, refreshToken: null });
    token.value.accessToken = accessToken;
    token.value.refreshToken = refreshToken;
    return token;
}