<template>
  <div class="q-pa-md">
    <table-header
      title="My songs to learn"
      btn-label="New Song"
      btn-icon="add"
      @click="addNewSong"
    />
    <q-table :rows="fetchedSongs" :columns="columns" row-key="id">
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No songs found </span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";
import { getSongs } from "@/services/supabase/songService";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const addNewSong = () => {
  console.log("add new song");
};

const columns: QTableColumn[] = [
  { name: "id", label: "ID", field: "id", align: "left", sortable: true },
  {
    name: "title",
    label: "Title",
    field: "title",
    align: "left",
    sortable: true,
  },
  {
    name: "artist",
    label: "Artist",
    field: "artist",
    align: "left",
    sortable: true,
  },
  {
    name: "difficulty",
    label: "Difficulty",
    field: "difficulty",
    align: "center",
    sortable: true,
  },
  {
    name: "year",
    label: "Year",
    field: "year",
    align: "center",
    sortable: true,
  },
];

const fetchedSongs = ref([]);

const fetchSongs = async () => {
  try {
    const songs = await getSongs();
    console.log("Fetched songs:", songs);
    fetchedSongs.value = songs || [];
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};

onMounted(() => {
  fetchSongs();
});
</script>
