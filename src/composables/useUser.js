/**
 * @typedef {object} User
 * @property {string} fullname
 * @property {string} email
 * @property {string} phone
 * @property {string} createdAt
 * @property {string} updatedAt
 * 
 */

import { ref } from "vue";

export const useUser = ({string: email, string: password}) => {
    /** @type {User|null} */
    const user = ref(null);
    const isLoggedIn = ref(false);

    const setUser = (newUser) => {
        user.value = newUser;
        isLoggedIn.value = !!newUser;
    }

    return {
        user,
        isLoggedIn,
        setUser
    }

} 