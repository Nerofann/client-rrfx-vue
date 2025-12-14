import * as yup from 'yup';
import { genderOptions } from '@/interface/user.interface';

export const fullnameRequirement = () => {
    return yup.string()
        .matches(/^[a-zA-Z\s\-\.\']+$/, "Full Name can only contain letters, spaces, hyphens (-), periods (.), or apostrophes (').")
        .required('Full Name is required.');
}

export const emailRequirement = () => {
    return yup.string()
        .email('Invalid email format.')
        .required('Email is required.');
}

export const passwordRequirement = () => {
    return yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.')
        .matches(/[\W_]/, 'Password must contain at least one special character.')
        .required('Password is required.');
}

export const phoneRequirement = () => {
    return yup.string()
        .matches(/^\+?[0-9]{9,15}$/, 'Phone number must be between 9 to 15 digits and can start with +')
        .required('Phone number is required.');
}

export const genderRequirement = () => {
    return yup.string()
        .oneOf(genderOptions.map(option => option.value));
}