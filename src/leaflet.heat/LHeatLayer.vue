<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection, assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'

import { HeatLayer } from '@/libs/leaflet.heat/leaflet.heat.ts'
import {
    type HeatLayerEmits,
    type HeatLayerProps,
    heatLayerPropsDefaults,
    setupHeatLayer
} from '@/leaflet.heat/heatLayer.ts'

/**
 * > A Leaflet plugin for heatmaps
 * @demo heat {13-22}
 */
defineOptions({})
const props = withDefaults(defineProps<HeatLayerProps>(), heatLayerPropsDefaults)
const emit = defineEmits<HeatLayerEmits>()

const { ready, leafletObject } = useHeatLayer()
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

function useHeatLayer() {
    const leafletObject = ref<HeatLayer>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupHeatLayer(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<HeatLayer>(new HeatLayer(props.latlngs, options))

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
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LHeatLayer`.
        -->
        <slot />
    </div>
</template>
