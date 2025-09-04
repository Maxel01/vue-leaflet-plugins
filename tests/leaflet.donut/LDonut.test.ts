import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Circle, LatLng } from 'leaflet'
import { LDonut } from '@/leaflet.donut'
import { AddLayerInjection, RemoveLayerInjection } from '@maxel01/vue-leaflet'
import {
    circleProps,
    mergeReactiveProps,
    mockAddLayer,
    mockRemoveLayer,
    testAddLayer,
    testEmitsReady,
    testPropsBindingToLeaflet,
    testRemoveLayerOnUnmount
} from '@maxel01/vue-leaflet/tests'

export const donutProps = mergeReactiveProps(circleProps, {
    innerRadius: 2000,
    innerRadiusAsPercent: true
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LDonut, {
        propsData: {
            latLng: [44.48865, 11.3317],
            radius: 5000,
            innerRadius: 1000,
            ...props
        },
        global: {
            provide: {
                [AddLayerInjection as symbol]: mockAddLayer,
                [RemoveLayerInjection as symbol]: mockRemoveLayer
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LDonut.vue', () => {
    testEmitsReady(createWrapper)
    // TEST testComponentPropBindings(createWrapper, 'LDonut')
    testPropsBindingToLeaflet(createWrapper, donutProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet donut with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Circle

        expect(obj).toBeDefined()
        expect(obj.getLatLng()).toStrictEqual(new LatLng(44.48865, 11.3317))
        expect(obj.getRadius()).toBe(5000)
    })
}
