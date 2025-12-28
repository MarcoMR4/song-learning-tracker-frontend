<template>
  <q-card flat bordered class="q-my-md bg-primary text-white flex flex-center justify-center items-center">
    <div class="column items-center justify-center full-width">
      <span class="material-icons text-h4 q-mb-xs" aria-hidden="true">account_circle</span>
      <div class="text-body2 ellipsis">
        <span v-if="userName">{{ userName }}</span>
        <span v-else>Current user</span>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">

const userName = ref('');

onMounted(async () => {
	const supabase = useSupabaseClient();
	const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
	if (user) {
		userName.value = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'User';
	}
});

</script>