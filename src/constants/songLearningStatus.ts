// src/constants/songLearningStatus.ts

export const SONG_LEARNING_STATUS = [
  { value: 'planned', label: 'Planned', icon: 'event_note' },
  { value: 'learning', label: 'Learning', icon: 'school' },
  { value: 'refining', label: 'Refining', icon: 'build' },
  { value: 'mastered', label: 'Mastered', icon: 'star' },
  { value: 'paused', label: 'Paused', icon: 'pause_circle' },
];

export type SongLearningStatus = typeof SONG_LEARNING_STATUS[number]['value'];
