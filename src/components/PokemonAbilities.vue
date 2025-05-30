<template>
  <div class="abilities">
    <div v-for="ability in abilities" :key="ability.ability.name">
      {{ ability.ability.name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  abilities: Array
});
</script>

<style scoped>
.abilities {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>