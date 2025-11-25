import Swal from 'sweetalert2';
import { ref } from 'vue';

export const useSweetAlert = () => {
    const showAlert = ref(false);

    const errorAlert = (message) => {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
    }

    const successAlert = (message) => {
        return Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
        })
    }

    return {
        errorAlert,
        successAlert
    };
}