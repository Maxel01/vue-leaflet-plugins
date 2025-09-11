import type { Ref } from 'vue'
import {
    type LayerEmits,
    type LayerProps,
    layerPropsDefaults,
    propsToLeafletOptions,
    setupLayer
} from '@maxel01/vue-leaflet'
import type { HeatLayer, HeatLayerOptions } from '@/libs/leaflet.heat/leaflet.heat.ts'
import type { LatLng } from 'leaflet'

export interface HeatLayerProps extends LayerProps {
    /**
     * LatLngs of the heat map
     * @reactive
     */
    latLngs: LatLng[]
    /**
     * the minimum opacity the heat will start at
     * @reactive
     */
    minOpacity: number
    /**
     * zoom level where the points reach maximum intensity (as intensity scales with zoom), equals `maxZoom` of the map by default
     * @reactive
     */
    maxZoom: number
    /**
     * radius of each "point" of the heatmap, `25` by default
     * @reactive
     */
    radius: number
    /**
     * amount of blur, `15` by default
     * @reactive
     */
    blur: number
    /**
     * maximum point intensity, `1.0` by default
     * @reactive
     */
    max: number
    /**
     *  color gradient config, e.g. `{0.4: 'blue', 0.65: 'lime', 1: 'red'}`
     * @reactive
     */
    gradient
}

export const heatLayerPropsDefaults = {
    ...layerPropsDefaults
}

export interface HeatLayerEmits extends LayerEmits {
    (event: 'ready', heatLayer: HeatLayer): void
}

export const setupHeatLayer = (
    props: HeatLayerProps,
    leafletRef: Ref<HeatLayer | undefined>,
    emit: HeatLayerEmits
) => {
    const { options: layerOptions, methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<HeatLayerOptions>(props, layerOptions)

    const methods = {
        ...layerMethods,
        setMinOpacity: (minOpacity: number) => {
            leafletRef.value?.setOptions({ minOpacity })
        },
        setMaxZoom: (maxZoom: number) => {
            leafletRef.value?.setOptions({ maxZoom })
        },
        setRadius: (radius: number) => {
            leafletRef.value?.setOptions({ radius })
        },
        setBlur: (blur: number) => {
            leafletRef.value?.setOptions({ blur })
        },
        setMax: (max: number) => {
            leafletRef.value?.setOptions({ max })
        },
        setGradient: (gradient) => {
            leafletRef.value?.setOptions({ gradient })
        }
    }

    return { options, methods }
}
