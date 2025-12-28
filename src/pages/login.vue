<template>
    <div class="container bg-primary q-pa-none">
        <AuthCard>
            <template #form>
                <q-form @submit.prevent="loginUser">
                    <q-input filled v-model="credentials.email" label="email" type="email" required class="q-mb-md" />
                    <q-input filled v-model="credentials.password" label="password" type="password" required class="q-mb-md" />
                    <q-btn type="submit" color="primary" class="full-width q-my-lg">
                        <template #default>
                            <q-spinner v-if="loadingLogin" size="20px" color="white" class="q-mr-sm" />
                            Login
                        </template>
                    </q-btn>
                </q-form>
            </template>

            <template #footer>
                <q-btn
                label="Create an account"
                color="white"
                flat
                class="full-width bg-secondary"
                :to="{ path: '/register' }"
                />
                <GoogleLogin />
            </template>
        </AuthCard>
    </div>
</template>

<script setup lang="ts">
import GoogleLogin from '~/components/auth/googleLogin.vue';

definePageMeta({
  layout: 'default'
});

const { login } = useAuth();

const credentials = reactive({
    email: '',
    password: ''
});

const loadingLogin = ref(false);

const loginUser = async () => {
    loadingLogin.value = true;
    try {
        await login(credentials.email, credentials.password);
    } catch (error) {
        console.error('Unexpected error in loginUser:', error);
    } finally {
        loadingLogin.value = false;
    }
};

</script>
