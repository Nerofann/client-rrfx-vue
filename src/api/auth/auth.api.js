import { http } from "@/api/http";

export const createToken = async ({email, password}) => {
    const response = await http.post('/auth/login', { 
        email, 
        password 
    });
    
    return response;
}

export const register = async ({fullname, email, password, phone_code, phone}) => {
    const response = await http.put('/auth/register', {
        fullname, 
        email, 
        password, 
        phone,
        phone_code
    });

    return response;
}