import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import { alias } from '../alias.config.ts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    css: {
        postcss: {}
    },
    resolve: {
        alias: {
            '@maxel01/vue-leaflet-plugins': path.resolve(import.meta.dirname, '../src/plugins.ts'),
            ...alias
        }
    }
})
