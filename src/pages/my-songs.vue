<template>
  <div class="q-pa-md">
    <table-header
      title="My songs to learn"
      btn-label="New Song"
      btn-icon="add"
      @click="addNewSong"
    />
    <q-table :rows="songs" :columns="columns" row-key="id" :loading="isLoading">
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No songs found </span>
        </div>
      </template>
    </q-table>

    <general-dialog
      v-model="dialogOpen"
      title="Add New Song"
      show-cancel
      show-save
      @cancel="dialogOpen = false"
      @save="onGeneralFormSubmit"
    >
      <general-form
        ref="generalFormRef"
        :fields="songFields"
      />
    </general-dialog>
  </div>
</template>

<script setup lang="ts">

import { type QTableColumn } from "quasar";
import TableHeader from "@/components/shared/tableHeader.vue";
import GeneralDialog from "@/components/shared/generalDialog.vue";
import GeneralForm from "@/components/shared/generalForm.vue";
import { useSongCrud } from "@/composables/useSongCrud";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const { 
  songs, 
  isLoading, 
  fetchSongs, 
  addSong 
} = useSongCrud();

const dialogOpen = ref(false);
const generalFormRef = ref();

const songFields = [
  {
    name: "title",
    type: "QInput",
    required: true,
    props: {
      label: "Title",
      outlined: true,
    },
  },
  {
    name: "artist",
    type: "QInput",
    required: true,
    props: {
      label: "Artist",
      outlined: true,
    },
  },
  {
    name: "difficulty",
    type: "QInput",
    props: {
        label: "Difficulty (1-5)",
        type: "number",
        outlined: true,
        required: false,
        min: 1,
        max: 5
    }
  },
  {
    name: "year",
    type: "QInput",
    props: {
      label: "Year",
      type: "number",
      outlined: true,
      required: false,
      min: 1900,
      max: new Date().getFullYear() 
    }
  }
];

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

const addNewSong = () => {
  dialogOpen.value = true;
};

async function onGeneralFormSubmit() {
  const result = await generalFormRef.value?.onSubmit();
  if (result?.valid && result.data) {
    const { success } = await addSong(result.data);
    if (success) {
      setTimeout(()=> {
        dialogOpen.value = false;
      }, 2400);
    }
  }
}

onMounted(() => {
  fetchSongs();
});
</script>
