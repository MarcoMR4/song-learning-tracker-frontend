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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const rows = ref([]);

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
  console.log("Add new instrument");
};
</script>
