import type { Ref } from 'vue'
import {
    type FeatureGroupEmits,
    type FeatureGroupProps,
    featureGroupPropsDefaults,
    propsToLeafletOptions,
    setupFeatureGroup
} from '@maxel01/vue-leaflet'

export interface MarkerClusterGroupProps extends FeatureGroupProps {}

export const markerClusterGroupPropsDefaults = {
    ...featureGroupPropsDefaults
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface MarkerClusterGroupEmits extends FeatureGroupEmits {}

export const setupMarkerClusterGroup = (
    props: MarkerClusterGroupProps,
    leafletRef: Ref<MarkerClusterGroup | undefined>,
    emit: MarkerClusterGroupEmits
) => {
    const { options: featureGroupOptions, methods: featureGroupMethods } = setupFeatureGroup(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions(props, featureGroupOptions)

    const methods = {
        ...featureGroupMethods
    }

    return { options, methods }
}
