<template>
    <div>
        <h1>Song Tracking</h1>
    </div>
     <div>
      <q-btn color="primary" label="Test" />
      <q-table :rows="[]" :columns="[]" />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
  layout: 'system'
});

</script>