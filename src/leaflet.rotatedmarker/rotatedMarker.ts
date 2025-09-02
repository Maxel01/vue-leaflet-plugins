import type { Ref } from 'vue'
import {
    type MarkerEmits,
    type MarkerProps,
    markerPropsDefaults,
    propsToLeafletOptions,
    setupMarker
} from '@maxel01/vue-leaflet'
import type {
    RotatedMarker,
    RotatedMarkerOptions
} from '@/leaflet.rotatedmarker/leaflet.rotatedMarker'

export interface RotatedMarkerProps extends MarkerProps {
    /**
     * The rotation angle
     * @reactive
     */
    rotationAngle?: number
    /**
     * The rotation origin
     * @reactive
     */
    rotationOrigin?: [number, number]
}

export const rotatedMarkerPropsDefaults = {
    ...markerPropsDefaults
}

export interface RotatedMarkerEmits extends MarkerEmits {}

export const setupRotatedMarker = (
    props: RotatedMarkerProps,
    leafletRef: Ref<RotatedMarker | undefined>,
    emit: RotatedMarkerEmits
) => {
    const { options: rotatedMarkerOptions, methods: rotatedMarkerMethods } = setupMarker(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<RotatedMarkerOptions>(props, rotatedMarkerOptions)

    const methods = {
        ...rotatedMarkerMethods
    }

    return { options, methods }
}
