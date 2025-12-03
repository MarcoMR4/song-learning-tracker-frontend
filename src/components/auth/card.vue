<!-- components/auth/card.vue -->
<template>
  <div class="container bg-primary q-pa-none">
    <q-card class="my-card q-pa-none col-12 col-sm-8 col-md-6 col-lg-4">

      <q-card-section class="row justify-center q-mb-sm q-pa-md">
        <q-img src="/images/logo1.webp" width="150px" />
      </q-card-section>

      <q-card-section class="justify-center q-px-lg">
        <slot name="form" />
      </q-card-section>

      <q-separator class="q-my-sm full-width" />

      <q-card-section class="justify-center q-px-lg q-mb-md">
        <slot name="footer" />
      </q-card-section>

    </q-card>
  </div>
</template>
