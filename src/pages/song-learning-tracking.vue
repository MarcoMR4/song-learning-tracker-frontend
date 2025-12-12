<template>
  <div class="q-pa-md">
    <table-header
      title="Song Learning Tracking"
      btn-label="Add new tracking"
      btn-icon="add"
      @click="addNewTracking"
    />
    <q-table :rows="songTrackings" :columns="columns" row-key="id" :loading="isLoading">
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No song tracking records found </span>
        </div>
      </template>
      <template #body-cell-actions="props">
        <TableActions
          :row="props.row"
          :deleting-record-name="getDeletingRecordName(props.row)"
          @view="onViewTracking"
          @edit="onEditTracking"
          @delete="onDeleteTracking"
        />
      </template>
    </q-table>

    <general-dialog
      v-model="dialogOpen"
      :title="
        dialogMode === 'add'
          ? 'Add New Tracking'
          : dialogMode === 'edit'
          ? 'Edit Tracking'
          : 'View Tracking'
      "
      :show-cancel="dialogMode !== 'view'"
      :show-save="dialogMode !== 'view'"
      @cancel="dialogOpen = false"
      @save="onGeneralFormSubmit"
    >
      <general-form
        ref="generalFormRef"
        :fields="trackingFields"
        :modelValue="selectedTracking"
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

import { useSongTrackingCrud } from "@/composables/useSongTrackingCrud";
import { useSongCrud } from "@/composables/useSongCrud";
import { useMusicInstrumentCrud } from "@/composables/useMusicInstrumentCrud";

definePageMeta({
  middleware: "auth",
  layout: "system",
});

const { 
  songTrackings, 
  isLoading, 
  fetchSongTrackings, 
  addSongTracking, 
  updateSongTracking, 
  removeSongTracking 
} = useSongTrackingCrud();

const { 
  songs, 
  fetchSongs 
} = useSongCrud();

const { 
  instruments, 
  fetchInstruments 
} = useMusicInstrumentCrud();

const dialogOpen = ref(false);
const dialogMode = ref<"add" | "edit" | "view">("add");
const selectedTracking = ref<any>(null);
const generalFormRef = ref();

// Fetch required data
onMounted(async () => {
  await Promise.all([
    fetchSongTrackings(),
    fetchSongs(),
    fetchInstruments()
  ]);
});

// Computed fields to verify options are populated
const trackingFields = computed(() => {
  const fields = [
    {
      name: "song", 
      type: "QSelect",
      required: true,
      options: songs.value.map(s => ({ label: s.title, value: s.id })),
      props: {
        label: "Song",
        outlined: true,
        emitValue: true,
        mapOptions: true,
      },
    },
    {
      name: "instrument",
      type: "QSelect",
      required: true,
      options: instruments.value.map(i => ({ label: i.name, value: i.id })),
      props: {
        label: "Instrument",
        outlined: true,
        emitValue: true,
        mapOptions: true,
      },
    }
  ];

  if (dialogMode.value === 'edit' || dialogMode.value === 'view') {
    fields.push({
      name: "status",
      type: "QInput", 
      required: true,
      props: {
        label: "Status",
        outlined: true,
      },
    } as any);
  }
  return fields;
});

const columns: QTableColumn[] = [
  { 
    name: "song", 
    label: "Song", 
    field: (row: any) => row.song?.title || row.song_id, 
    align: "left", 
    sortable: true 
  },
  {
    name: "instrument",
    label: "Instrument",
    field: (row: any) => row.instrument?.name || row.instrument_id, 
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
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

const addNewTracking = () => {
  dialogMode.value = "add";
  selectedTracking.value = null;
  dialogOpen.value = true;
};

const getDeletingRecordName = (row: any) => {
    const songName = row.song?.title || 'Unknown Song';
    return `Tracking for ${songName}`;
}

async function onGeneralFormSubmit() {
  const result = await generalFormRef.value?.onSubmit();
  if (result?.valid && result.data) {
    let success = false;
    if (dialogMode.value === "add") {
      ({ success } = await addSongTracking(result.data));
    } else if (dialogMode.value === "edit" && selectedTracking.value) {
      ({ success } = await updateSongTracking(selectedTracking.value.id, result.data));
    }

    if (success) {
      setTimeout(() => {
        dialogOpen.value = false;
      }, 2400); 
    }
  }
}

function onViewTracking(row: any) {
  dialogMode.value = "view";
  selectedTracking.value = { ...row };
  dialogOpen.value = true;
}

function onEditTracking(row: any) {
  dialogMode.value = "edit";
  selectedTracking.value = { ...row };
  dialogOpen.value = true;
}

async function onDeleteTracking(row: any) {
  await removeSongTracking(row.id);
}

</script>
