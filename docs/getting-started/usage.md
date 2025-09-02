---
outline: deep
title: Usage
---

# 🧑‍💻 Usage

**Vue Leaflet Plugins** is a module that provides a set of components to extend [Vue Leaflet](https://www.npmjs.com/package/@maxel01/vue-leaflet) with Leaflet v2 plugins in Vue 3.

Here is a basic example of how to use the `LMap` and `LTileLayer` components along with a plugin component from `Leaflet.hotline` to display a map:

```vue{3,13-22}
<!--@include: ../../playground/app/pages/leaflet.hotline/hotline.vue -->
```

And here is how it should look :

<script setup>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <demo-hotline />
</div>

