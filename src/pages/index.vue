<template>
  <div class="q-pa-sm">
    <div class="text-center q-mb-xl">
      <h2 class="text-primary q-mb-sm">Welcome to Song Learning Tracker</h2>
      <p class="text-subtitle1 text-grey-8">
        Follow these simple steps to start tracking your progress
      </p>
    </div>

    <div class="row q-col-gutter-sm justify-center">
      <!-- Step 1: Instruments -->
      <div class="col-12 col-md-10">
        <q-banner rounded class="bg-grey-2 q-pa-lg">
          <template v-slot:avatar>
            <q-icon name="piano" size="3rem" color="secondary" />
          </template>
          <div class="text-h6 text-secondary q-mb-xs">1. Instruments</div>
          <div class="text-body2">
            First, define the instruments you play. Add your guitars, pianos, or
            any other instrument to your collection.
          </div>
          <template v-slot:action>
            <q-btn
              to="/my-music-instruments"
              color="secondary"
              label="Add Instruments"
              icon="add"
              flat
              rounded
            />
          </template>
        </q-banner>
      </div>

      <!-- Step 2: Songs -->
      <div class="col-12 col-md-10">
        <q-banner rounded class="bg-grey-2 q-pa-lg">
          <template v-slot:avatar>
            <q-icon name="library_music" size="3rem" color="accent" />
          </template>
          <div class="text-h6 text-accent q-mb-xs">2. Songs</div>
          <div class="text-body2">
            Next, build your repertoire. Add the songs you want to learn.
          </div>
          <template v-slot:action>
            <q-btn
              to="/my-songs"
              color="accent"
              label="Add Songs"
              icon="playlist_add"
              flat
              rounded
            />
          </template>
        </q-banner>
      </div>

      <!-- Step 3: Tracking -->
      <div class="col-12 col-md-10">
        <q-banner rounded class="bg-grey-2 q-pa-lg">
          <template v-slot:avatar>
            <q-icon name="moving" size="3rem" color="primary" />
          </template>
          <div class="text-h6 text-primary q-mb-xs">3. Start Tracking</div>
          <div class="text-body2">
            Finally, link a song to an instrument and start tracking your
            learning journey and practice sessions.
          </div>
          <template v-slot:action>
            <q-btn
              to="/song-learning-tracking"
              color="primary"
              label="Start Tracking"
              icon="timeline"
              flat
              rounded
            />
          </template>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "system",
});
</script>
