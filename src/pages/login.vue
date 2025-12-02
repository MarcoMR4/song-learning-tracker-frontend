<template>
    <div>
        <h1>Login</h1>
        <p>Please enter your credentials to log in.</p>
        <form @submit.prevent="login">
            <input type="email" placeholder="Email" v-model="credentials.email">
            <input type="password" placeholder="Password" v-model="credentials.password">
            <button type="submit">Login</button>
        </form>
    </div>
    <div>
        <p>
            Don't have an account? <NuxtLink to="/register">Register here</NuxtLink>
        </p>
    </div>
</template>

<script setup lang="ts">

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
    }
};

</script>