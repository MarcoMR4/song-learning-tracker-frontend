<template>
  <div class="q-pa-md">
    <table-header
      title="Song Learning Tracking"
      btn-label="Add new tracking"
      btn-icon="add"
      @click="addNewTracking"
    />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No tracking records found </span>
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
  { name: "song", label: "Song", field: "song", align: "left", sortable: true },
  {
    name: "instrument",
    label: "Instrument",
    field: "instrument",
    align: "left",
    sortable: true,
  },
  {
    name: "tunning",
    label: "Tunning",
    field: "tunning",
    align: "center",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "center",
    sortable: true,
  },
];

const addNewTracking = () => {
  console.log("Add new tracking");
};
</script>
