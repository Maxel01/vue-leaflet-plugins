<script setup lang="ts">
import { ref, computed } from 'vue'
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LRotatedMarker } from '@maxel01/vue-leaflet-plugins'

const rotationAngle = ref<number>(45)
const rotationOriginX = ref<number>(12.5)
const rotationOriginY = ref<number>(41)

const originText = ref<string>('')
const isValid = computed(() => {
    return /^(\d+px|\d+%|top|bottom|left|right|center)(\s+(\d+px|\d+%|top|bottom|left|right|center))?$/.test(
        originText.value.trim()
    )
})

const rotationOrigin = computed(() =>
    isValid.value ? originText.value : `${rotationOriginX.value}px ${rotationOriginY.value}px 0px`
)
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
            :rotation-angle="rotationAngle"
            :rotation-origin="rotationOrigin"
            draggable
        />
    </LMap>
    <aside>
        <label>
            <span>Rotation Angle - </span>
            0° <input v-model.number="rotationAngle" type="range" min="0" max="360" /> 360°
        </label>
        <br />
        <label>
            <span>Rotation Origin X - </span>
            0 <input v-model.number="rotationOriginX" type="range" min="0" max="25" /> 25
        </label>
        <label>
            <span>Rotation Origin Y - </span>
            0 <input v-model.number="rotationOriginY" type="range" min="" max="41" /> 41
        </label>
        <div class="separator">
            <hr />
            <span class="label">or use text input (clear to use sliders again)</span>
        </div>
        <div class="origin-input">
            <label for="origin">Rotation Origin:</label>
            <input
                id="origin"
                v-model="originText"
                :class="{ valid: isValid, invalid: originText && !isValid }"
                placeholder="e.g. 50% 50% or top left"
            />
            <span v-if="originText">
                <span v-if="isValid" class="feedback valid"> ✅ valid</span>
                <span v-else class="feedback invalid"> ❌ invalid</span>
            </span>
        </div>
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

input.valid {
    border-color: green;
}
input.invalid {
    border-color: red;
}
.feedback {
    margin-top: 0.5em;
    font-weight: bold;
}
.feedback.valid {
    color: green;
}

.feedback.invalid {
    color: red;
}

.separator {
    position: relative;
    text-align: center;
    padding: 1em 0;
}

.separator .label {
    position: absolute;
    top: 0.9em;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: #666;
    padding: 0 0.5em;
}
</style>
