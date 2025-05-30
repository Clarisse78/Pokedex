<template>
  <img v-if="src" class="img-pokemon" :src="src" :alt="alt ?? 'Pokemon sprite'" />
  <div v-else class="img-placeholder">Picture not available</div>
</template>

<script setup>
defineProps({
  src: String,
  alt: String
});
</script>

<style scoped>
/* Pokemon sprite */
.img-pokemon {
  height: 350px;
  object-fit: contain;
  margin-bottom: 8px;
}
.img-placeholder {
  height: 350px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-style: italic;
}
</style>