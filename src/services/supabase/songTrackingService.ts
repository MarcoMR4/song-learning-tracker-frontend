import { 
    createItem,
    fetchAll, 
    fetchById, 
    updateItem, 
    deleteItem 
} from './baseService'

const TABLE = 'song_tracking'

const TRACKING_SELECT = `
  id,
  status,
  created_at,
  song (
    id,
    title
  ),
  instrument (
    id,
    name
  )
`

export const getSongTrackings = () => fetchAll(TABLE, { select: TRACKING_SELECT });

export const getSongTracking = (id: number) => fetchById(TABLE, id, { select: TRACKING_SELECT });

export const createSongTracking = (tracking: any) => createItem(TABLE, tracking);

export const updateSongTracking = (id: number, tracking: any) => updateItem(TABLE, id, tracking);

export const deleteSongTracking = (id: number) => deleteItem(TABLE, id);
