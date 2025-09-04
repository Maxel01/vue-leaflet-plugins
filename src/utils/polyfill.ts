import L from 'leaflet'
import './libs/leaflet-v1-polyfill'

export function preparePolyfill() {
    window.L = L
    applyAllPolyfills()
}
