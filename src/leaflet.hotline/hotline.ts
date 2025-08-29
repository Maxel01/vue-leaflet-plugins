import { type PolylineOptions } from 'leaflet'

import type { Ref } from 'vue'
import { Hotline } from './leaflet.hotline'
import {
    type PolylineEmits,
    type PolylineProps,
    polylinePropsDefaults,
    propsToLeafletOptions,
    setupPolyline
} from '@maxel01/vue-leaflet'

export interface HotlineProps<T extends PolylineOptions = PolylineOptions>
    extends PolylineProps<T> {
    /**
     * Minimum z value
     * @reactive
     */
    min?: number
    /**
     * Maximum z value
     * @reactive
     */
    max?: number
    /**
     * The width of the outline
     * @reactive
     */
    outlineWidth?: number
    /**
     * The color of the outline
     * @reactive
     */
    outlineColor?: string
    /**
     * The color palette
     * @reactive
     */
    palette?: Record<number, string>
}

export const hotlinePropsDefaults = {
    ...polylinePropsDefaults
}

export interface HotlineEmits<T extends Hotline = Hotline> extends PolylineEmits<T> {}

export const setupHotline = (
    props: HotlineProps,
    leafletRef: Ref<Hotline | undefined>,
    emit: HotlineEmits
) => {
    const { options: polylineOptions, methods: polylineMethods } = setupPolyline(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<PolylineOptions>(props, polylineOptions)

    const methods = {
        ...polylineMethods,
        setMin(min: number) {
            leafletRef.value?.setStyle({ min })
        },
        setMax(max: number) {
            leafletRef.value?.setStyle({ max })
        },
        setOutlineWidth(outlineWidth: number) {
            leafletRef.value?.setStyle({ outlineWidth })
        },
        setOutlineColor(outlineColor: number) {
            leafletRef.value?.setStyle({ outlineColor })
        },
        setPalette(palette: number) {
            leafletRef.value?.setStyle({ palette })
        }
    }

    return { options, methods }
}
