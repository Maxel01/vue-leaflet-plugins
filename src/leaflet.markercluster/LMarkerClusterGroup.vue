<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection, assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'
import {
    setupMarkerClusterGroup,
    type MarkerClusterGroupProps,
    markerClusterGroupPropsDefaults,
    type MarkerClusterGroupEmits
} from './markerClusterGroup'
import { preparePolyfill } from '@/utils/polyfill'

import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

/**
 * > Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 * @demo marker-cluster-group {7-21,31-37}
 */
defineOptions({})
const props = withDefaults(defineProps<MarkerClusterGroupProps>(), markerClusterGroupPropsDefaults)
const emit = defineEmits<MarkerClusterGroupEmits>()

const { ready, leafletObject } = useMarkerClusterGroup()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<MarkerClusterGroup \| undefined>}
     */
    leafletObject
})

function useMarkerClusterGroup() {
    const leafletObject = ref<MarkerClusterGroup>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)
    const attrs = useAttrs()

    const { options, methods } = setupMarkerClusterGroup(props, leafletObject, emit)

    onMounted(async () => {
        preparePolyfill()
        await import('leaflet.markercluster')
        leafletObject.value = markRaw(new L.MarkerClusterGroup(options))

        const { listeners } = remapEvents(attrs)
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
        @slot ?
        -->
        <slot />
    </div>
</template>
