<script setup lang="ts">

</script>

<template>
  <nav class="navbar">
    <RouterLink class="btn btn-outline-primary" to="/connections">Connections</RouterLink>
    <RouterLink class="btn btn-outline-primary" to="/notify">Notify</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  margin-top: 10vh;
  display: flex;
  justify-content: center;
}

nav > a {
  font-size: 20px;
  margin: 5px;
}
</style>
