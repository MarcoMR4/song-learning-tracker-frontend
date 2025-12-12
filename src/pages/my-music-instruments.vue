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
          :deleting-record-name="props.row.name"
          @view="onViewInstrument"
          @edit="onEditInstrument"
          @delete="onDeleteInstrument"
        />
      </template>
    </q-table>

    <general-dialog
      v-model="dialogOpen"
      :title="dialogMode === 'add' ? 'Add New Instrument' : dialogMode === 'edit' ? 'Edit Instrument' : 'View Instrument'"
      :show-cancel="dialogMode !== 'view'"
      :show-save="dialogMode !== 'view'"
      @cancel="dialogOpen = false"
      @save="onGeneralFormSubmit"
    >
      <general-form
        ref="generalFormRef"
        :fields="instrumentFields"
        :modelValue="selectedInstrument"
        :is-view-mode="dialogMode === 'view'"
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

const dialogMode = ref<'add' | 'edit' | 'view'>('add');
const selectedInstrument = ref<any>(null);

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const { 
  instruments, 
  isLoading, 
  fetchInstruments, 
  addInstrument,
  removeInstrument,
  updateInstrument
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
      required: false,
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
  dialogMode.value = 'add';
  selectedInstrument.value = null;
  dialogOpen.value = true;
}

onMounted(fetchInstruments);

async function onGeneralFormSubmit() {
  const result = await generalFormRef.value?.onValidateForm();
  if (result?.valid && result.data) {
    let success = false;
    if (dialogMode.value === 'add') {
      ({ success } = await addInstrument(result.data));
    } else if (dialogMode.value === 'edit' && selectedInstrument.value) {
      ({ success } = await updateInstrument(selectedInstrument.value.id, result.data));
    }
    if (success) {
      fetchInstruments();
      setTimeout(()=> {
        dialogOpen.value = false;
      }, 2400);
    }
  }
}

function onViewInstrument(row: any) {
  dialogMode.value = 'view';
  selectedInstrument.value = { ...row };
  dialogOpen.value = true;
}

function onEditInstrument(row: any) {
  dialogMode.value = 'edit';
  selectedInstrument.value = { ...row };
  dialogOpen.value = true;
}

async function onDeleteInstrument(row: any) {
  await removeInstrument(row.id);
}

</script>
