import { 
    createItem,
    fetchAll, 
    fetchById, 
    updateItem, 
    deleteItem 
} from './baseService'

const TABLE = 'music_instrument'

export const getMusicInstruments = () => fetchAll(TABLE);

export const getMusicInstrument = (id: number) => fetchById(TABLE, id);

export const createMusicInstrument = (musicInstrument: any) => createItem(TABLE, musicInstrument);

export const updateMusicInstrument = (id: number, musicInstrument: any) => updateItem(TABLE, id, musicInstrument);

export const deleteMusicInstrument = (id: number) => deleteItem(TABLE, id);