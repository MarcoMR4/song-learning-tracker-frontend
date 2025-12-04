<template>
    <div class="container bg-primary q-pa-none">
        <AuthCard>
            <template #form>
                <q-form @submit.prevent="registerUser">
                <q-input filled v-model="credentials.email" label="email" type="email" required class="q-mb-md" />
                <q-input filled v-model="credentials.password" label="password" type="password" required class="q-mb-md" />
                <q-input filled v-model="credentials.confirm" label="confirm password" type="password" required class="q-mb-md" />

                <q-btn label="Register" type="submit" color="primary" class="full-width q-my-md" />
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

const supabaseAuth = useSupabaseClient().auth;

const { register} = useAuth();

const credentials = reactive({
    email: '',
    password: '',
    confirm: ''
});

const registerUser = async () => {
    if (credentials.password !== credentials.confirm) {
        alert('Passwords do not match');
        return;
    }
    await register(credentials.email, credentials.password);
};

</script>
