import L from 'leaflet'
import {
    applyDeprecatedMethodsPolyfill,
    applyDomUtilPolyfill,
    applyFactoryMethodsPolyfill,
    applyMouseEventPolyfill,
    applyUtilPolyfill
} from './libs/leaflet-v1-polyfill'

export function preparePolyfill() {
    window.L = L
}

export function prepareMarkerClusterPolyfill() {
    preparePolyfill()
    applyDeprecatedMethodsPolyfill()
    applyDomUtilPolyfill()
    applyFactoryMethodsPolyfill()
    applyMouseEventPolyfill()
    applyUtilPolyfill()
}
