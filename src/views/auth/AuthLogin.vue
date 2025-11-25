<script setup>
import { createToken } from '@/api/auth/auth.api';
import LogoWhite from '@/components/icons/LogoWhite.vue';
import LoadingRedirect from '@/components/modal/LoadingRedirect.vue';
import { saveToken } from '@/composables/useAuth';
import { showPassword } from '@/composables/useHelper';
import { useSweetAlert } from '@/composables/useSweetAlert';
import router from '@/router';
import { useForm, useField } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';

const { errorAlert, successAlert } = useSweetAlert();
const { handleSubmit } = useForm({
    validationSchema: {
        email: yup.string().email('Invalid email format.').required('Email is required.'),
        password: yup.string().required('Password is required.'),
    }
})

const { value: email, errorMessage: errorEmail } = useField('email');
const { value: password, errorMessage: errorPassword } = useField('password');
const isLoading = ref(false);
const showLoadingRedirect = ref(false);

const submitLogin = handleSubmit(async values => {
    try {
        isLoading.value = true;
        const response = await createToken(values);
        if(response.code !== 200) {
            errorAlert(response.message);
            return;
        }

        console.log(response);
        await saveToken(response.data.access_token, response.data.refresh_token);
        showLoadingRedirect.value = true;
        setTimeout(() => {
            router.push('/dashboard');
            showLoadingRedirect.value = false;
        }, 1000);

    } catch (error) {
        errorAlert(error.response?.data?.message || 'Login Failed');
    } finally {
        isLoading.value = false;
    }
})
</script>

<template>
    <LoadingRedirect :show="showLoadingRedirect" message="Redirecting" />
    <div class="login-body login-body-2">
        <div class="page-title-bar d-flex justify-content-center align-items-center position-relative mb-3">
            <a href="https://rrfx.co.id" class="btn-back position-absolute start-0 text-white" aria-label="Kembali">
                <i class="fa-solid fa-arrow-left" style="font-size: 20px;"></i>
            </a>
            <h3 class="panel-title mb-0">Login</h3>
        </div>
        <div class="top d-flex justify-content-between align-items-center">
            <div class="logo">
                <LogoWhite />
            </div>
            <a href="/" aria-label="go to Home"><i class="fa-duotone fa-house-chimney"></i></a>
        </div>
        <div class="bottom">
            <form @submit.prevent="submitLogin" class="login-form">
                <input type="hidden" name="csrf_token" value="">
                <div class="mb-25">
                    <div class="input-group">
                        <input v-model="email" name="email" type="email" class="form-control" :class="{ 'error': errorEmail }" autocomplete="off" placeholder="Email address" required>
                        <span class="input-group-text"><i class="fa-regular fa-envelope"></i></span>
                    </div>
                    <span class="error-message">{{ errorEmail }}</span>
                </div>

                <div class="mb-25">
                    <div class="input-group">
                        <input v-model="password" name="password" id="password" type="password" class="form-control" :class="{ 'error': errorPassword }" autocomplete="off" title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long." placeholder="Password"  required>
                        <span class="input-group-text" style="cursor: pointer;" @click="showPassword('password')"><i id="passwordIcon" class="fa-regular fa-eye"></i></span>
                    </div>
                    <span class="error-message">{{ errorPassword }}</span>
                </div>
                <div class="d-flex justify-content-between mb-25">
                    <div class="form-check">
                        <!-- <input class="form-check-input" type="checkbox" name="remember" value="" id="loginCheckbox">
                        <label class="form-check-label text-white" for="loginCheckbox">
                            Remember Me
                        </label> -->
                    </div>
                    <a href="#" class="text-white fs-14">Forgot Password?</a>
                </div>
                <button type="submit" name="sumit_login" :disabled="isLoading" :class="{ 'loading': isLoading }" class="btn btn-primary w-100 login-btn">Login</button>
            </form>
            <!-- <div class="other-option">
                <p>Or continue with</p>
                <div class="social-box d-flex justify-content-center gap-20">
                    <a href="/google_login" aria-label="login as google"><i class="fa-brands fa-google text-dark"></i></a>
                </div>
            </div> -->

            <div class="other-option">
                <p class="mb-0">Don't have an account? <RouterLink to="/signup" class="text-white text-decoration-underline">create.</RouterLink></p>
            </div>
        </div>
    </div>
</template>