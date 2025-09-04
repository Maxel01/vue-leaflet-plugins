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
