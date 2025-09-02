import { Marker, type MarkerOptions } from 'leaflet'

import type { Ref } from 'vue'
import {
    type MarkerEmits,
    type MarkerProps,
    markerPropsDefaults,
    propsToLeafletOptions,
    setupMarker
} from '@maxel01/vue-leaflet'

// REMOVE
export declare type Template = Marker
export declare type TemplateOptions = MarkerOptions

export interface TemplateProps extends MarkerProps {
    /**
     * New Prop
     * @reactive
     */
    newProp?: number
}

export const templatePropsDefaults = {
    ...markerPropsDefaults
}

export interface TemplateEmits extends MarkerEmits {}

export const setupTemplate = (
    props: TemplateProps,
    leafletRef: Ref<Template | undefined>,
    emit: TemplateEmits
) => {
    const { options: markerOptions, methods: markerMethods } = setupMarker(props, leafletRef, emit)

    const options = propsToLeafletOptions<TemplateOptions>(props, markerOptions)

    const methods = {
        ...markerMethods,
        setNewProp(_min: number) {
            // ...
        }
    }

    return { options, methods }
}
