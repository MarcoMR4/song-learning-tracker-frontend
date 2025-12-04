import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: true, 
  }),
  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  }
});