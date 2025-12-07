<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection, assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'
import {
    type DonutEmits,
    type DonutProps,
    donutPropsDefaults,
    setupDonut
} from '@/leaflet.donut/donut'

import { Donut } from '@/libs/leaflet.donut/leaflet.donut'

/**
 * > A Leaflet plugin for drawing donuts.
 * @demo donut {3,13}
 */
defineOptions({ name: 'LDonut' })
const props = withDefaults(defineProps<DonutProps>(), donutPropsDefaults)
const emit = defineEmits<DonutEmits>()

const { ready, leafletObject } = useDonut()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Donut \| undefined>}
     */
    leafletObject
})

function useDonut() {
    const leafletObject = ref<Donut>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupDonut(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Donut>(new Donut(props.latLng, options))

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
