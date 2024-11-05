<script setup>
// * Components
import Card from "../Card/Card.vue";

// * VUE
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
    aria-label="Ver más detalles"
    icon="pi pi-eye"
    severity="secondary"
    @click="isVisible = true"
    rounded
  />
  <Dialog v-model:visible="isVisible" modal :header="pokemon.name" class="w-80">
    <Card :pokemon="pokemon" />
  </Dialog>
</template>
