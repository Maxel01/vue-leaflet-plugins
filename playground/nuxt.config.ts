// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['leaflet/dist/leaflet.css'],
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    vite: {
        resolve: {
            alias: {
                '@maxel01/vue-leaflet-plugins': path.resolve(__dirname, '../src/plugins'),
            }
        }
    }
})
