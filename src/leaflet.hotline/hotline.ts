import { type PolylineOptions } from 'leaflet'

import type { Ref } from 'vue'
import type { ColorPalette, Hotline } from '@/libs/leaflet.hotline/leaflet.hotline'
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
    palette?: ColorPalette
}

export const hotlinePropsDefaults = {
    ...polylinePropsDefaults
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
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
        setOutlineColor(outlineColor: string) {
            leafletRef.value?.setStyle({ outlineColor })
        },
        setPalette(palette: ColorPalette) {
            leafletRef.value?.setStyle({ palette })
        }
    }

    return { options, methods }
}
