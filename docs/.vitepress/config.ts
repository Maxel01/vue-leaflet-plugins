import { defineConfig } from 'vitepress'
import { alias } from '../../alias.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vue Leaflet Plugins',
    description: 'Documentation for the Vue Leaflet Plugins module',
    head: [['link', { rel: 'icon', href: '/vue-leaflet-plugins/favicon.ico' }]],
    base: '/vue-leaflet-plugins/',
    vite: {
        resolve: {
            alias
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Quick Start', link: '/getting-started/installation' },
            { text: 'Guide', link: '/guide' },
            { text: 'Plugins', link: '/plugins/introduction' },
            { text: 'Contribution', link: '/getting-started/contribution' }
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Installation', link: '/getting-started/installation' },
                    { text: 'Usage', link: '/getting-started/usage' },
                    { text: 'Contribution', link: '/getting-started/contribution' }
                ]
            },
            {
                text: 'Guide',
                items: []
            },
            {
                text: 'Plugins',
                collapsed: false,
                items: [
                    {
                        text: 'Introduction',
                        link: '/plugins/introduction'
                    },
                    {
                        text: 'Leaflet.Donut',
                        link: '/plugins/leaflet.donut/'
                    },
                    {
                        text: 'Leaflet.Hotline',
                        link: '/plugins/leaflet.hotline/'
                    },
                    {
                        text: 'Leaflet.MarkerCluster',
                        link: '/plugins/leaflet.markercluster/'
                    },
                    {
                        text: 'Leaflet.RotatedMarker',
                        link: '/plugins/leaflet.rotatedmarker/'
                    }
                ]
            },
            {
                text: 'About',
                items: [{ text: 'Q&A', link: '/about/q&a' }]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/maxel01/vue-leaflet-plugins' },
            { icon: 'npm', link: 'https://www.npmjs.com/package/@maxel01/vue-leaflet-plugins' }
        ],

        search: {
            provider: 'local'
        }
    },
    ignoreDeadLinks: true
})
