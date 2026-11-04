# 🔌 Vue-Leaflet Plugins Wrapper

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href] \
[![Vue][vue-src]][vue-href]
[![Leaflet][leaflet-src]][leaflet-href]

A modern Vue 3 wrapper for **Leaflet v2 plugins**, extending [vue-leaflet](https://github.com/Maxel01/vue-leaflet).
Built with the Composition API, SSR-compatible, and designed to integrate seamlessly with the Vue-Leaflet ecosystem.

> ⚠️ This is an **early-stage project**. Only a few plugins are supported yet — contributions and requests are welcome via [issues](https://github.com/Maxel01/vue-leaflet-plugins/issues) or [discussions](https://github.com/Maxel01/vue-leaflet-plugins/discussions).

---

## 🚀 What's New

* ✅ Unified plugin wrapper system for Leaflet v2
* ✅ Works out-of-the-box with [@maxel01/vue-leaflet](https://github.com/Maxel01/vue-leaflet)
* ✅ SSR support tested with Nuxt
* ✅ Consistent Vue 3 Composition API interface
* ✅ Plugin test helpers for easy development

---

## ✅ Available Plugins

The following plugins are currently wrapped and ready for use:

☑️ [Leaflet.Donut](https://github.com/Falke-Design/L.Donut) (draw donuts) \
☑️ [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) (heatmap layer) \
☑️ [Leaflet.hotline](https://github.com/iosphere/Leaflet.hotline) (heatmap-style polylines) \
☑️ [Leaflet.MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster) (animated marker clustering)

More plugins will be added over time. If you need a specific plugin, open a request in the repo.

> ⚠️ Note: Leaflet v1 plugins **are not directly compatible** with Leaflet v2. \
> However, there is a possibility to use the [Leaflet-V1-polyfill](https://github.com/Falke-Design/Leaflet-V1-polyfill). Check out the `Leaflet.MarkerCluster` implementation for more.

---

## 📦 Installation

```bash
pnpm add @maxel01/vue-leaflet-plugins @maxel01/vue-leaflet leaflet@^2.0.0-beta.1
# or
yarn add @maxel01/vue-leaflet-plugins @maxel01/vue-leaflet leaflet@^2.0.0-beta.1
# or
npm i @maxel01/vue-leaflet-plugins @maxel01/vue-leaflet leaflet@^2.0.0-beta.1
```
---

## 🧑‍💻 Usage

See the [vue-leaflet-plugins-docs](https://maxel01.github.io/vue-leaflet-plugins/) for detailed examples.
Here’s a quick start using the **Hotline plugin**:

```vue
<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LHotline } from '@maxel01/vue-leaflet-plugins'
</script>

<template>
  <LMap :zoom="9" :center="[47.41322, -1.219482]">
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    />
    <LHotline
        :lat-lngs="[
                [47.334852, -1.509485, 150],
                [47.342596, -1.328731, 250],
                [47.241487, -1.190568, 350],
                [47.234787, -1.358337, 250]
            ]"
        :min="150"
        :max="350"
    />
  </LMap>
</template>
```

---

## 🧪 Interactive Playground

Unlock the full potential of vue-leaflet-plugins with interactive demo components built right into the [official documentation](https://maxel01.github.io/vue-leaflet-plugins/). The playground lets you explore real-world plugin usage, experiment with features live, and see how everything fits together.

Want to test **Server-Side Rendering (SSR)**? Dive into the **Nuxt playground** for a hands-on SSR experience.

To run the **Nuxt Playground** locally:

```bash
git clone https://github.com/maxel01/vue-leaflet-plugins.git
cd vue-leaflet-plugins
pnpm install
pnpm dev
```
Visit: [http://127.0.0.1:3000](http://127.0.0.1:3000)

Or use the **Vue-specific playground**:

```bash
pnpm dev:vue
```

Visit: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

## 🛠 Contribution

This repo uses `pnpm` for building and development.

> 📘 [How to install PNPM](https://pnpm.io/installation)

See the [contribution guide](https://maxel01.github.io/vue-leaflet-plugins/getting-started/contribution.html) for more details.

---

## 🙌 Credits

* [vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet)
* [Leaflet](https://leafletjs.com/) and plugin authors
* Community contributors who help port plugins to v2

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@maxel01/vue-leaflet-plugins/latest.svg?color=0F81C2
[npm-version-href]: https://www.npmjs.com/package/@maxel01/vue-leaflet-plugins
[npm-downloads-src]: https://img.shields.io/npm/dm/@maxel01/vue-leaflet-plugins.svg
[npm-downloads-href]: https://www.npmjs.com/package/@maxel01/vue-leaflet-plugins
[license-src]: https://img.shields.io/npm/l/@maxel01/vue-leaflet-plugins.svg
[license-href]: https://www.npmjs.com/package/@maxel01/vue-leaflet-plugins
[vue-src]: https://img.shields.io/npm/dependency-version/@maxel01/vue-leaflet-plugins/peer/vue?label=Vue&logo=vue.js&colorA=18181B
[vue-href]: https://vuejs.org
[leaflet-src]: https://img.shields.io/npm/dependency-version/@maxel01/vue-leaflet-plugins/peer/leaflet?label=Leaflet&logo=leaflet&colorA=18181B
[leaflet-href]: https://leafletjs.com/