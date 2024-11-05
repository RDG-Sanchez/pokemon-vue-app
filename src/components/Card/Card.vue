<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="card w-full flex flex-col items-center">
    <img :src="pokemon.sprite" width="75" :alt="pokemon.name" />
    <div class="w-full flex flex-col items-center gap-y-4">
      <Tag :class="pokemon.type.class">{{ pokemon.type.name }}</Tag>
      <ul class="grid grid-cols-2 grid-rows-2 gap-2">
        <li title="Vida">
          <Tag severity="secondary">💖 {{ pokemon.stats.hp }}</Tag>
        </li>
        <li title="Velocidad">
          <Tag severity="secondary">🐌 {{ pokemon.stats.speed }}</Tag>
        </li>
        <li title="Ataque">
          <Tag severity="secondary">🤺 {{ pokemon.stats.attack }}</Tag>
        </li>
        <li title="Defensa">
          <Tag severity="secondary">🛡️ {{ pokemon.stats.defense }}</Tag>
        </li>
      </ul>
    </div>
  </article>
</template>

<style lang="postcss" scoped></style>
