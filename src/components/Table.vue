<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const isLoading = ref(false);
const pokemons = ref([]);

const getPokemons = async () => {
  isLoading.value = true;
  try {
    const {
      data: { results },
    } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");

    const promises = await results.map(async ({ url }) => {
      const { data } = await axios.get(url);
      return {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        sprite: data.sprites.front_default,
      };
    });

    pokemons.value = await Promise.all(promises);
    isLoading.value = false;
  } catch (error) {
    alert("Ha ocurrido un error");
  }
};

const handleData = (data) => {
  console.log(data);
};

onMounted(() => {
  getPokemons();
});
</script>

<template>
  <span v-if="isLoading === true">Cargando...</span>
  <DataTable
    v-else
    :value="pokemons"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 15, 20, 25]"
  >
    <Column field="id" header="ID" style="width: 25%"></Column>
    <Column field="name" header="Nombre" style="width: 25%"></Column>
    <Column field="type" header="Tipo" style="width: 25%"></Column>
    <Column header="Acciones" style="width: 25%">
      <template #body="{ data }">
        <Button
          icon="pi pi-eye"
          @click="handleData(data)"
          severity="secondary"
          rounded
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
