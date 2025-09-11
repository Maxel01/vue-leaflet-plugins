import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { LatLng } from 'leaflet'
import {
    layerProps,
    mergeReactiveProps,
    mockAddLayer,
    mockRemoveLayer,
    testAddLayer,
    testEmitsReady,
    testPropsBindingToLeaflet,
    testRemoveLayerOnUnmount
} from '@maxel01/vue-leaflet/tests'
import { AddLayerInjection, RemoveLayerInjection } from '@maxel01/vue-leaflet'
import { LHeatLayer } from '@/leaflet.heat'
import type { HeatLayer } from '@/libs/leaflet.heat/leaflet.heat.ts'

const heatLayerProps = mergeReactiveProps(layerProps, {
    latLngs: [
        new LatLng(47.4, -1.51, 1),
        new LatLng(47.34, -1.3, 1),
        new LatLng(47.24, -1.2, 1),
        new LatLng(47.23, -1.36, 1)
    ],
    minOpacity: 0.2,
    maxZoom: 5,
    radius: 10,
    blur: 10,
    max: 0.8,
    gradient: {
        0.0: '#000000',
        1.0: '#ffffff'
    },
    expecting: {
        gradient: (leafletObject: HeatLayer) => {
            expect(leafletObject.options.gradient).toStrictEqual(heatLayerProps.gradient)
        },
        latLngs: (leafletObject: HeatLayer) => {
            expect(leafletObject._latlngs).toStrictEqual(heatLayerProps.latLngs)
        }
    }
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LHeatLayer, {
        propsData: {
            latLngs: [
                new LatLng(47.334852, -1.509485, 1),
                new LatLng(47.342596, -1.328731, 1),
                new LatLng(47.241487, -1.190568, 1),
                new LatLng(47.234787, -1.358337, 1)
            ],
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

describe('LHeatLayer.vue', () => {
    testEmitsReady(createWrapper)
    // TEST testComponentPropBindings(createWrapper, 'LHeatLayer')
    testPropsBindingToLeaflet(createWrapper, heatLayerProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet heat layer with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as HeatLayer

        expect(obj).toBeDefined()
        expect(obj._latlngs).toStrictEqual([
            new LatLng(47.334852, -1.509485, 1),
            new LatLng(47.342596, -1.328731, 1),
            new LatLng(47.241487, -1.190568, 1),
            new LatLng(47.234787, -1.358337, 1)
        ])
    })
}
