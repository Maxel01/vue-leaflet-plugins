import L from 'leaflet'
import { applyAllPolyfills } from './libs/leaflet-v1-polyfill'

export function preparePolyfill() {
    window.L = L
    applyAllPolyfills()
}
