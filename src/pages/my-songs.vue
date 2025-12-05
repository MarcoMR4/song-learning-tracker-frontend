<template>
    <div>
        <h1>My Songs</h1>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
  layout: 'system'
});

const fetchedSongs = ref([]);

import { getSongs } from '@/services/supabase/songService';


const fetchSongs = async () => {
    try {
        const songs = await getSongs();
        console.log('Fetched songs:', songs);
        fetchedSongs.value = songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
};

onMounted(() => {
    fetchSongs();
});

</script>