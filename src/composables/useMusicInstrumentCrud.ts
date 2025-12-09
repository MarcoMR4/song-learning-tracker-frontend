import { useQuasarUi } from '@/composables/useQuasarUi';
import { 
  getMusicInstruments, 
  createMusicInstrument, 
  updateMusicInstrument as updateInstrumentService, 
  deleteMusicInstrument as deleteInstrumentService 
} from '@/services/supabase/musicInstrumentService';

export function useMusicInstrumentCrud() {
  const { 
    showError, 
    showSuccess 
  } = useQuasarUi();
  const instruments = ref<any[]>([]);
  const isLoading = ref(false);

  const fetchInstruments = async () => {
    isLoading.value = true;
    try {
      const data = await getMusicInstruments();
      instruments.value = data || [];
    } catch (error) {
      console.error('Error fetching instruments:', error);
      showError('Failed to fetch instruments');
    } finally {
      isLoading.value = false;
    }
  };

  const addInstrument = async (instrumentData: any) => {
    isLoading.value = true;
    try {
      await createMusicInstrument(instrumentData);
      showSuccess('Instrument created successfully');
      await fetchInstruments();
      return { success: true };
    } catch (e: any) {
      console.error('Error creating instrument:', e.message || e);
      showError('Unexpected error has occurred.');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  const updateInstrument = async (id: number, instrumentData: any) => {
    isLoading.value = true;
    try {
      await updateInstrumentService(id, instrumentData);
      showSuccess('Instrument updated successfully');
      await fetchInstruments();
      return { success: true };
    } catch (e: any) {
      console.error('Error updating instrument:', e.message || e);
      showError('Failed to update instrument');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  const removeInstrument = async (id: number) => {
    isLoading.value = true;
    try {
      await deleteInstrumentService(id);
      showSuccess('Instrument deleted successfully');
      await fetchInstruments();
      return { success: true };
    } catch (e: any) {
      console.error('Error deleting instrument:', e.message || e);
      showError('Failed to delete instrument');
      return { success: false, error: e };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    instruments,
    isLoading,
    fetchInstruments,
    addInstrument,
    updateInstrument,
    removeInstrument
  };
}
