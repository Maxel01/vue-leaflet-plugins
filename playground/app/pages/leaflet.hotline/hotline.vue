<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LHotline } from '@maxel01/vue-leaflet-plugins'
</script>

<template>
    <LMap :zoom="9" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LHotline
            :lat-lngs="[
                [47.334852, -1.509485, 150],
                [47.342596, -1.328731, 250],
                [47.241487, -1.190568, 350],
                [47.234787, -1.358337, 250]
            ]"
            :min="150"
            :max="350"
        />
    </LMap>
</template>
