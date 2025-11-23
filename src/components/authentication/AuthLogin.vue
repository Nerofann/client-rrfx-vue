<script setup>
import { createToken } from '@/api/auth/auth.api';
import LogoWhite from '@/components/icons/LogoWhite.vue';
import { useSweetAlert } from '@/composables/useSweetAlert';
import AppFooter from '@/views/layouts/AppFooter.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const { errorAlert, successAlert } = useSweetAlert();


function submitLogin() {
    const loginData = {
        email: email.value,
        password: password.value,
    };

    createToken(loginData)
        .then((response) => {
            successAlert('Login successful!', function() {
                console.log('Redirecting to dashboard...');
            });
        })
        .catch((error) => {
            errorAlert(error.response?.data?.error || 'Login failed. Please try again.');
        });
}
</script>

<template>
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
                <div class="input-group mb-25">
                    <input v-model="email" name="email" type="email" class="form-control" autocomplete="off" placeholder="Email address" required>
                    <span class="input-group-text"><i class="fa-regular fa-envelope"></i></span>
                </div>
                <div class="input-group mb-25">
                    <input v-model="password" name="password" id="password" type="password" class="form-control" autocomplete="off" title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long." placeholder="Password"  required>
                    <span class="input-group-text" style="cursor: pointer;" onclick="togglePassword('password')"><i id="passwordIcon" class="fa-regular fa-eye"></i></span>
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
                <button type="submit" name="sumit_login" class="btn btn-primary w-100 login-btn">Login</button>
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

    <AppFooter />
</template>