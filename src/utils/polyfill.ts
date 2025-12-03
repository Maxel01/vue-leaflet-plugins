import L from 'leaflet'
import {
    applyDomUtilPolyfill,
    applyFactoryMethodsPolyfill,
    applyUtilPolyfill
} from './libs/leaflet-v1-polyfill'

export function preparePolyfill() {
    window.L = L
}

export function prepareMarkerClusterPolyfill() {
    preparePolyfill()
    applyDomUtilPolyfill()
    applyUtilPolyfill()
    applyFactoryMethodsPolyfill()
}
