<template>
    <div class="container bg-primary q-pa-none">
        <AuthCard>
            <template #form>
                <q-form @submit.prevent="registerUser">
                <q-input filled v-model="credentials.email" label="email" type="email" required class="q-mb-md" />
                <q-input filled v-model="credentials.password" label="password" type="password" required class="q-mb-md" />
                <q-input filled v-model="credentials.confirm" label="confirm password" type="password" required class="q-mb-md" />

                <q-btn type="submit" color="primary" class="full-width q-my-md" :disable="loading">
                    <template #default>
                        <q-spinner v-if="loading" size="20px" color="white" class="q-mr-sm" />
                        Register
                    </template>
                </q-btn>
                </q-form>
            </template>

            <template #footer>
                <q-btn
                    label="Already have an account?"
                    color="white"
                    flat
                    class="full-width bg-secondary"
                    :to="{ path: '/login' }"
                />
            </template>
        </AuthCard>
    </div>
</template>

<script setup lang="ts">

const { register, loading} = useAuth();
const { showError } = useQuasarUi();

const credentials = reactive({
    email: '',
    password: '',
    confirm: ''
});

const registerUser = async () => {
    if (credentials.password !== credentials.confirm) {
        showError('Passwords do not match');
        return;
    }
    await register(credentials.email, credentials.password);
};

</script>
