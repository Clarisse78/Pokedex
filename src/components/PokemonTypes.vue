<template>
  <div class="types">
    <div
      v-for="type in types"
      :key="type.type.name"
      :style="getTypeColor(type.type.name)"
      class="type"
    >
      {{ type.type.name }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import getTypeColor from '@/utils/colors'

defineProps({
  types: Array
})
</script>

<style scoped>
/* Pokemon types */
.type {
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
  font-weight: bold;
}
.types {
  display: grid;
  width: fit-content;
  grid-template-columns: repeat(2, 0fr);
}
</style>