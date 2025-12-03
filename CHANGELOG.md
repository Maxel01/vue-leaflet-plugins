# Changelog

## [0.0.3](https://github.com/maxel01/vue-leaflet-plugins/compare/v0.0.2...v0.0.3) (2025-12-03)

### ✨ Features

* **docs:** update vitepress to v2 ([#77](https://github.com/maxel01/vue-leaflet-plugins/issues/77)) ([6b1d2f2](https://github.com/maxel01/vue-leaflet-plugins/commit/6b1d2f2b5d15f4b7995214f1fb39e7d75391a074))

### 🐛 Bug Fixes

* **deps:** pin ``leaflet`` version to ``2.0.0-alpha`` ([#56](https://github.com/maxel01/vue-leaflet-plugins/issues/56)) ([da79772](https://github.com/maxel01/vue-leaflet-plugins/commit/da79772e0ab7ab1e22663ed8e4243630eb07be6c))
* **Leaflet.MarkerCluster:** apply only necessary polyfills ([#88](https://github.com/maxel01/vue-leaflet-plugins/issues/88)) ([c1f633e](https://github.com/maxel01/vue-leaflet-plugins/commit/c1f633e3c2c82fba1651bd28d5159dab9096e70a))

### 📝 Documentation

* add analytics to get usage overview ([#64](https://github.com/maxel01/vue-leaflet-plugins/issues/64)) ([1effca0](https://github.com/maxel01/vue-leaflet-plugins/commit/1effca0104ab9ffcac8812e3b3591b2c117cdc66))
* add detailed information to select the version used in the playgrounds. ([#41](https://github.com/maxel01/vue-leaflet-plugins/issues/41)) ([765f007](https://github.com/maxel01/vue-leaflet-plugins/commit/765f00752ae09142a526988ac56c50409363d643))
* add v1 plugins compatibility to README.md ([#42](https://github.com/maxel01/vue-leaflet-plugins/issues/42)) ([e8d8e2b](https://github.com/maxel01/vue-leaflet-plugins/commit/e8d8e2bf611984409d6da14330d09ff80d0a0914))

### ♻️ Refactoring

* replace `import x` with `import type x` where applicable ([#58](https://github.com/maxel01/vue-leaflet-plugins/issues/58)) ([9b4c321](https://github.com/maxel01/vue-leaflet-plugins/commit/9b4c32190bb7f288b0b6fb6473c8a0d11181078d))

### 🚧 Chores

* add before init hook to release-it ([#55](https://github.com/maxel01/vue-leaflet-plugins/issues/55)) ([02b2188](https://github.com/maxel01/vue-leaflet-plugins/commit/02b2188eceda578ed82305e92a00b60d9da2f9d9))
* add ci from `vue-leaflet` ([#24](https://github.com/maxel01/vue-leaflet-plugins/issues/24)) ([427ebea](https://github.com/maxel01/vue-leaflet-plugins/commit/427ebea5697d60393c3d01f8e4c14aafb4051df3))
* add pnpm caching to ci ([#36](https://github.com/maxel01/vue-leaflet-plugins/issues/36)) ([cf9906f](https://github.com/maxel01/vue-leaflet-plugins/commit/cf9906fcce516758db3dde3dbb99eb123ff209fa))
* configure groups for minor and patch dependencies ([#65](https://github.com/maxel01/vue-leaflet-plugins/issues/65)) ([73b8fe5](https://github.com/maxel01/vue-leaflet-plugins/commit/73b8fe5bd80b3d0bbc7a7b2a683b0535ac16ab5b))
* **deps-dev:** bump @vitest/eslint-plugin from 1.3.4 to 1.3.13 ([#40](https://github.com/maxel01/vue-leaflet-plugins/issues/40)) ([ccd5805](https://github.com/maxel01/vue-leaflet-plugins/commit/ccd58051627bce44befdf1cb00284af284a9264b))
* **deps-dev:** bump @vue/tsconfig from 0.7.0 to 0.8.1 ([#39](https://github.com/maxel01/vue-leaflet-plugins/issues/39)) ([0129137](https://github.com/maxel01/vue-leaflet-plugins/commit/0129137045406d9982d2fee36ff3d988308d014b))
* **deps-dev:** bump eslint-plugin-vue from 10.4.0 to 10.5.0 ([#32](https://github.com/maxel01/vue-leaflet-plugins/issues/32)) ([725e054](https://github.com/maxel01/vue-leaflet-plugins/commit/725e05453c4ed399c0d460b312757bb07d9aeee6))
* **deps-dev:** bump fs-extra from 11.3.1 to 11.3.2 ([#28](https://github.com/maxel01/vue-leaflet-plugins/issues/28)) ([6ec9519](https://github.com/maxel01/vue-leaflet-plugins/commit/6ec951998173840c25b355cead5cb042d8b902a0))
* **deps-dev:** bump vite from 7.1.3 to 7.1.7 ([#30](https://github.com/maxel01/vue-leaflet-plugins/issues/30)) ([a9dc7fc](https://github.com/maxel01/vue-leaflet-plugins/commit/a9dc7fc685881923e2fb286d6f1fcc3e286432d0))
* **deps-dev:** bump vite-plugin-vue-devtools from 8.0.1 to 8.0.2 ([#31](https://github.com/maxel01/vue-leaflet-plugins/issues/31)) ([8a3e781](https://github.com/maxel01/vue-leaflet-plugins/commit/8a3e7813f851f6d01cad612cd183a30b7f0b407c))
* **deps:** bump @maxel01/vue-leaflet from 1.0.0-beta to 1.0.0-beta.1 ([#29](https://github.com/maxel01/vue-leaflet-plugins/issues/29)) ([309cf71](https://github.com/maxel01/vue-leaflet-plugins/commit/309cf71cdd749f0629c249ddf20afc1139b1cc36))
* **deps:** bump nuxt from 4.0.3 to 4.1.2 ([#37](https://github.com/maxel01/vue-leaflet-plugins/issues/37)) ([683e5e5](https://github.com/maxel01/vue-leaflet-plugins/commit/683e5e521e6e2e8957f065ddfdfa50d6cfd0a39f))
* **deps:** bump vue from 3.5.20 to 3.5.22 ([#38](https://github.com/maxel01/vue-leaflet-plugins/issues/38)) ([e7fd317](https://github.com/maxel01/vue-leaflet-plugins/commit/e7fd317aaafd18428d23bc7f02c87320b31a3cce))
* fix lint errors ([#34](https://github.com/maxel01/vue-leaflet-plugins/issues/34)) ([eaafb31](https://github.com/maxel01/vue-leaflet-plugins/commit/eaafb31c86253841e785025577089f6f699237d8))
* **licences:** add licence for L.Donut ([#87](https://github.com/maxel01/vue-leaflet-plugins/issues/87)) ([670b068](https://github.com/maxel01/vue-leaflet-plugins/commit/670b068ae57c3da13c727b0e6c27ec1f5560ffad))
* **licences:** add licence for Leaflet-V1-polyfill ([#80](https://github.com/maxel01/vue-leaflet-plugins/issues/80)) ([a3aacca](https://github.com/maxel01/vue-leaflet-plugins/commit/a3aacca182367d37530f76f2444c3bf50e33a674))
* update dependabot prefix ([#43](https://github.com/maxel01/vue-leaflet-plugins/issues/43)) ([3b110ad](https://github.com/maxel01/vue-leaflet-plugins/commit/3b110adc0f72792c19a45de4ec8d8c1c42e9ed4e))
* **vue-playground:** remove unused code ([#73](https://github.com/maxel01/vue-leaflet-plugins/issues/73)) ([c83d774](https://github.com/maxel01/vue-leaflet-plugins/commit/c83d774f5c8cb04d576854079bb2d94782932a90))

### ✅ Tests

* add `markerProps` to tests in RotatedMarker ([#57](https://github.com/maxel01/vue-leaflet-plugins/issues/57)) ([74c8b70](https://github.com/maxel01/vue-leaflet-plugins/commit/74c8b705aa3f81f6076c9d5b5e9acdb8435e926a))

## [0.0.2](https://github.com/maxel01/vue-leaflet-plugins/compare/v0.0.1...v0.0.2) (2025-09-24)


### 🚧 Chores

* add additional files to npm package ([#23](https://github.com/maxel01/vue-leaflet-plugins/issues/23)) ([1c3d5ae](https://github.com/maxel01/vue-leaflet-plugins/commit/1c3d5ae1b629c050281edfcd6d878a9b2610df70))
* update licences ([#22](https://github.com/maxel01/vue-leaflet-plugins/issues/22)) ([2cf2cca](https://github.com/maxel01/vue-leaflet-plugins/commit/2cf2cca74474db8ef2d61749ff42b8231e042357))

## [0.0.1](https://github.com/maxel01/vue-leaflet-plugins/compare/v0.0.1-alpha.2...v0.0.1) (2025-09-24)


### ✨ Features

* add `Leaflet.heat` ([#20](https://github.com/maxel01/vue-leaflet-plugins/issues/20)) ([48df583](https://github.com/maxel01/vue-leaflet-plugins/commit/48df583e6036c78fd38be7b3f8b85ce6548df66d))


### 📝 Documentation

* improve Leaflet.heat page ([#21](https://github.com/maxel01/vue-leaflet-plugins/issues/21)) ([c762772](https://github.com/maxel01/vue-leaflet-plugins/commit/c762772109bd3ea2006d65f0321fb59056bc3dad))

## [0.0.1-alpha.2](https://github.com/maxel01/vue-leaflet-plugins/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2025-09-05)


### ✨ Features

* add ``leaflet.donut`` ([#14](https://github.com/maxel01/vue-leaflet-plugins/issues/14)) ([58db9ab](https://github.com/maxel01/vue-leaflet-plugins/commit/58db9ab3094edb88ad2a510936667153a9e3e10e))
* add ``Leaflet.MarkerCluster`` ([#16](https://github.com/maxel01/vue-leaflet-plugins/issues/16)) ([7e60471](https://github.com/maxel01/vue-leaflet-plugins/commit/7e604716a06105ea5b7862dbc6dc109b71aa126d))


### 🐛 Bug Fixes

* add slots to ``LHotline`` and ``LRotatedMarker`` ([#13](https://github.com/maxel01/vue-leaflet-plugins/issues/13)) ([163a5e7](https://github.com/maxel01/vue-leaflet-plugins/commit/163a5e70ad6572775e07bbe782a8d8fe9ee342ec))
* **leaflet.hotline:** rename docstring ``LDonut`` to ``LHotline`` ([#15](https://github.com/maxel01/vue-leaflet-plugins/issues/15)) ([3f84994](https://github.com/maxel01/vue-leaflet-plugins/commit/3f84994502c720f23c2d9a349326d70c687c57ea))
* **playground-vue:** add missing imports ([#9](https://github.com/maxel01/vue-leaflet-plugins/issues/9)) ([edfe165](https://github.com/maxel01/vue-leaflet-plugins/commit/edfe165d857f747878b9ad7f03f4d3824610a135))


### 📝 Documentation

* fix failed vitepress build due to npm package of this lib ([#18](https://github.com/maxel01/vue-leaflet-plugins/issues/18)) ([c0d0bc1](https://github.com/maxel01/vue-leaflet-plugins/commit/c0d0bc1371b7162c776792f79331f2fd46cc1dbe))
* improve vitepress docs & add contribution guide ([#8](https://github.com/maxel01/vue-leaflet-plugins/issues/8)) ([820af65](https://github.com/maxel01/vue-leaflet-plugins/commit/820af65b45d9efee46c2bc63509cbc538bddbd41))
* update README.md ([#17](https://github.com/maxel01/vue-leaflet-plugins/issues/17)) ([6c41ff1](https://github.com/maxel01/vue-leaflet-plugins/commit/6c41ff1a046c0fa9f02e2d11508aea03e2172a04))


### ♻️ Refactoring

* add ts compatibility in Leaflet.RotatedMarker ([#12](https://github.com/maxel01/vue-leaflet-plugins/issues/12)) ([37b4455](https://github.com/maxel01/vue-leaflet-plugins/commit/37b445503490df051ca82c009f7f84114ff38634))
* **leaflet.hotline:** replace implementation with fully ts support ([#11](https://github.com/maxel01/vue-leaflet-plugins/issues/11)) ([77e4e87](https://github.com/maxel01/vue-leaflet-plugins/commit/77e4e87f3f0bac49db8ad315bb885f532f500d7d))


### 🚧 Chores

* **deps:** update playground to current version of this repo. ([d7c81fc](https://github.com/maxel01/vue-leaflet-plugins/commit/d7c81fc4e6e34a7646743e876ec8841e61126edd))
* move plugin implementations to the libs folder ([#10](https://github.com/maxel01/vue-leaflet-plugins/issues/10)) ([fc34dbb](https://github.com/maxel01/vue-leaflet-plugins/commit/fc34dbb49bdc692cee377a8cf3efd78131050d76))

## [0.0.1-alpha.1](https://github.com/maxel01/vue-leaflet-plugins/compare/v0.0.1-alpha...v0.0.1-alpha.1) (2025-09-02)


### ✨ Features

* add Leaflet.RotatedMarker ([#7](https://github.com/maxel01/vue-leaflet-plugins/issues/7)) ([d6c53eb](https://github.com/maxel01/vue-leaflet-plugins/commit/d6c53eb35b860c2940ad5c4c034645ae5c13be91))
* **leaflet.hotline:** add reactive props and update demo ([1088af3](https://github.com/maxel01/vue-leaflet-plugins/commit/1088af36fccbaf7853a53c5e26dc97a54e6cf3ae))


### 🚧 Chores

* **leaflet.hotline:** update docs and add reactive props ([#4](https://github.com/maxel01/vue-leaflet-plugins/issues/4)) ([031b449](https://github.com/maxel01/vue-leaflet-plugins/commit/031b449a3ba60571fb657f8bfbe3fb782ade0fc3))


### ✅ Tests

* **leaflet.hotline:** add tests for LHotline ([#6](https://github.com/maxel01/vue-leaflet-plugins/issues/6)) ([fc4125e](https://github.com/maxel01/vue-leaflet-plugins/commit/fc4125e7217a04c6ee290dde6c427afabad86a69))

## 0.0.1-alpha (2025-08-28)


### ✨ Features

* add Leaflet.hotline plugin wrapper ([c3052aa](https://github.com/maxel01/vue-leaflet-plugins/commit/c3052aa6e1042927e325411b2705e2e40920a24f))


### 🐛 Bug Fixes

* **build:** fix dist file names ([039ba9d](https://github.com/maxel01/vue-leaflet-plugins/commit/039ba9ddb900fdc95bd9e84ce4bbcc01b0586cd8))


### 🚧 Chores

* initial commit ([ccc1a18](https://github.com/maxel01/vue-leaflet-plugins/commit/ccc1a18e22922191a00e3ad2bfd5a17d2a727ab9))
