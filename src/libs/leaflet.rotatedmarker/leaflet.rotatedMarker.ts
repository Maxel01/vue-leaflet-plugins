/*
The MIT License (MIT)

Copyright (c) 2015 Benjamin Becquet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { type LatLngExpression, Marker, type MarkerOptions, Point, Util } from 'leaflet'

export interface RotatedMarkerOptions extends MarkerOptions {
    rotationAngle?: number
    rotationOrigin?: string
}

export class RotatedMarker extends Marker {
    declare options: RotatedMarkerOptions
    declare update: () => void

    constructor(latlng: LatLngExpression, options: RotatedMarkerOptions = {}) {
        super(latlng, options)
        Util.setOptions(this, options)

        const iconOptions = options.icon?.options
        const iconAnchor = iconOptions?.iconAnchor

        // @ts-ignore
        const anchorStr = iconAnchor ? `${iconAnchor[0]}px ${iconAnchor[1]}px` : undefined

        this.options.rotationOrigin = options.rotationOrigin || anchorStr || 'center bottom'
        this.options.rotationAngle = options.rotationAngle || 0

        this.on('drag', (e) => {
            ;(e.target as RotatedMarker)._applyRotation()
        })
    }

    _setPos(pos: Point) {
        // @ts-ignore
        super._setPos(pos)
        this._applyRotation()
    }

    private _applyRotation() {
        if (this.options.rotationAngle) {
            const _icon = super.getElement()
            if (_icon) {
                _icon.style.transformOrigin = this.options.rotationOrigin || ''
                _icon.style.transform += ` rotate(${this.options.rotationAngle}deg)`
            }
        }
    }

    setRotationAngle(angle: number): this {
        this.options.rotationAngle = angle
        this.update()
        return this
    }

    setRotationOrigin(origin: string): this {
        this.options.rotationOrigin = origin
        this.update()
        return this
    }
}
