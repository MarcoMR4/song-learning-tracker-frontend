import { 
    createItem,
    fetchAll, 
    fetchById, 
    updateItem, 
    deleteItem 
} from './baseService'

const TABLE = 'song'

export const getSongs = () => fetchAll(TABLE);

export const getSong = (id: number) => fetchById(TABLE, id);

export const createSong = (song: any) => createItem(TABLE, song);

export const updateSong = (id: number, song: any) => updateItem(TABLE, id, song);

export const deleteSong = (id: number) => deleteItem(TABLE, id);
