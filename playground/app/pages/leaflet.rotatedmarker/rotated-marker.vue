<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LRotatedMarker } from '@maxel01/vue-leaflet-plugins'
</script>

<template>
    <LMap :zoom="9" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LRotatedMarker
            :latLng="[47.41322, -1.219482]"
            :rotation-angle="45"
            draggable
        />
    </LMap>
</template>
