import { http } from '@/api/http'

export const userProfile = async () => {
    try {
        const response = await http.get('/user/profile');
        if(response.code !== 200) {
            return null;
        }

        return response.data;

    } catch (error) {
        return null;
    }
}