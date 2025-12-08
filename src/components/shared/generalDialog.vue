<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card
      style="
        width: 80vw;
        max-width: 80vw;
        height: 80vh;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
      "
    >
      <q-card-section class="row items-center q-py-md text-primary">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          class="text-primary"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="col q-pt-md scroll">
        <slot></slot>
      </q-card-section>

      <q-separator />

      <q-card-actions
        align="right"
        class="q-pa-md"
        v-if="showCancel || showSave"
      >
        <q-btn
          v-if="showCancel"
          flat
          :label="cancelLabel"
          color="primary"
          v-close-popup
          @click="$emit('cancel')"
        />
        <q-btn
          v-if="showSave"
          flat
          :label="saveLabel"
          class="bg-primary text-white"
          @click="$emit('save')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  showSave: {
    type: Boolean,
    default: false,
  },
  cancelLabel: {
    type: String,
    default: "Cancelar",
  },
  saveLabel: {
    type: String,
    default: "Guardar",
  },
});

defineEmits(["update:modelValue", "cancel", "save"]);
</script>
