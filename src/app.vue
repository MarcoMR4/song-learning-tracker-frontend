<template>
  <div>
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li v-if="user">
        <NuxtLink to="/protected">Protected</NuxtLink>
      </li>
      <li v-else>
        <NuxtLink to="/login">Login</NuxtLink>
      </li>
      <li v-if="user">
        <button @click="logout">Logout</button>
      </li>
      <li v-else>
        <NuxtLink to="/register">Register</NuxtLink>
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser(); 

const supabaseAuth = useSupabaseClient().auth;

const logout = async () => {
    const { error } = await supabaseAuth.signOut();
    if (error) {
        console.error('Logout error:', error.message);
        alert('Logout failed: ' + error.message);
    } 
    else {
        console.log('Logout successful');
        alert('Logout successful!');
        return navigateTo('/login');
    }
};

</script>