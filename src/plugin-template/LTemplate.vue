<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection, assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'
import { setupTemplate, type TemplateProps, templatePropsDefaults } from '@/plugin-template/template'
import { Template} from 'your-leaflet-class'
/**
 * > A Leaflet plugin for ...
 * @demo template {13-22}
 */
defineOptions({name: 'Your-Component'})
const props = withDefaults(defineProps<TemplateProps>(), templatePropsDefaults)
const emit = defineEmits<TemplateProps>()

const { ready, leafletObject } = useTemplate()
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

function useTemplate() {
    const leafletObject = ref<Template>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupTemplate(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Template>(new Template(..., options))

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
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LTemplate`.
        -->
        <slot />
    </div>
</template>
