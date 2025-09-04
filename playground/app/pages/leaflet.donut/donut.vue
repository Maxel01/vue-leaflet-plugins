<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LDonut } from '@maxel01/vue-leaflet-plugins'
</script>

<template>
    <LMap :zoom="12" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LDonut :lat-lng="[47.41322, -1.219482]" :radius="2000" :inner-radius="500" />
    </LMap>
</template>
