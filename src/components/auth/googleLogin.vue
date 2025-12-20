<template>
  <q-btn
    no-caps
    class="google-btn full-width q-mt-lg"
    @click="loginWithGoogle"
  >
    <template #default>
      <div class="row items-center justify-center full-width">
        <div class="google-icon-wrapper q-mr-md">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
            alt="Google Logo" 
            class="google-icon"
          />
        </div>
        <span class="text-weight-medium">Sign in with Google</span>
      </div>
    </template>
  </q-btn>
</template>

<script setup lang="ts">


const supabase = useSupabaseClient();
const { showError } = useQuasarUi();

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ 
    provider: 'google'
  });
  if (error) {
    console.error('Error logging in with Google:', error.message);
    showError('An error occurred while logging in with Google. Please try again later.');
  } 
};

</script>

<style scoped>

.google-btn {
  background-color: white !important;
  color: #1f1f1f !important;
  border: 1px solid #747775;
  border-radius: 4px; /* Standard Google border radius, or utilize rounded-borders from Quasar */
  height: 40px;
  transition: background-color .3s, box-shadow .3s;
}

.google-btn:hover {
  background-color: #f7f9fa !important; /* Light gray on hover */
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  border-color: #d2e3fc; /* Often slightly blueish or kept gray */
}

.google-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
}

.google-icon {
  width: 100%;
  height: 100%;
}

</style>
