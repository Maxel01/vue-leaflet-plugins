<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection, assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'
import { RotatedMarker } from '@/libs/leaflet.rotatedmarker/leaflet.rotatedMarker'
import {
    type RotatedMarkerEmits,
    type RotatedMarkerProps,
    rotatedMarkerPropsDefaults,
    setupRotatedMarker
} from './rotatedMarker'

/**
 * > Leaflet plugin to enable the rotation of map marker icons
 * @demo rotated-marker {13-17}
 */
defineOptions({ name: 'LRotatedMarker' })
const props = withDefaults(defineProps<RotatedMarkerProps>(), rotatedMarkerPropsDefaults)
const emit = defineEmits<RotatedMarkerEmits>()

const { ready, leafletObject } = useRotatedMarker()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Hotline \| undefined>}
     */
    leafletObject
})

function useRotatedMarker() {
    const leafletObject = ref<RotatedMarker>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupRotatedMarker(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<RotatedMarker>(new RotatedMarker(props.latLng, options))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)

        propsBinder(methods, leafletObject.value, props)

        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { leafletObject, ready }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <!--
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LDonut`.
        -->
        <slot />
    </div>
</template>
