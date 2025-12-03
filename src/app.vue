<template>
  <NuxtLayout>
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
  </NuxtLayout>
</template>

<script setup lang="ts">

import { Notify } from 'quasar'

const user = useSupabaseUser(); 
const supabaseAuth = useSupabaseClient().auth;

function showNotification() {
  Notify.create({
    message: 'Session closed successfully',
    color: 'negative',
    position: 'bottom',
    timeout: 2000
  })
}

const logout = async () => {
  const { error } = await supabaseAuth.signOut();
  if (error) {
    console.error('Logout error:', error.message);
    alert('Logout failed: ' + error.message);
  } 
  else {
    showNotification();
    console.log('Logout successful');
    alert('Logout successful!');
    setTimeout(() => {
      navigateTo('/login');
    }, 2500);
  }
};

</script>