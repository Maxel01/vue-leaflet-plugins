import DefaultTheme from 'vitepress/theme'
import './custom.css'
import 'leaflet/dist/leaflet.css'
import '../../../dist/vue-leaflet-plugins.css'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        const components = import.meta.glob('@/playground/app/pages/**/*.vue', { eager: true })
        for (const [path, module] of Object.entries(components)) {
            const name = 'demo-' + path
                .replace(/\.vue$/, '')
                .split('/')
                .slice(-2).join('-')
            app.component(name, module.default)
        }
    }
}
