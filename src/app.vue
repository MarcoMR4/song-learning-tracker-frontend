<template>
  <div>
    <ul>
      <template v-if="user">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/protected">Protected</NuxtLink>
        </li>
        <li>
          <button @click="logout">Logout</button>
        </li>
      </template>
      <template v-else>
        <li>
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/register">Register</NuxtLink>
        </li>
      </template>
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