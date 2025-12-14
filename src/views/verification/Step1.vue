<script setup>
import { genderOptions } from '@/interface/user.interface';
import { useCountryStore } from '@/store/countries.store';
import { useForm, useField } from 'vee-validate';
import { fullnameRequirement, phoneRequirement, genderRequirement } from '@/composables/useValidation';
import * as yup from 'yup';
import { onMounted, ref, watch } from 'vue';
import { verification_step_1 } from '@/api/user/verification.api';
import { useSweetAlert } from '@/composables/useSweetAlert';
import router from '@/router';
import { useUserStore } from '@/store/user.store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { errorAlert, successAlert } = useSweetAlert();
const country = useCountryStore();
const { handleSubmit, setFieldError } = useForm({
  validationSchema: {
    fullname: fullnameRequirement(),
    phone_code: yup.string().required(),
    phone: phoneRequirement(),
    gender: genderRequirement(),
  },
  initialValues: {
    fullname: user.value.fullname,
    address: user.value.address,
    phone_code: user.value.phone_code,
    phone: user.value.phone.replace(user.value.phone_code, ''),
    gender: user.value.gender
  }
})

const { value: fullname, errorMessage: errorFullname } = useField('fullname');
const { value: phone_code, errorMessage: errorPhoneCode } = useField('phone_code');
const { value: phone, errorMessage: errorPhone } = useField('phone');
const { value: gender, errorMessage: errorGender } = useField('gender');
const { value: address, errorMessage: errorAddress } = useField('address')
const isLoading = ref(false);

const handleSubmitStep1 = handleSubmit(async v => {
    try {
        isLoading.value = true;
        const response = await verification_step_1({
            fullname: v.fullname,
            phone_code: v.phone_code,
            phone: v.phone,
            gender: v.gender,
            address: v.address
        });

        if(response.code !== 200) {
            errorAlert(response.message || "Failed");
            return;
        }

        successAlert(response.message).then(async () => {
            await userStore.loadProfile(true);
            router.push('/dashboard')
        })

    } catch (error) {
        errorAlert(error.response.data?.message);
        const serverErrors = error.response.data?.errors || {}
        Object.keys(serverErrors).forEach(key => {
            setFieldError(key, serverErrors[key][0]);
        })

    } finally {
        isLoading.value = false;
    }
})

onMounted(() => {
	country.load()
})
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="panel">
                <div class="card">
                    <div class="card-body">
                        <div class="alert alert-warning">
                            <p>Please make sure the name and email that is registered is appropriate</p>
                        </div>
                        <form @submit.prevent="handleSubmitStep1">
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <label for="fullname" class="form-label"><span class="text-danger">*</span>Fullname</label>
                                    <input v-model="fullname" type="text" name="fullname" id="fullname" class="form-control">
                                    <span class="error-message">{{ errorFullname }}</span>
                                </div>
                
                                <div class="col-md-12 mb-2">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" readonly class="form-control" :value="user.email">
                                </div>
        
                                <div class="col-md-6 mb-2">
                                    <div class="input-group">
                                        <label for="" class="form-label"><span class="text-danger">*</span>Phone Number</label>
                                        <div class="input-group-text p-0">
                                            <select v-model="phone_code" class="form-control form-select m-0 pe-0" required style="width: 90px;">
                                                <option v-for="c in country.countries" :value="c.phone_code">{{ c.phone_code }}</option>
                                            </select>
                                            <input type="number" v-model="phone" required class="form-control" min="0" autocomplete="off" placeholder="Phone Number">
                                        </div>
                                    </div>
                                    <span class="error-message">{{ errorPhone || errorPhoneCode }}</span>
                                </div>
        
                                <div class="col-md-6 mb-2">
                                    <label for="gender" class="form-label">Gender <small>(optional)</small></label>
                                    <select v-model="gender" name="gender" id="gender" class="form-control">
                                        <option value="" selected disabled>Plase select</option>
                                        <option v-for="g in genderOptions" :value="g.value">{{ g.text }}</option>
                                    </select>
                                    <span class="error-message">{{ errorGender }}</span>
                                </div>
        
                                <div class="col-md-12 mb-2">
                                    <label for="address" class="form-label">Address <small>(optional)</small></label>
                                    <textarea class="form-control" name="address" id="address" placeholder="Address..." rows="5" v-model="address"></textarea>
                                    <span class="error-message">{{ errorAddress }}</span>
                                </div>
        
                                <div class="col-md-12 w-100">
                                    <button type="submit" name="next" :disabled="isLoading" :class="{ 'loading': isLoading }" class="btn btn-primary float-end">Next</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>