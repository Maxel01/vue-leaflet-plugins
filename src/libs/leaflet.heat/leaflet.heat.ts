/*
Copyright (c) 2014, Vladimir Agafonkin
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import {
    Bounds,
    DomUtil,
    type LatLng,
    LatLngBounds,
    Layer,
    type LayerOptions,
    type Map,
    Point,
    Util
} from 'leaflet'
import simpleheat from 'simpleheat'

export interface HeatLayerOptions extends LayerOptions {
    minOpacity: number
    maxZoom: number
    radius: number
    blur: number
    max: number
    gradient: { [key: number]: string }
}

export class HeatLayer extends Layer {
    private _latlngs: LatLng[]
    private _heat: simpleheat.Instance
    private _frame
    private _canvas
    declare options: HeatLayerOptions
    // options: {
    //     minOpacity: 0.05,
    //     maxZoom: 18,
    //     radius: 25,
    //     blur: 15,
    //     max: 1.0
    // },

    constructor(latlngs: LatLng[], options: HeatLayerOptions) {
        super(options)
        this._latlngs = latlngs
        this.options = options
    }

    setLatLngs(latlngs: LatLng[]): this {
        this._latlngs = latlngs
        return this.redraw()
    }

    addLatLng(latlng: LatLng): this {
        this._latlngs.push(latlng)
        return this.redraw()
    }

    setOptions(options: Partial<HeatLayerOptions>): this {
        Util.setOptions(this, options)
        if (this._heat) {
            this._updateOptions()
        }
        return this.redraw()
    }

    getBounds(): LatLngBounds {
        return new LatLngBounds(this._latlngs)
    }

    redraw(): this {
        if (this._heat && !this._frame && this._map && !this._map._animating) {
            this._frame = window.requestAnimationFrame(() => this._redraw())
        }
        return this
    }

    onAdd(map: Map): this {
        this._map = map

        if (!this._canvas) {
            this._initCanvas()
        }

        if (this.options.pane) {
            this.getPane().appendChild(this._canvas)
        } else {
            map._panes.overlayPane.appendChild(this._canvas)
        }

        map.on('moveend', this._reset, this)

        if (map.options.zoomAnimation) {
            map.on('zoomanim', this._animateZoom, this)
        }

        this._reset()
        return this
    }

    onRemove(map: Map): this {
        if (this.options.pane) {
            this.getPane().removeChild(this._canvas)
        } else {
            map.getPanes().overlayPane.removeChild(this._canvas)
        }

        map.off('moveend', this._reset, this)

        if (map.options.zoomAnimation) {
            map.off('zoomanim', this._animateZoom, this)
        }
        return this
    }

    addTo(map: Map): this {
        map.addLayer(this)
        return this
    }

    _initCanvas() {
        var canvas = (this._canvas = DomUtil.create(
            'canvas',
            'leaflet-heatmap-layer leaflet-layer'
        ))

        canvas.style['transformOrigin'] = '50% 50%'

        var size = this._map.getSize()
        canvas.width = size.x
        canvas.height = size.y

        var animated = this._map.options.zoomAnimation
        canvas.classList.add('leaflet-zoom-' + (animated ? 'animated' : 'hide'))

        this._heat = simpleheat(canvas)
        this._updateOptions()
    }

    _updateOptions() {
        this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur)

        if (this.options.gradient) {
            this._heat.gradient(this.options.gradient)
        }
        if (this.options.max) {
            this._heat.max(this.options.max)
        }
    }

    _reset() {
        var topLeft = this._map.containerPointToLayerPoint([0, 0])
        DomUtil.setPosition(this._canvas, topLeft)

        var size = this._map.getSize()

        if (this._heat._width !== size.x) {
            this._canvas.width = this._heat._width = size.x
        }
        if (this._heat._height !== size.y) {
            this._canvas.height = this._heat._height = size.y
        }

        this._redraw()
    }

    _redraw() {
        if (!this._map) {
            return
        }
        var data = [],
            r = this._heat._r,
            size = this._map.getSize(),
            bounds = new Bounds(new Point(-r, -r), size.add([r, r])),
            max = this.options.max === undefined ? 1 : this.options.max,
            maxZoom =
                this.options.maxZoom === undefined ? this._map.getMaxZoom() : this.options.maxZoom,
            v = 1 / Math.pow(2, Math.max(0, Math.min(maxZoom - this._map.getZoom(), 12))),
            cellSize = r / 2,
            grid = [],
            panePos = this._map._getMapPanePos(),
            offsetX = panePos.x % cellSize,
            offsetY = panePos.y % cellSize,
            i,
            len,
            p,
            cell,
            x,
            y,
            j,
            len2,
            k

        // console.time('process');
        for (i = 0, len = this._latlngs.length; i < len; i++) {
            p = this._map.latLngToContainerPoint(this._latlngs[i])
            if (bounds.contains(p)) {
                x = Math.floor((p.x - offsetX) / cellSize) + 2
                y = Math.floor((p.y - offsetY) / cellSize) + 2

                var alt =
                    this._latlngs[i].alt !== undefined
                        ? this._latlngs[i].alt
                        : this._latlngs[i][2] !== undefined
                          ? +this._latlngs[i][2]
                          : 1
                k = alt * v

                grid[y] = grid[y] || []
                cell = grid[y][x]

                if (!cell) {
                    grid[y][x] = [p.x, p.y, k]
                } else {
                    cell[0] = (cell[0] * cell[2] + p.x * k) / (cell[2] + k) // x
                    cell[1] = (cell[1] * cell[2] + p.y * k) / (cell[2] + k) // y
                    cell[2] += k // cumulated intensity value
                }
            }
        }

        for (i = 0, len = grid.length; i < len; i++) {
            if (grid[i]) {
                for (j = 0, len2 = grid[i].length; j < len2; j++) {
                    cell = grid[i][j]
                    if (cell) {
                        data.push([
                            Math.round(cell[0]),
                            Math.round(cell[1]),
                            Math.min(cell[2], max)
                        ])
                    }
                }
            }
        }
        // console.timeEnd('process');

        // console.time('draw ' + data.length);
        this._heat.data(data).draw(this.options.minOpacity)
        // console.timeEnd('draw ' + data.length);

        this._frame = null
    }

    _animateZoom(e) {
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map
                ._getCenterOffset(e.center)
                ._multiplyBy(-scale)
                .subtract(this._map._getMapPanePos())

        if (DomUtil.setTransform) {
            DomUtil.setTransform(this._canvas, offset, scale)
        } else {
            this._canvas.style['transform'] =
                DomUtil.getTranslateString(offset) + ' scale(' + scale + ')'
        }
    }
}
