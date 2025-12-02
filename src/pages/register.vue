<template>
    <div>
        <h1>Sign Up</h1>
        <p>Please enter your credentials to register.</p>
        <form @submit.prevent="register">
            <input type="email" placeholder="Email" v-model="credentialsToRegister.email">
            <input type="password" placeholder="Password" v-model="credentialsToRegister.password">
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script setup lang="ts">

const supabaseAuth = useSupabaseClient().auth;

const credentialsToRegister = reactive({
    email: '',
    password: ''
});

const register = async () => {
    const { error } = await supabaseAuth.signUp({ email: credentialsToRegister.email, password: credentialsToRegister.password });
    if (error) {
        console.error('Registration error:', error.message);
        alert('Registration failed: ' + error.message);
    } else {
        console.log('Registration successful');
        alert('Registration successful!');
        return navigateTo('/login');
    }
};

</script>