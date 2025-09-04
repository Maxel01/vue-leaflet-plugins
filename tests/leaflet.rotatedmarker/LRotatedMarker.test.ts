import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
    mergeReactiveProps,
    mockAddLayer,
    mockRemoveLayer,
    testAddLayer,
    testEmitsReady,
    testPropsBindingToLeaflet,
    testRemoveLayerOnUnmount
} from '@maxel01/vue-leaflet/tests'
import { AddLayerInjection, RemoveLayerInjection } from '@maxel01/vue-leaflet'
import type { RotatedMarker } from '@/libs/leaflet.rotatedmarker/leaflet.rotatedMarker'
import { LRotatedMarker } from '@/leaflet.rotatedmarker'
import { LatLng } from 'leaflet'

const rotatedMarkerProps = mergeReactiveProps(
    {} /* TEST markerProps */,
    {
        rotationAngle: 60,
        rotationOrigin: [4, 4],
        expecting: {
            rotationOrigin: (leafletObject: RotatedMarker) => {
                expect(leafletObject.options.rotationOrigin).toStrictEqual(
                    rotatedMarkerProps.rotationOrigin
                )
            }
        }
    }
)

export const createWrapper = async (props = {}, slots = {}) => {
    const wrapper = mount(LRotatedMarker, {
        propsData: {
            latLng: [44.48865, 11.3317],
            ...props
        },
        slots: slots,
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

describe('LRotatedMarker.vue', () => {
    testEmitsReady(createWrapper)
    // TEST testComponentPropBindings(createMarkerWrapper, 'LRotatedMarker')
    testPropsBindingToLeaflet(createWrapper, rotatedMarkerProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet rotated marker with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as RotatedMarker

        expect(obj).toBeDefined()
        expect(obj.getLatLng()).toStrictEqual(new LatLng(44.48865, 11.3317))
    })
}
