<template>
    <div>
        <h1>Welcome to the Song Learning Tracker</h1>
        <p>Use the navigation to explore the app.</p>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'authenticated'
});

</script>