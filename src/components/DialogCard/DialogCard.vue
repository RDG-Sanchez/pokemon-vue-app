<script setup>
import { ref } from "vue";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const isVisible = ref(false);
</script>

<template>
  <Button
    icon="pi pi-eye"
    severity="secondary"
    @click="isVisible = true"
    rounded
  />

  <Dialog
    v-model:visible="isVisible"
    modal
    :header="pokemon.name"
    class="w-80"
  >
    <img :src="pokemon.sprite" width="75" :alt="pokemon.name" />
  </Dialog>
</template>
