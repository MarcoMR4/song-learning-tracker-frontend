<template>
  <client-only>
    <q-drawer
      :model-value="drawerStore.drawerOpen"
      @update:model-value="updateDrawerOpen"
      show-if-above
      persistent
      :width="220"
      :breakpoint="400"
      class="text-white bg-primary"
      side="left"
      elevated
    >
      <AccountNameItem />

      <q-separator color="white" style="height: 1px" />
      
      <q-list class="p-mt-lg">
        <q-item
          class="q-item-label clickable"
          active-class="q-item-active"
          to="/"
        >
          <q-item-section avatar>
            <span class="material-icons text-h5">home</span>
          </q-item-section>
          <q-item-section> Home </q-item-section>
        </q-item>

        <q-item
          class="q-item-label clickable"
          active-class="q-item-active"
          to="/dashboard"
        >
          <q-item-section avatar>
            <span class="material-icons text-h5">bar_chart</span>
          </q-item-section>
          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <q-item
          class="q-item-label clickable"
          active-class="q-item-active"
          to="/song-learning-tracking"
        >
          <q-item-section avatar>
            <span class="material-icons text-h5">moving</span>
          </q-item-section>
          <q-item-section> Song Learning Tracking </q-item-section>
        </q-item>

        <q-item
          class="q-item-label clickable"
          active-class="q-item-active"
          to="/my-songs"
        >
          <q-item-section avatar>
            <span class="material-icons text-h5">library_music</span>
          </q-item-section>
          <q-item-section> My Songs to Learn </q-item-section>
        </q-item>

        <q-item
          class="q-item-label clickable"
          active-class="q-item-active"
          to="/my-music-instruments"
        >
          <q-item-section avatar>
            <span class="material-icons text-h5">piano</span>
          </q-item-section>
          <q-item-section> My Music Instruments </q-item-section>
        </q-item>

        <q-separator color="white" style="height: 1px" />

        <q-item clickable @click="logoutUser">
          <q-item-section avatar>
            <span class="material-icons text-h5">logout</span>
          </q-item-section>
          <q-item-section> Logout </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </client-only>
</template>

<script setup lang="ts">
import AccountNameItem from '@/components/shared/accountNameItem.vue';
const drawerStore = useDrawerStore();

const { logout } = useAuth();

const { confirmAction, showError, showSuccess } = useQuasarUi();

const updateDrawerOpen = (val: boolean) => {
  drawerStore.toggleDrawer();
};

const logoutUser = () => {
  handleLogoutConfirm();
};

const handleLogoutConfirm = () => {
  confirmAction("Logout", "Are you sure you want to logout?").onOk(async () => {
    try {
      await handleConfirmedLogout();
    } catch (err: any) {
      showError(err.message);
    }
  });
};

const handleConfirmedLogout = async () => {
  await logout();
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
.q-item-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.no-underline {
  text-decoration: none;
}
.custom-select {
  background-color: #7139bb;
  color: white;
  font-size: 10px;
}
</style>
