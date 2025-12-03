<template>
    <div class="container bg-primary q-pa-none">
        <AuthCard>
            <template #form>
                <q-form @submit.prevent="login">
                <q-input filled v-model="credentials.email" label="email" type="email" required class="q-mb-md" />
                <q-input filled v-model="credentials.password" label="password" type="password" required class="q-mb-md" />
                <q-btn label="Login" type="submit" color="primary" class="full-width q-my-md" />
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
            </template>
        </AuthCard>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'default'
});

const supabaseAuth = useSupabaseClient().auth;

const credentials = reactive({
    email: '',
    password: ''
});

const login = async () => {
    const { error } = await supabaseAuth.signInWithPassword({ email: credentials.email, password: credentials.password });
    if (error) {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
    } else {
        console.log('Login successful');
        navigateTo('/');
    }
};

</script>
