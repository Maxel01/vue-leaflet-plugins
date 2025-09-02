import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { LHotline } from '@/leaflet.hotline'
import { LatLng, type Polyline } from 'leaflet'
import {
    mergeReactiveProps,
    mockAddLayer,
    mockRemoveLayer,
    polylineProps,
    testAddLayer,
    testEmitsReady,
    testPropsBindingToLeaflet,
    testRemoveLayerOnUnmount
} from '@maxel01/vue-leaflet/tests'
import { AddLayerInjection, RemoveLayerInjection } from '@maxel01/vue-leaflet'
import { Hotline } from '@/leaflet.hotline/leaflet.hotline'

const hotlineProps = mergeReactiveProps(polylineProps, {
    latLngs: [
        [47.4, -1.51, 56],
        [47.34, -1.3, 60],
        [47.24, -1.2, 65],
        [47.23, -1.36, 56]
    ],
    min: 100,
    max: 1000,
    outlineWidth: 10,
    outlineColor: '#123456',
    palette: {
        0.0: '#000000',
        1.0: '#ffffff'
    },
    expecting: {
        palette: (leafletObject: Hotline) => {
            expect(leafletObject.options.palette).toStrictEqual(hotlineProps.palette)
        },
        latLngs: (leafletObject: Polyline) => {
            expect(leafletObject.getLatLngs()).toStrictEqual(
                hotlineProps.latLngs.map(([lat, lng, alt]) => new LatLng(lat, lng, alt))
            )
        }
    }
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LHotline, {
        propsData: {
            latLngs: [
                [47.334852, -1.509485, 150],
                [47.342596, -1.328731, 250],
                [47.241487, -1.190568, 350],
                [47.234787, -1.358337, 250]
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

describe('LHotline.vue', () => {
    testEmitsReady(createWrapper)
    // TEST testComponentPropBindings(createWrapper, 'LHotline')
    testPropsBindingToLeaflet(createWrapper, hotlineProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet hotline with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Polyline

        expect(obj).toBeDefined()
        expect(obj.getLatLngs()).toStrictEqual([
            new LatLng(47.334852, -1.509485, 150),
            new LatLng(47.342596, -1.328731, 250),
            new LatLng(47.241487, -1.190568, 350),
            new LatLng(47.234787, -1.358337, 250)
        ])
    })
}
