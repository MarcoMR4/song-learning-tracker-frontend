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
      @save="saveInstrument"
    >
      <div class="q-gutter-md">
        <q-input v-model="form.name" label="Name" outlined />
        <q-input v-model="form.notes" label="Notes" type="textarea" outlined />
      </div>
    </general-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";
import GeneralDialog from "@/components/shared/generalDialog.vue";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const rows = ref([]);
const dialogOpen = ref(false);
const form = reactive({
  name: "",
  notes: "",
});

const columns: QTableColumn[] = [
  { name: "name", label: "Name", field: "name", align: "left", sortable: true },
  {
    name: "notes",
    label: "Notes",
    field: "notes",
    align: "left",
    sortable: true,
  },
];

const addNewInstrument = () => {
  form.name = "";
  form.notes = "";
  dialogOpen.value = true;
};

const saveInstrument = () => {
  console.log("Saving instrument:", form);
  dialogOpen.value = false;
};
</script>
