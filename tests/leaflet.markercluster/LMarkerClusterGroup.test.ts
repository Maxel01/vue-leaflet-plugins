import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { LMarkerClusterGroup } from '@/leaflet.markercluster'
import { AddLayerInjection, RemoveLayerInjection } from '@maxel01/vue-leaflet'
import {
    featureGroupProps,
    mergeReactiveProps,
    mockAddLayer,
    mockRemoveLayer,
    testAddLayer,
    testEmitsReady,
    testPropsBindingToLeaflet,
    testRemoveLayerOnUnmount
} from '@maxel01/vue-leaflet/tests'

export const markerClusterGroupProps = mergeReactiveProps(featureGroupProps, {})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LMarkerClusterGroup, {
        propsData: {
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
    await vi.waitFor(() => expect(wrapper.emitted('ready')).toBeTruthy())
    return wrapper
}

describe('LMarkerClusterGroup.vue', () => {
    testEmitsReady(createWrapper)
    // TEST testComponentPropBindings(createWrapper, 'LMarkerClusterGroup')
    testPropsBindingToLeaflet(createWrapper, markerClusterGroupProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: () => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet feature group with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as MarkerClusterGroup

        expect(obj).toBeDefined()
    })
}
