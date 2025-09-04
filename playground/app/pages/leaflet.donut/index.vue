<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LDonut } from '@maxel01/vue-leaflet-plugins'
import { ref } from 'vue'

const radius = ref(2000)
const innerRadius = ref(500)
const innerRadiusPercent = ref(0.5)
const innerRadiusAsPercent = ref(false)
</script>

<template>
    <LMap :zoom="12" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LDonut
            :lat-lng="[47.41322, -1.219482]"
            :radius="radius"
            :inner-radius="innerRadiusAsPercent ? innerRadiusPercent : innerRadius"
            :inner-radius-as-percent="innerRadiusAsPercent"
        />
    </LMap>
    <aside>
        <label>
            <span>Radius - </span>
            500 <input v-model.number="radius" type="range" min="500" max="3500" /> 3500
        </label>
        <br />
        <label>
            <span>Inner Radius - </span>
            0
            <input
                v-model.number="innerRadius"
                type="range"
                min="0"
                max="1000"
                :disabled="innerRadiusAsPercent"
            />
            1000
        </label>
        <br />
        <label>
            <span>Inner Radius as Percent - </span>
            <input v-model.boolean="innerRadiusAsPercent" type="checkbox" />
        </label>
        <br />
        <label>
            <span>Inner Radius in % - </span>
            0
            <input
                v-model.number="innerRadiusPercent"
                type="range"
                min="0"
                max="1"
                step="0.02"
                :disabled="!innerRadiusAsPercent"
            />
            100
        </label>
    </aside>
</template>

<style>
aside {
    max-width: 600px;
    text-align: center;
    margin: auto;
}

label {
    display: inline-block;
    padding: 0.5em;
}

input {
    vertical-align: text-bottom;
}
</style>
