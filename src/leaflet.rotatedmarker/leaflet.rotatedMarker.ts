import {
    type LatLngExpression,
    Marker,
    type MarkerOptions,
    Point,
    type PointExpression,
    Util
} from 'leaflet'

export interface RotatedMarkerOptions extends MarkerOptions {
    rotationAngle?: number
    rotationOrigin?: PointExpression
}

export class RotatedMarker extends Marker {
    constructor(latlng: LatLngExpression, options: RotatedMarkerOptions = {}) {
        super(latlng, options)
        Util.setOptions(this, options)

        const iconOptions = options.icon?.options
        const iconAnchor = iconOptions?.iconAnchor

        const anchorStr = iconAnchor ? `${iconAnchor[0]}px ${iconAnchor[1]}px` : undefined

        this.options.rotationOrigin = options.rotationOrigin || anchorStr || 'center bottom'
        this.options.rotationAngle = options.rotationAngle || 0

        this.on('drag', (e) => {
            ;(e.target as RotatedMarker)._applyRotation()
        })
    }

    _initIcon() {
        super['_initIcon']()
    }

    _setPos(pos: Point) {
        super['_setPos'](pos)
        this._applyRotation()
    }

    private _applyRotation() {
        if (this.options.rotationAngle) {
            this._icon.style['transformOrigin'] = this.options.rotationOrigin
            this._icon.style['transform'] += ` rotate(${this.options.rotationAngle}deg)`
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
