<template>
    <div>
        <h1>Protected page for Song Learning Tracker</h1>
    </div>
     <div>
      <q-btn color="primary" label="Test" />
      <q-table :rows="[]" :columns="[]" />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
});

</script>