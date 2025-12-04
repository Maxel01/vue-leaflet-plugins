<script setup lang="ts">
</script>

<template>
    <div class="main-wrapper">
        <div class="menu">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/leaflet.donut">Leaflet.Donut</RouterLink>
            <RouterLink to="/leaflet.donut/donut">LDonut</RouterLink>
            <RouterLink to="/leaflet.heat">Leaflet.Heat</RouterLink>
            <RouterLink to="/leaflet.heat/heat-layer">LHeatLayer</RouterLink>
            <RouterLink to="/leaflet.hotline">Leaflet.Hotline</RouterLink>
            <RouterLink to="/leaflet.hotline/hotline">LHotline</RouterLink>
            <RouterLink to="/leaflet.markercluster">Leaflet.MarkerCluster</RouterLink>
            <RouterLink to="/leaflet.markercluster/marker-cluster-group">LMarkerClusterGroup</RouterLink>
            <RouterLink to="/leaflet.rotatedmarker">Leaflet.RotatedMarker</RouterLink>
            <RouterLink to="/leaflet.rotatedmarker/rotated-marker">LRotatedMarker</RouterLink>
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
