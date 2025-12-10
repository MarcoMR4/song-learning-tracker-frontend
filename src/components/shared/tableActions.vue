<template>
  <q-td>
    <div class="q-gutter-x-sm row items-center justify-center">
        <q-btn dense flat color="primary" icon="visibility" @click="$emit('view', row)" title="View" />
        <q-btn dense flat color="secondary" icon="edit" @click="$emit('edit', row)" title="Edit" />
        <q-btn dense flat color="negative" icon="delete" @click="onDelete" title="Delete" />
    </div>
  </q-td>
</template>

<script setup lang="ts">

const props = defineProps({
    row: { 
        type: Object, 
        required: true 
    },
    deletingRecordName: {
        type: String,
        default: 'this record'
    }
});

const emit = defineEmits([
    'view', 
    'edit', 
    'delete'
]);

import { useQuasarUi } from '~/composables/useQuasarUi';
const { confirmAction } = useQuasarUi();

function onDelete() {
    confirmAction('Delete confirmation', `Are you sure you want to delete ${props.deletingRecordName}?`)
        .onOk(() => {
        emit('delete', props.row);
    });
}

</script>
