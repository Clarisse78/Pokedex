<template>
  <table class="stats-table">
    <thead>
      <tr>
        <th>Stats</th>
        <th>Values</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="stat in stats" :key="stat.stat.name">
        <td>{{ capitalize(stat.stat.name) }}</td>
        <td>{{ stat.base_stat }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'
import capitalize from '@/utils/utils'

defineProps({
  stats: Array
})
</script>

<style scoped>
/* Stats */
.stats-table {
  width: 60%;
  border-collapse: collapse;
  margin-top: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.stats-table td, .stats-table th {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}
</style>