<script setup lang="ts">
</script>

<template>
    <div class="main-wrapper">
        <div class="menu">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/leaflet.donut">Leaflet.Donut</NuxtLink>
            <NuxtLink to="/leaflet.donut/donut">LDonut</NuxtLink>
            <NuxtLink to="/leaflet.heat">Leaflet.Heat</NuxtLink>
            <NuxtLink to="/leaflet.heat/heat-layer">LHeatLayer</NuxtLink>
            <NuxtLink to="/leaflet.hotline">Leaflet.Hotline</NuxtLink>
            <NuxtLink to="/leaflet.hotline/hotline">LHotline</NuxtLink>
            <NuxtLink to="/leaflet.markercluster">Leaflet.MarkerCluster</NuxtLink>
            <NuxtLink to="/leaflet.markercluster/marker-cluster-group">LMarkerClusterGroup</NuxtLink>
            <NuxtLink to="/leaflet.rotatedmarker">Leaflet.RotatedMarker</NuxtLink>
            <NuxtLink to="/leaflet.rotatedmarker/rotated-marker">LRotatedMarker</NuxtLink>
        </div>
        <div class="map-wrapper">
            <NuxtPage />
        </div>
    </div>
</template>

<style scoped>
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
