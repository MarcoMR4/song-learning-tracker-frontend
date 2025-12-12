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
      <template #body-cell-actions="props">
        <TableActions
          :row="props.row"
          :deleting-record-name="props.row.title"
          @view="onViewSong"
          @edit="onEditSong"
          @delete="onDeleteSong"
        />
      </template>
    </q-table>

    <general-dialog
      v-model="dialogOpen"
      :title="
        dialogMode === 'add'
          ? 'Add New Song'
          : dialogMode === 'edit'
          ? 'Edit Song'
          : 'View Song'
      "
      :show-cancel="dialogMode !== 'view'"
      :show-save="dialogMode !== 'view'"
      @cancel="dialogOpen = false"
      @save="onGeneralFormSubmit"
    >
      <general-form
        ref="generalFormRef"
        :fields="songFields"
        :modelValue="selectedSong"
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
import { useSongCrud } from "@/composables/useSongCrud";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const { 
  songs, 
  isLoading, 
  fetchSongs, 
  addSong, 
  updateSong, 
  removeSong 
} = useSongCrud();

const dialogOpen = ref(false);
const dialogMode = ref<"add" | "edit" | "view">("add");
const selectedSong = ref<any>(null);
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
      max: 5,
    },
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
      max: new Date().getFullYear(),
    },
  },
];

const columns: QTableColumn[] = [
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
    label: "Difficulty (1-5 where 1 is the easiest and 5 is the hardest)",
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
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "center",
    sortable: false,
  },
];

const addNewSong = () => {
  dialogMode.value = "add";
  selectedSong.value = null;
  dialogOpen.value = true;
};

async function onGeneralFormSubmit() {
  const result = await generalFormRef.value?.onValidateForm();
  if (result?.valid && result.data) {
    let success = false;
    if (dialogMode.value === "add") {
      ({ success } = await addSong(result.data));
    } else if (dialogMode.value === "edit" && selectedSong.value) {
      ({ success } = await updateSong(selectedSong.value.id, result.data));
    }

    if (success) {
      setTimeout(() => {
        dialogOpen.value = false;
      }, 2400);
    }
  }
}

function onViewSong(row: any) {
  dialogMode.value = "view";
  selectedSong.value = { ...row };
  dialogOpen.value = true;
}

function onEditSong(row: any) {
  dialogMode.value = "edit";
  selectedSong.value = { ...row };
  dialogOpen.value = true;
}

async function onDeleteSong(row: any) {
  const { success } = await removeSong(row.id);
  if (success) {
    fetchSongs();
  }
}

onMounted(() => {
  fetchSongs();
});

</script>
