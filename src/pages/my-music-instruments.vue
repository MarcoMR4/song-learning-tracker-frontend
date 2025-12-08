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
import { ref, reactive } from "vue";
import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";
import GeneralDialog from "@/components/shared/generalDialog.vue";
import GeneralForm from "@/components/shared/generalForm.vue";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const rows = ref([]);
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
    name: "notes",
    type: "QInput",
    props: {
      label: "Notes",
      type: "textarea",
      outlined: true,
    },
  },
];

const columns: QTableColumn[] = [
  { name: "name", 
    label: "Name", 
    field: "name", 
    align: "left", 
    sortable: true,
    required: true,
  },
  {
    name: "notes",
    label: "Notes",
    field: "notes",
    align: "left",
    sortable: true,
  },
];

const generalFormRef = ref();

function addNewInstrument() {
  dialogOpen.value = true;
};

async function onGeneralFormSubmit() {
  // Validar el formulario manualmente usando la función expuesta
  const result = await generalFormRef.value?.onSubmit();
  if (result?.valid && result.data) {
    console.log("Instrument data submitted:", result.data);
    dialogOpen.value = false;
  }
}
</script>
