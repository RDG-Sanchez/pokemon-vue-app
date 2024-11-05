<script setup>
import { onMounted, ref } from "vue";

import { getPokemons, typesDictionary, colorsDistionary } from "./utils";

import DialogCard from "../DialogCard/DialogCard.vue";
import Loader from "../Loader/Loader.vue";

const isLoading = ref(false);

const pokemons = ref([]);

onMounted(() => {
  getPokemons(isLoading, pokemons);
});
</script>

<template>
  <Loader v-if="isLoading === true" />
  <DataTable :value="pokemons" :rows="10" :rowsPerPageOptions="[10, 15, 20, 25]" v-else paginator size="small">
    <Column field="id" header="ID" style="width: 25%"></Column>
    <Column field="name" header="Nombre" style="width: 25%"> </Column>
    <Column field="type" header="Tipo" style="width: 25%">
      <template #body="{ data }">
        <Tag :style="colorsDistionary(data.type)">{{ typesDictionary(data.type) }}</Tag>
      </template>
    </Column>
    <Column header="Acciones" style="width: 25%">
      <template #body="{ data }">
        <DialogCard :pokemon="data" />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>
