export const showPassword = (inputId) => {
    const inputElement = document.getElementById(inputId);
    const iconElement = document.querySelector(`[data-password-toggle="${inputId}"]`);
    
    if (!inputElement) {
        console.warn(`Input element with id "${inputId}" not found`);
        return;
    }
    
    if (inputElement.type === 'password') {
        inputElement.type = 'text';
        if (iconElement) {
            iconElement.classList.remove('fa-eye');
            iconElement.classList.add('fa-eye-slash');
        }
    } else {
        inputElement.type = 'password';
        if (iconElement) {
            iconElement.classList.remove('fa-eye-slash');
            iconElement.classList.add('fa-eye');
        }
    }
}