<script setup>
import { RouterLink } from 'vue-router'
import TermsCondition from '@/components/modal/TermsCondition.vue'
import { useCountryStore } from '@/store/countries';
import { onMounted } from 'vue';

const country = useCountryStore();

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
            <form id="form-signup" method="post">
                <input type="hidden" name="refferal" class="form-control" autocomplete="off" placeholder="Referal" value="<?= $referral ?>">
                <input type="hidden" name="csrf_token" value="">
                <div class="input-group mb-25">
                    <span class="input-group-text"><i class="fa-regular fa-user"></i></span>
                    <input type="text" name="fullname" required data-parsley-required class="form-control" autocomplete="off" placeholder="Full Name" title="hanya boleh huruf, spasi, tanda hubung (-), titik (.), atau apostrof (').">
                </div>
                <div class="input-group mb-25">
                    <span class="input-group-text"><i class="fa-regular fa-envelope"></i></span>
                    <input type="email" required name="email" class="form-control" autocomplete="off" placeholder="Email">
                </div>
                <div class="input-group mb-25">
                    <span class="input-group-text"><i class="fa-regular fa-lock"></i></span>
                    <input type="password" required name="password" class="form-control rounded-end" autocomplete="off" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,64}$" title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long." >
                    <a role="button" class="password-show"><i class="fa-duotone fa-eye"></i></a>
                </div>
                <div class="input-group mb-25">
                    <div class="input-group-text p-0" style="width: fit-content;">
                        <select name="phone_code" class="form-control form-select m-0">
                            <option v-for="c in country.countries" :value="c.phone_code">{{ c.phone_code }}</option>
                        </select>
                    </div>
                    <input type="number" name="phone" required data-parsley-required class="form-control" min="0" autocomplete="off" placeholder="Phone Number">
                </div>
                
                <div class="d-flex justify-content-between mb-25">
                    <div class="form-check">
                        <input class="form-check-input" name="terms" type="checkbox" required id="loginCheckbox">
                        <TermsCondition />
                    </div>
                </div>
                <button type="submit" name="submit_register" @click="confirmRegistration" class="btn btn-primary w-100 login-btn">Sign up</button>
                <p class="mt-2">Already have an account? <RouterLink to="/" class="text-white text-decoration-underline">click here.</RouterLink></p>
            </form>
        </div>
    </div>
</template>