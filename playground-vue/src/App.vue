<script setup lang="ts">
</script>

<template>
    <div class="main-wrapper">
        <div class="menu">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/plugins/hotline">Leaflet.hotline</RouterLink>
        </div>
        <div class="map-wrapper">
            <RouterView />
        </div>
    </div>
</template>

<style>
.main-wrapper {
    display: flex;
}

.menu {
    display: flex;
    flex-direction: column;
}

.menu a {
    padding: 0.25rem 0.5rem;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
}

.menu .router-link-exact-active {
    background-color: lightgray;
}

.map-wrapper {
    height: 75vh;
    width: 100%;
}
</style>
