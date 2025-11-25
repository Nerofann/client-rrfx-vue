<script setup>
import { RouterLink } from 'vue-router'
import TermsCondition from '@/components/modal/TermsCondition.vue'
import { useCountryStore } from '@/store/countries';
import { onMounted, ref } from 'vue';
import { useField, useForm, useSetFieldError } from 'vee-validate';
import * as yup from 'yup';
import { register } from '@/api/auth/auth.api';
import { useSweetAlert } from '@/composables/useSweetAlert';
import router from '@/router';
import { showPassword } from '@/composables/useHelper';

const country = useCountryStore();
const { handleSubmit, setFieldError } = useForm({
    validationSchema: {
        fullname: yup.string().matches(/^[a-zA-Z\s\-\.\']+$/, "Full Name can only contain letters, spaces, hyphens (-), periods (.), or apostrophes (').").required('Full Name is required.'),
        email: yup.string().email('Invalid email format.').required('Email is required.'),
        password: yup.string().min(8, 'Password must be at least 7 characters long.')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
            .matches(/[0-9]/, 'Password must contain at least one number.')
            .matches(/[\W_]/, 'Password must contain at least one special character.')
            .required('Password is required.'),
        phone_code: yup.string().required('Phone code is required.'),
        phone: yup.string().matches(/^[0-9]+$/, 'Phone Number can only contain numbers.').required('Phone Number is required.'),
    },
    initialValues: {
        phone_code: '+62',
    }
})

const { errorAlert, successAlert } = useSweetAlert();
const { value: fullname, errorMessage: errorFullname } = useField('fullname');
const { value: email, errorMessage: errorEmail } = useField('email');
const { value: password, errorMessage: errorPassword } = useField('password');
const { value: phone_code, errorMessage: errorPhoneCode } = useField('phone_code');
const { value: phone, errorMessage: errorPhone } = useField('phone');
const isLoading = ref(false);

const submitSignup = handleSubmit(async values => {
    try {   
        isLoading.value = true;
        const response = await register(values);
        if(response.code !== 200) {
            errorAlert(response.message || "Failed");
            return;
        }
        
        successAlert(response.message).then(() => {
            router.push('/');
        })

    } catch (error) {
        const serverErrors = error.response?.data?.errors || {};
        errorAlert(error.response?.data?.message || 'Registration failed. Please try again.');
        Object.keys(error.response?.data?.errors).forEach(key => {
            setFieldError(key, serverErrors[key][0]);
        })
    
    } finally {
        isLoading.value = false;
    }
})

onMounted(() => {
    country.load();
})
</script>

<template>
    <div class="login-body">
        <div class="top d-flex justify-content-between align-items-center">
            <div>
                <a href="https://rrfx.co.id" class="btn-back position-absolute text-white" style="margin-top: -5px;" aria-label="Kembali">
                    <i class="fa-solid fa-arrow-left" style="font-size: 20px;"></i>
                </a>
            </div>
            <h3 class="panel-title mb-0" style="font-size: 25px;">Registration</h3>
            <RouterLink to="/"><i class="fa-duotone fa-house-chimney"></i></RouterLink>
        </div>
        <div class="bottom">
            <form @submit.prevent="submitSignup" method="post">
                <input type="hidden" name="refferal" class="form-control" autocomplete="off" placeholder="Referal" value="<?= $referral ?>">
                <input type="hidden" name="csrf_token" value="">
                <div class="mb-25">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-regular fa-user"></i></span>
                        <input type="text" v-model="fullname" class="form-control" :class="{ 'error': errorFullname }" autocomplete="off" placeholder="Full Name" title="hanya boleh huruf, spasi, tanda hubung (-), titik (.), atau apostrof (')." required>
                    </div>
                    <span class="error-message">{{ errorFullname }}</span>
                </div>

                <div class="mb-25">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-regular fa-envelope"></i></span>
                        <input type="email" v-model="email" required class="form-control" :class="{ 'error': errorEmail }" autocomplete="off" placeholder="Email">
                    </div>
                    <span class="error-message">{{ errorEmail }}</span>
                </div>

                <div class="mb-25">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-regular fa-lock"></i></span>
                        <input type="password" id="password" v-model="password" class="form-control rounded-end" :class="{ 'error': errorPassword }" autocomplete="off" placeholder="Password" title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long." required>
                        <a role="button" class="password-show" @click="showPassword('password')"><i class="fa-duotone fa-eye"></i></a>
                    </div>
                    <span class="error-message">{{ errorPassword }}</span>
                </div>

                <div class="mb-25">
                    <div class="input-group">
                        <div class="input-group-text p-0" style="width: fit-content;">
                            <select v-model="phone_code" class="form-control form-select m-0 pe-0" :class="{ 'error': errorPhoneCode }" required>
                                <option v-for="c in country.countries" :value="c.phone_code">{{ c.phone_code }}</option>
                            </select>
                        </div>
                        <input type="number" v-model="phone" required data-parsley-required class="form-control" :class="{ 'error': errorPhone }" min="0" autocomplete="off" placeholder="Phone Number">
                    </div>
                    <span class="error-message">{{ errorPhone }}</span>
                </div>
                
                <div class="d-flex justify-content-between mb-25">
                    <TermsCondition />
                </div>
                <button type="submit" name="submit_register" @click="confirmRegistration" class="btn btn-primary w-100 login-btn" :disabled="isLoading">
                    <span v-if="!isLoading">Sign up</span>
                    <span v-else>Loading...</span>
                </button>
                <div class="other-option">
                    <p class="mt-2">Already have an account? <RouterLink to="/" class="text-white text-decoration-underline">click here.</RouterLink></p>
                </div>
            </form>
        </div>
    </div>
</template>