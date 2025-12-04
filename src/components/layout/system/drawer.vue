<template>
  <client-only>
    <q-drawer
      :model-value="drawerStore.drawerOpen"
      @update:model-value="updateDrawerOpen"
      show-if-above
      persistent
      :width="200"
      :breakpoint="400"
      class="text-white bg-primary"
      side="left"
      elevated
    >
    <q-list class="p-mt-lg">
      <q-item 
        class="q-item-label clickable" 
        active-class="q-item-active"
        to="/"
      >
        <q-item-section avatar>
          <span class="material-icons text-h5">home</span>
        </q-item-section>
        <q-item-section>
           Home
        </q-item-section>
      </q-item>
      <q-item 
        class="q-item-label clickable" 
        active-class="q-item-active"
        to="/protected"
      >
        <q-item-section avatar>
          <span class="material-icons text-h5">person</span>
        </q-item-section>
        <q-item-section>
           Protected Page
        </q-item-section>
      </q-item>

      <q-separator color="white" style="height: 1px;" /> 
    
      <q-item clickable @click="logoutUser">
        <q-item-section avatar>
          <q-icon name="mdi-logoutUser" />
        </q-item-section>
        <q-item-section> Logout </q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

  </client-only>
</template>
  
<script setup lang="ts">

import { Dialog } from 'quasar'
const drawerStore = useDrawerStore(); 
const { logout } = useAuth();


const updateDrawerOpen = (val: boolean) => {
  drawerStore.toggleDrawer(); 
}

const logoutUser = () => {
  showLogoutDialog();
}

const showLogoutDialog = () => {
  Dialog.create({
    title: 'Logout',
    message: 'Are you sure you want to logoutUser?',
    cancel: {
      label: 'Cancel',
      color: 'primary'
    },
    ok: {
      label: 'Logout',
      color: 'negative'
    }
  })
  .onOk(() => handleLogout())
}

const handleLogout = async () => {
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