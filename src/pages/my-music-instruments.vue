<template>
  <div class="q-pa-md">
    <table-header
      title="My music instruments"
      btn-label="Add new instrument"
      btn-icon="add"
      @click="addNewInstrument"
    />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No instruments found </span>
        </div>
      </template>
    </q-table>

    <general-dialog
      v-model="dialogOpen"
      title="Add New Instrument"
      show-cancel
      show-save
      @cancel="dialogOpen = false"
      @save="onGeneralFormSubmit"
    >
      <general-form
        ref="generalFormRef"
        :fields="instrumentFields"
      />
    </general-dialog>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";
import GeneralDialog from "@/components/shared/generalDialog.vue";
import GeneralForm from "@/components/shared/generalForm.vue";

import { createMusicInstrument, getMusicInstruments } from '@/services/supabase/musicInstrumentService';

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const rows = ref([]);
const dialogOpen = ref(false);
const { 
  showError, 
  showSuccess 
} = useQuasarUi();

const instrumentFields = [
  {
    name: "name",
    type: "QInput",
    props: {
      label: "Name",
      outlined: true,
      required: true,
    },
  },
  {
    name: "observations",
    type: "QInput",
    props: {
      label: "Observations",
      type: "textarea",
      outlined: true,
      required: false
    },
  },
];

const columns: QTableColumn[] = [
  { 
    name: "name", 
    label: "Name", 
    field: "name", 
    align: "left", 
    sortable: true,
    required: true,
  },
  {
    name: "observations",
    label: "Observations",
    field: "observations",
    align: "left",
    sortable: true,
  },
];

const generalFormRef = ref();

function addNewInstrument() {
  dialogOpen.value = true;
}

async function refreshInstruments() {
  const data  = await getMusicInstruments();
  rows.value = data;
}

onMounted(refreshInstruments);

async function onGeneralFormSubmit() {
  // Validar el formulario manualmente usando la función expuesta
  const result = await generalFormRef.value?.onSubmit();
  if (result?.valid && result.data) {
    try {
      const { error } = await createMusicInstrument(result.data);
      if (error) {
        console.error('Error creating instrument:', error.message);
        showError('Unexpected error has occurred.');
      } else {
        showSuccess('Instrument created successfully');
        refreshInstruments();
        setTimeout(()=> {
          dialogOpen.value = false;
        },2400);
      }
    } catch (e) {
      console.error('Unexpected error:', e);
      showError('Unexpected error has occurred.');
    }
  }
}
</script>
