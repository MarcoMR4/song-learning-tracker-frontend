<template>
  <client-only>
    <q-drawer
      :model-value="drawerOpen"
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

      <!-- Siempre visibles -->
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

      <q-separator color="white" style="height: 1.1px;" /> 
    
      <q-item clickable @click="logout">
        <q-item-section avatar>
          <q-icon name="mdi-logout" />
        </q-item-section>
        <q-item-section> Logout </q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

  </client-only>
</template>
  
<script setup lang="ts">

  import { Dialog } from 'quasar'

  const drawerOpen = ref(true);

  const updateDrawerOpen = (val: boolean) => {
    drawerOpen.value = val
  }

  const logout = () => {
    showLogoutDialog();
  }

  const showLogoutDialog = () => {
    Dialog.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
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

  const supabaseAuth = useSupabaseClient().auth;

  const handleLogout = async () => {
    const { error } = await supabaseAuth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      alert('Logout failed: ' + error.message);
    } 
    else {
      console.log('Logout successful');
      navigateTo('/');
    }
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