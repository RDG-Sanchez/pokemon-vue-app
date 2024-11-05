<script setup>
// * VUE
import { onMounted, ref } from "vue";

// * Utils
import { getPokemons, getMorePokemons } from "./utils";

//* Components
import Modal from "../Modal/Modal.vue";

const isLoading = ref(false);

const pokemons = ref({ next: "", results: [] });

const getMore = () => {
  getMorePokemons(isLoading, pokemons);
};

onMounted(() => {
  getPokemons(isLoading, pokemons);
});
</script>

<template>
  <DataTable
    class="h-full"
    :value="pokemons.results"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :loading="isLoading"
    size="small"
    paginator
    rowHover
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between py-2 px-4">
        <span class="text-xl font-bold">Lista de Pókemon</span>
        <Button
          @click="getMore"
          label="Cargar más datos"
          severity="secondary"
          title="Cargar más datos"
          icon="pi pi-refresh"
          rounded
          :loading="isLoading"
        />
      </div>
    </template>
    <Column class="w-1/4 px-8" field="id" header="ID"></Column>
    <Column class="w-1/4 px-8" field="name" header="Nombre"></Column>
    <Column class="w-1/4 px-8" field="type" header="Tipo">
      <template #body="{ data }">
        <Tag :class="data.type.class">{{ data.type.name }}</Tag>
      </template>
    </Column>
    <Column class="w-1/4 px-8" header="Acciones">
      <template #body="{ data }">
        <Modal :pokemon="data" />
      </template>
    </Column>
    <template #footer>
      <p class="text-center py-2">
        Hay un total de
        {{ pokemons.results.length ? pokemons.results.length : 0 }} Pókemon.
      </p>
    </template>
  </DataTable>
</template>

<style scoped></style>
