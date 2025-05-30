<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// For navigation and menu toggle
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="dark-mode">
  <header>
    <div  class="main">
      <div class="nav">
        <div class="brand">
          <img alt="Vue logo" class="logo" src="@/assets/pokedex.png" width="200" height="125" />
        </div>

          <button class="burger" @click="toggleMenu" aria-label="Toggle menu">
            ☰
          </button>
          <nav :class="['menu', { open: isMenuOpen }]">
            <RouterLink class="btn" to="/">Home</RouterLink>
            <RouterLink class="btn" to="/about">About</RouterLink>
            <RouterLink class="btn" to="/pokedex">Pokedex</RouterLink>
          </nav>
      </div>
    </div>
  </header>

  <RouterView />
</div>
</template>

<style scoped>
.main {
    padding: 21px;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
      flex-wrap: wrap;
}

.menu .btn {
    background-color: #4a4e53;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}

.menu a {
    text-decoration: none;
    color: white;
}

.burger {
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  display: none;
}

/* Responsive styles */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .menu {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 15px;
  }

  .menu.open {
    display: flex;
  }
  .menu .btn {
    justify-content: center;
    display: flex;
  }
}
@media (min-width: 769px) {
  .nav .menu {
    margin-left: auto;
    display: flex;
    gap: 20px;
  }
}

</style>
