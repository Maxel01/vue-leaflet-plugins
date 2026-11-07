import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { configDefaults, defineConfig } from 'vitest/config'
import { alias } from './alias.config.ts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), dts()],
    resolve: {
        alias
    },
    css: {
        postcss: {}
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
                    '@maxel01/vue-leaflet': 'vue-leaflet'
                }
            }
        }
    },
    test: {
        environment: 'jsdom',
        exclude: [
            ...configDefaults.exclude,
            'e2e/**',
            'node_modules',
            'tests/leaflet.donut/**' /*, 'tests/exports/**' */
        ],
        root: fileURLToPath(new URL('./', import.meta.url)),
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            exclude: ['src/libs', 'src/**/libs', 'src/plugin-template']
        }
    }
})
