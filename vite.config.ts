import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { configDefaults, defineConfig } from 'vitest/config'
import { alias } from './alias.config.ts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), dts({ include: ['src'] })],
    resolve: {
        alias
    },
    css: {
        postcss: {}
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/plugins.ts', import.meta.url)),
            formats: ['es', 'cjs'],
            fileName: (fmt, name) => `${name}.${fmt === 'es' ? 'js' : 'cjs'}`
        },
        rolldownOptions: {
            external: (id) => {
                if (id.endsWith('.css')) return false
                return (
                    ['vue', 'leaflet', 'simpleheat', '@maxel01/vue-leaflet'].includes(id) ||
                    /^leaflet[\/|\.].*/.test(id)
                )
            },
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src'
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
