<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection, assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'
import {
    setupMarkerClusterGroup,
    type MarkerClusterGroupProps,
    markerClusterGroupPropsDefaults,
    type MarkerClusterGroupEmits
} from './markerClusterGroup'
import { prepareMarkerClusterPolyfill } from '@/utils/polyfill'

import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

// Internal leaflet.markercluster members used by the `_moveEnd` animation-state fix below.
interface MarkerClusterAnimationInternals {
    _inZoomAnimation: number
    _processQueue(): void
    _moveEnd(this: MarkerClusterAnimationInternals): void
}

/**
 * > Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 * @demo marker-cluster-group {7-21,31-37}
 */
defineOptions({ name: 'LMarkerClusterGroup' })
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
        prepareMarkerClusterPolyfill()
        await import('leaflet.markercluster')

        const group = new L.MarkerClusterGroup(options) as MarkerClusterGroup & MarkerClusterAnimationInternals
        // Fix a long-standing leaflet.markercluster bug: when a map move lands while a
        // cluster zoom animation is still pending (its cleanup is deferred on a ~300ms
        // queue), `_moveEnd` bails out (`if (this._inZoomAnimation) return;`) and is never
        // retried, so markers in the freshly revealed area are dropped and vanish until the
        // next interaction — the "markers disappear on resize" symptom. Instead of dropping
        // the move, finalise the pending animation synchronously by flushing its queue, then
        // handle the move against a clean, fully settled state.
        // Keep this fix until Leaflet/Leaflet.markercluster#1124 is merged.
        // Refs: Leaflet/Leaflet.markercluster#140, #886, #512, #1056.
        const originalMoveEnd = group._moveEnd
        group._moveEnd = function (this: MarkerClusterAnimationInternals): void {
            if (this._inZoomAnimation) {
                this._processQueue()
            }
            if (this._inZoomAnimation) {
                return // safety guard; should not happen once the queue is flushed
            }
            originalMoveEnd.call(this)
        }
        leafletObject.value = markRaw(group)

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
