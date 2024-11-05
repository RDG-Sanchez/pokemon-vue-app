<template>
  <div class="card">
    <Menubar class="dark:border-none border py-4" :model="items">
      <template #start>
        <h1 aria-label="PokeAPP" class="font-bold text-2xl">PokeAPP</h1>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar
            image="https://avatars.githubusercontent.com/u/128014396?v=4"
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
