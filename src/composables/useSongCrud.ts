import { useQuasarUi } from '@/composables/useQuasarUi';
import { 
  getSongs, 
  createSong, 
  updateSong as updateSongService, 
  deleteSong as deleteSongService 
} from '@/services/supabase/songService';

export function useSongCrud() {
  const { 
    showError, 
    showSuccess 
  } = useQuasarUi();
  const songs = ref<any[]>([]);
  const isLoading = ref(false);

  const fetchSongs = async () => {
    isLoading.value = true;
    try {
      const data = await getSongs();
      songs.value = data || [];
    } catch (error) {
      console.error('Error fetching songs:', error);
      showError('Failed to fetch songs');
    } finally {
      isLoading.value = false;
    }
  };

  const addSong = async (songData: any) => {
    isLoading.value = true;
    try {
      await createSong(songData);
      showSuccess('Song created successfully');
      await fetchSongs();
      return { success: true };
    } catch (e: any) {
      console.error('Error creating song:', e.message || e);
      showError('Unexpected error has occurred trying to add new song.');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  const updateSong = async (id: number, songData: any) => {
    isLoading.value = true;
    try {
      await updateSongService(id, songData);
      showSuccess('Song updated successfully');
      await fetchSongs();
      return { success: true };
    } catch (e: any) {
      console.error('Error updating song:', e.message || e);
      showError('Failed to update song');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  const removeSong = async (id: number) => {
    isLoading.value = true;
    try {
      await deleteSongService(id);
      showSuccess('Song deleted successfully');
      await fetchSongs();
    } catch (e: any) {
      console.error('Error deleting song:', e.message || e);
      showError('Failed to delete song');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    songs,
    isLoading,
    fetchSongs,
    addSong,
    updateSong,
    removeSong
  };
}
