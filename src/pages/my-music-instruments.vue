<template>
  <div class="q-pa-md">
    <table-header
      title="My music instruments"
      btn-label="Add new instrument"
      btn-icon="add"
      @click="addNewInstrument"
    />
    <q-table 
      :rows="instruments" 
      :columns="columns" 
      row-key="id" 
      :loading="isLoading"
    >
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No instruments found </span>
        </div>
      </template>
      <template #body-cell-actions="props">
        <TableActions
          :row="props.row"
          @view="onViewInstrument"
          @edit="onEditInstrument"
          @delete="onDeleteInstrument"
        />
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

import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";
import TableActions from "@/components/shared/tableActions.vue";
import GeneralDialog from "@/components/shared/generalDialog.vue";
import GeneralForm from "@/components/shared/generalForm.vue";

import { useMusicInstrumentCrud } from "@/composables/useMusicInstrumentCrud";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const { 
  instruments, 
  isLoading, 
  fetchInstruments, 
  addInstrument 
} = useMusicInstrumentCrud();

const dialogOpen = ref(false);

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
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
    sortable: false,
  }
];

const generalFormRef = ref();

function addNewInstrument() {
  dialogOpen.value = true;
}

onMounted(fetchInstruments);

async function onGeneralFormSubmit() {
  // Validar el formulario manualmente usando la función expuesta
  const result = await generalFormRef.value?.onSubmit();
  if (result?.valid && result.data) {
    const { success } = await addInstrument(result.data);
    if (success) {
      setTimeout(()=> {
        dialogOpen.value = false;
      }, 1000);
    }
  }
}

function onViewInstrument(row: any) {
  console.log('View instrument:', row);
}

function onEditInstrument(row: any) {
  console.log('Edit instrument:', row);
}

async function onDeleteInstrument(row: any) {
  // Aquí puedes usar removeInstrument si tienes implementado en el CRUD
  console.log('Delete instrument:', row);
}

</script>
