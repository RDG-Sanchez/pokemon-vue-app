<template>
  <div class="card">
    <Menubar class="dark:border-none border py-4" :model="items">
      <template #start>
        <h1 aria-label="PokeAPP" class="font-bold text-2xl">PokeAPP</h1>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar
            image="/public/profile.webp"
            shape="circle"
            aria-label="Foto de RDG-Sanchez"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
// * VUE
import { ref } from "vue";

const items = ref([]);
</script>
