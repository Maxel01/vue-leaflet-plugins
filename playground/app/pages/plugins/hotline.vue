<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LHotline } from '@maxel01/vue-leaflet-plugins'

const weight = ref(5)
const outlineWidth = ref(1)
const min = ref(150)
const max = ref(350)

const outlineColor = ref('#000000')
const colors = reactive({
    color1: '#008800',
    color2: '#ffff00',
    color3: '#ff0000'
})
const palette = computed(() => ({
    0.0: colors.color1,
    0.5: colors.color2,
    1.0: colors.color3
}))
const smoothFactor = ref(1)
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
            :min="min"
            :max="max"
            :weight="weight"
            :outlineWidth="outlineWidth"
            :outlineColor="outlineColor"
            :palette="palette"
            :smoothFactor="smoothFactor"
        />
    </LMap>
    <aside>
        <label>
            <span>Weight - </span>
            1 <input v-model="weight" type="range" min="1" max="16" /> 16
        </label>
        <br />
        <label>
            <span>Outline width - </span>
            0 <input v-model="outlineWidth" type="range" min="0" max="8" /> 8
        </label>
        <label>
            <span>Outline color</span>
            <input v-model="outlineColor" type="color" />
        </label>
        <br />
        <label>
            <span>Min - </span>
            100 <input v-model="min" type="range" min="100" max="250" step="5" /> 250
        </label>
        <label>
            <span>Max - </span>
            250 <input v-model="max" type="range" min="250" max="500" step="5" /> 500
        </label>
        <p class="muted">
            The range of the z values is around 150 to 350. All values below the minimum get
            displayed in the start color of the palette, all values above 350 get displayed in the
            end color of the palette. All values in between get displayed in the color of the
            gradient (as defined by the palette) picked at their relative position.
        </p>
        <label>
            <span>Palette color 1</span>
            <input v-model="colors.color1" type="color" />
        </label>
        <label>
            <span>Palette color 2</span>
            <input v-model="colors.color2" type="color" />
        </label>
        <label>
            <span>Palette color 3</span>
            <input v-model="colors.color3" type="color" />
        </label>
        <label>
            <span>Smooth factor - </span>
            0 <input type="range" v-model="smoothFactor" min="0" max="10" /> 10
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

input[type='color'] {
    margin-left: 0.5em;
}

.muted {
    color: #666;
    font-size: 0.8em;
}
</style>
