<script setup>
import { onMounted, ref } from "vue";

import {
  getPokemons,
  getMorePokemons,
  typesDictionary,
  colorsDistionary,
} from "./utils";

import DialogCard from "../DialogCard/DialogCard.vue";
import Loader from "../Loader/Loader.vue";

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
  <Loader v-if="isLoading === true" />
  <DataTable
    :value="pokemons.results"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    paginator
    size="small"
    v-else="isLoading === false"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between py-2">
        <span class="text-xl font-bold">Lista de Pókemon</span>
        <Button
          @click="getMore"
          label="Cargar más datos"
          severity="secondary"
          title="Cargar más datos"
          icon="pi pi-refresh"
          rounded
          raised
          :loading="isLoading"
        />
      </div>
    </template>
    <Column class="w-1/4" field="id" header="ID"></Column>
    <Column class="w-1/4" field="name" header="Nombre"></Column>
    <Column class="w-1/4" field="type" header="Tipo">
      <template #body="{ data }">
        <Tag :class="colorsDistionary(data.type)">{{
          typesDictionary(data.type)
        }}</Tag>
      </template>
    </Column>
    <Column class="w-1/4" header="Acciones">
      <template #body="{ data }">
        <DialogCard :pokemon="data" />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
