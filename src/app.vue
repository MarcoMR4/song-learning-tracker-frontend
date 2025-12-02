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
    </ul>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser(); 

</script>