import Swal from 'sweetalert2';
import { ref } from 'vue';

export const useSweetAlert = () => {
    const showAlert = ref(false);

    const errorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
    }

    const successAlert = (message, callback) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
        }).then(() => {
            if (callback) {
                callback();
            }
        });
    }

    return {
        errorAlert,
        successAlert
    };
}