import { useQuasarUi } from '@/composables/useQuasarUi';
import { 
  getSongTrackings, 
  createSongTracking, 
  updateSongTracking as updateSongTrackingService, 
  deleteSongTracking as deleteSongTrackingService 
} from '@/services/supabase/songTrackingService';

export function useSongTrackingCrud() {
  const { 
    showError, 
    showSuccess 
  } = useQuasarUi();
  const songTrackings = ref<any[]>([]);
  const isLoading = ref(false);

  const fetchSongTrackings = async () => {
    isLoading.value = true;
    try {
      const data = await getSongTrackings();
      songTrackings.value = data || [];
    } catch (error) {
      console.error('Error fetching song trackings:', error);
      showError('Failed to fetch song trackings');
    } finally {
      isLoading.value = false;
    }
  };

  const addSongTracking = async (trackingData: any) => {
    isLoading.value = true;
    try {
      await createSongTracking(trackingData);
      showSuccess('Song tracking created successfully');
      await fetchSongTrackings();
      return { success: true };
    } catch (e: any) {
      console.error('Error creating song tracking:', e.message || e);
      showError('Unexpected error has occurred.');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  const updateSongTracking = async (id: number, trackingData: any) => {
    isLoading.value = true;
    try {
      await updateSongTrackingService(id, trackingData);
      showSuccess('Song tracking updated successfully');
      await fetchSongTrackings();
      return { success: true };
    } catch (e: any) {
      console.error('Error updating song tracking:', e.message || e);
      showError('Failed to update song tracking');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  const removeSongTracking = async (id: number) => {
    isLoading.value = true;
    try {
      await deleteSongTrackingService(id);
      showSuccess('Song tracking deleted successfully');
      await fetchSongTrackings();
    } catch (e: any) {
      console.error('Error deleting song tracking:', e.message || e);
      showError('Failed to delete song tracking');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    songTrackings,
    isLoading,
    fetchSongTrackings,
    addSongTracking,
    updateSongTracking,
    removeSongTracking
  };
}
