<template>
    <div>
        <h1>Portected page for Song Learning Tracker</h1>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
});

</script>