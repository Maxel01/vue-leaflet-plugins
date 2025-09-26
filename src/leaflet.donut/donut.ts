import type { Ref } from 'vue'
import {
    type CircleEmits,
    type CircleProps,
    circlePropsDefaults,
    propsToLeafletOptions,
    setupCircle
} from '@maxel01/vue-leaflet'
import { Donut } from '@/libs/leaflet.donut/leaflet.donut'

export interface DonutProps extends CircleProps {
    /**
     * Outer radius. The outer radius must be greater than the inner radius.
     * @reactive
     */
    radius: number
    /**
     * Inner radius. It can be a meter value or a percent (0-1) value of the outer radius.
     * @reactive
     */
    innerRadius: number
    /**
     * Defines if the inner radius is a percent value of the outer radius.
     */
    innerRadiusAsPercent?: boolean
}

export const donutPropsDefaults = {
    ...circlePropsDefaults,
    innerRadiusAsPercent: false
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface DonutEmits extends CircleEmits {}

export const setupDonut = (
    props: DonutProps,
    leafletRef: Ref<Donut | undefined>,
    emit: DonutEmits
) => {
    const { options: circleOptions, methods: circleMethods } = setupCircle(props, leafletRef, emit)

    const options = propsToLeafletOptions<DonutOptions>(props, circleOptions)

    const methods = {
        ...circleMethods,
        setInnerRadiusAsPercent(innerRadius: boolean) {
            leafletRef.value.options.innerRadiusAsPercent = innerRadius
            leafletRef.value.redraw()
        }
    }

    return { options, methods }
}
