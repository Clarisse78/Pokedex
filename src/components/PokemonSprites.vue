<script setup>
import { ref } from 'vue'

// Define the props for the sprite carousel component
const props = defineProps({
    sprites: {
    type: Array,
    required: true
  }
})

// Index of the current sprite being displayed
const index = ref(0)

// Go to the previous sprite
const prev = () => {
    if (index.value > 0)
    {
        index.value -= 1;
    }
    else
    {
        index.value = props.sprites.length - 1;
    }
}

// Go to the next sprite
const next = () => {
    if (index.value + 1 >= props.sprites.length)
    {
        index.value = 0;
    }
    else
    {
        index.value += 1;
    }
}
</script>

<template>
  <div class="sprite-carousel">
    <img 
      v-if="props.sprites.length" 
      :src="props.sprites[index]" 
      alt="pokemon sprite" 
      class="sprite-image"
    />
    <div v-else>
      No pictures available
    </div>

    <div class="buttons">
      <button @click.stop="prev">◀</button>
      <button @click.stop="next">▶</button>
    </div>
  </div>
</template>

<style scoped>
/* Sprites */
.sprite-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sprite-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 8px;
}
</style>