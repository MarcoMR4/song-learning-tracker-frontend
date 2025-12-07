<template>
  <div class="row items-center justify-between q-my-lg">
    <div class="text-h4">{{ title }}</div>
    <q-btn
      v-if="btnLabel || btnIcon"
      :label="btnLabel"
      :icon="btnIcon"
      :color="btnColor"
      @click="$emit('click')"
      no-caps
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  btnLabel: {
    type: String,
    default: "",
  },
  btnIcon: {
    type: String,
    default: "",
  },
  btnColor: {
    type: String,
    default: "primary",
  },
});

defineEmits(["click"]);
</script>
