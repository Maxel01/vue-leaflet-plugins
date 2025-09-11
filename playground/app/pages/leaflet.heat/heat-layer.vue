<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LHeatLayer } from '@maxel01/vue-leaflet-plugins'
import { LatLng } from 'leaflet'
import { coords } from '../../utils/leaflet.hotline/coords'

const latLngs = coords.map((latLng) => new LatLng(latLng))
</script>

<template>
    <LMap :zoom="14" :center="[50.512, 6.997]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LHeatLayer :latLngs="latLngs" :radius="10" />
    </LMap>
</template>
