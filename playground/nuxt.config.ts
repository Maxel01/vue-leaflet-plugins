// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'
import { alias } from '../alias.config'

const version: 'local' | 'dist' | 'npm' = 'local'
const vue_leaflet_plugins = {
    local: path.resolve(__dirname, '../src/plugins'),
    dist: '@dist/vue-leaflet-plugins',
    npm: '@maxel01/vue-leaflet-plugins'
}

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['leaflet/dist/leaflet.css', "@maxel01/vue-leaflet-plugins/dist/vue-leaflet-plugins.css"],
    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        }
    },
    vite: {
        resolve: {
            alias: {
                '@maxel01/vue-leaflet-plugins': vue_leaflet_plugins[version],
                ...alias
            }
        }
    }
})
