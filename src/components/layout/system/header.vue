<template>
  <q-header 
    reveal 
    elevated 
    fixed
    class="text-white bg-primary"
    :class="$q.screen.lt.md ? 'q-py-sm' : 'q-py-sm'"
  >
    <q-toolbar class="items-center no-wrap q-gutter-sm">
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleDrawer" />

      <div>
        <client-only>
          <img 
            src="/images/logo1.webp"
            :style="$q.screen.lt.md ? 'max-height: 30px' : 'max-height: 60px'"
            alt="Logo"
          />
        </client-only>
      </div>

      <q-space />
      
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">    

const drawerStore = useDrawerStore(); 

const toggleDrawer = () => {
  drawerStore.toggleDrawer();
};

</script>