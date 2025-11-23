import { http } from "@/api/http";

export const createToken = async ({string: email, string: password}) => {
    const { data } = (await http.post('/auth/login', { email, password })).data;
    return data;
}