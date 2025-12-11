import { 
    createItem,
    fetchAll, 
    fetchById, 
    updateItem, 
    deleteItem 
} from './baseService'

const TABLE = 'song_tracking'

export const getSongTrackings = () => fetchAll(TABLE);

export const getSongTracking = (id: number) => fetchById(TABLE, id);

export const createSongTracking = (tracking: any) => createItem(TABLE, tracking);

export const updateSongTracking = (id: number, tracking: any) => updateItem(TABLE, id, tracking);

export const deleteSongTracking = (id: number) => deleteItem(TABLE, id);
