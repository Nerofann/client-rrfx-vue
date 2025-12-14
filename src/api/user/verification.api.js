import { http } from "@/api/http";

export const verification_step_1 = async ({fullname, gender, phone_code, phone, address}) => {
    const response = await http.post('/verification/step-1', {
        fullname,
        gender,
        phone_code,
        phone,
        address
    });

    return response;
}