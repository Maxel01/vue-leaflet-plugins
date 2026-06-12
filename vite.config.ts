import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { alias } from './alias.config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), dts({ tsconfigPath: './tsconfig.build.json' })],
    resolve: {
        alias
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/plugins.ts', import.meta.url)),
            formats: ['es', 'cjs', 'umd'],
            name: 'vue-leaflet-plugins',
            fileName: (fmt) => `vue-leaflet-plugins.${fmt}.js`
        },
        rolldownOptions: {
            external: ['vue', 'leaflet', /^leaflet\/.*/, '@maxel01/vue-leaflet'],
            output: {
                // Global variables for use in the UMD build
                globals: {
                    vue: 'Vue',
                    leaflet: 'L',
                    "@maxel01/vue-leaflet": 'vue-leaflet',
                }
            }
        }
    }
})
