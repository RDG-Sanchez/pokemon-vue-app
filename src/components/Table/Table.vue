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
  <DataTable
    :value="pokemons"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    v-else
    paginator
    size="small"
  >
    <Column class="w-1/4" field="id" header="ID"></Column>
    <Column class="w-1/4" field="name" header="Nombre"></Column>
    <Column class="w-1/4" field="type" header="Tipo">
      <template #body="{ data }">
        <Tag :style="colorsDistionary(data.type)">{{
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
