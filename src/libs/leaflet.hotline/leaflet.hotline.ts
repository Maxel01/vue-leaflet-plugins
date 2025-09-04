import {
    type Bounds,
    Canvas,
    LatLng,
    type LatLngExpression,
    LineUtil,
    type Map,
    Point,
    Polyline,
    type PolylineOptions,
    type Renderer
} from 'leaflet'

declare module 'leaflet' {
    namespace LineUtil {
        function _getBitCode(point: Point, bounds: Bounds): number

        function _getEdgeIntersection(
            a: Point,
            b: Point,
            code: number,
            bounds: Bounds,
            round: boolean | undefined
        ): Point
    }
}

export class Point3D extends Point {
    z?: number | undefined

    constructor(x: number, y: number, z?: number, round?: boolean) {
        super(x, y, round)
        this.z = z
    }
}

export type ColorPalette = {
    [value: number]: string
}

class HotlinePalette {
    private _palette: Uint8ClampedArray<ArrayBufferLike> | undefined

    constructor() {
        this.palette({ 0.0: 'green', 0.5: 'yellow', 1.0: 'red' })
    }

    /**
     * Sets the palette gradient.
     * @param {Object.<number, string>} palette  - Gradient definition.
     * e.g. { 0.0: 'white', 1.0: 'black' }
     */
    palette(palette: ColorPalette) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Canvas not supported')
        const gradient = ctx.createLinearGradient(0, 0, 0, 256)

        canvas.width = 1
        canvas.height = 256

        for (const i in palette) {
            gradient.addColorStop(Number(i), palette[i]!)
        }
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 1, 256)

        this._palette = ctx.getImageData(0, 0, 1, 256).data
    }

    /**
     * Gets the RGB values of a given z value of the current palette.
     * @param {number} value - Value to get the color for, should be between min and max.
     * @param min
     * @param max
     * @returns {Array.<number>} The RGB values as an array [r, g, b]
     */
    getRGBForValue(value: number | undefined, min: number, max: number): number[] {
        if (value === undefined) value = min
        const valueRelative = Math.min(Math.max((value - min) / (max - min), 0), 0.999)
        const paletteIndex = Math.floor(valueRelative * 256) * 4
        if (!this._palette) return []
        return [
            this._palette[paletteIndex]!,
            this._palette[paletteIndex + 1]!,
            this._palette[paletteIndex + 2]!
        ]
    }
}

const HotlineUtil = {
    _lastCode: undefined as number | undefined,
    /**
     * This is just a copy of the original Leaflet version that support a third z coordinate.
     * @see {@link http://leafletjs.com/reference.html#lineutil-clipsegment|Leaflet}
     */
    clipSegment: function (
        a: Point3D,
        b: Point3D,
        bounds: Bounds,
        useLastCode?: boolean | number,
        round?: boolean
    ): Point[] | false {
        let codeA = useLastCode ? this._lastCode : LineUtil._getBitCode(a, bounds),
            codeB = LineUtil._getBitCode(b, bounds),
            codeOut,
            p,
            newCode

        // save 2nd code to avoid calculating it on the next segment
        this._lastCode = codeB

        while (true) {
            // if a,b is inside the clip window (trivial accept)
            if (!(codeA! | codeB)) {
                return [a, b]
            }

            // if a,b is outside the clip window (trivial reject)
            if (codeA! & codeB) {
                return false
            }

            // other cases
            codeOut = codeA || codeB
            p = LineUtil._getEdgeIntersection(a, b, codeOut, bounds, round) as Point3D
            newCode = LineUtil._getBitCode(p, bounds)

            if (codeOut === codeA) {
                p.z = a.z
                a = p
                codeA = newCode
            } else {
                p.z = b.z
                b = p
                codeB = newCode
            }
        }
    }
}

class HotlineCanvasRenderer extends Canvas {
    private _palette: HotlinePalette
    declare _drawing: boolean
    declare _ctx: CanvasRenderingContext2D
    declare _bounds: Bounds

    constructor(options: HotlineOptions) {
        super(options)
        this._palette = new HotlinePalette()
    }

    _updatePoly(layer: Hotline) {
        if (!this._drawing) {
            return
        }

        const parts = layer._parts
        if (!parts.length) {
            return
        }

        const options: HotlineOptions = layer.options

        this._palette.palette(options.palette!)
        this._ctx.lineCap = 'round'

        this.draw(parts, options)
    }

    /**
     * Draws the paths.
     */
    draw(parts: Point[][], options: HotlineOptions) {
        const ctx: CanvasRenderingContext2D = this._ctx

        ctx.globalCompositeOperation = 'source-over'
        ctx.lineCap = 'round'

        this._drawOutline(parts, options)
        this._drawHotline(parts, options)
    }

    /**
     * Draws the outline of the graphs.
     * @private
     */
    _drawOutline(parts: Point[][], options: HotlineOptions) {
        const ctx: CanvasRenderingContext2D = this._ctx
        if (options.outlineWidth) {
            ctx.lineWidth = options.weight! + 2 * options.outlineWidth
            ctx.strokeStyle = options.outlineColor!
            for (const path of parts) {
                for (let j = 1; j < path.length; j++) {
                    const pointStart = path[j - 1]!
                    const pointEnd = path[j]!
                    ctx.beginPath()
                    ctx.moveTo(pointStart.x, pointStart.y)
                    ctx.lineTo(pointEnd.x, pointEnd.y)
                    ctx.stroke()
                }
            }
        }
    }

    /**
     * Draws the color encoded hotline of the graphs.
     * @private
     */
    _drawHotline(parts: Point3D[][], options: HotlineOptions) {
        const ctx: CanvasRenderingContext2D = this._ctx
        ctx.lineWidth = options.weight!
        for (const path of parts) {
            for (let j = 1; j < path.length; j++) {
                const pointStart = path[j - 1]!
                const pointEnd = path[j]!

                // Create a gradient for each segment, pick start and end colors from palette gradient
                const gradient = ctx.createLinearGradient(
                    pointStart.x,
                    pointStart.y,
                    pointEnd.x,
                    pointEnd.y
                )
                const gradientStartRGB = this._palette.getRGBForValue(
                    pointStart.z,
                    options.min!,
                    options.max!
                )
                const gradientEndRGB = this._palette.getRGBForValue(
                    pointEnd.z,
                    options.min!,
                    options.max!
                )
                gradient.addColorStop(0, 'rgb(' + gradientStartRGB.join(',') + ')')
                gradient.addColorStop(1, 'rgb(' + gradientEndRGB.join(',') + ')')

                ctx.strokeStyle = gradient
                ctx.beginPath()
                ctx.moveTo(pointStart.x, pointStart.y)
                ctx.lineTo(pointEnd.x, pointEnd.y)
                ctx.stroke()
            }
        }
    }
}

export interface HotlineOptions extends PolylineOptions {
    renderer?: Renderer
    weight?: number
    outlineWidth?: number
    outlineColor?: string
    min?: number
    max?: number
    palette?: ColorPalette
}

export class Hotline extends Polyline {
    declare options: HotlineOptions
    declare _parts: Point[][]
    declare _rings: Point[][]
    declare _renderer: HotlineCanvasRenderer

    static defaultOptions = {
        weight: 5,
        outlineWidth: 1,
        outlineColor: 'black',
        min: 0,
        max: 1,
        palette: {
            0.0: 'green',
            0.5: 'yellow',
            1.0: 'red'
        }
    }

    constructor(latlngs: LatLngExpression[] | LatLngExpression[][], options?: HotlineOptions) {
        super(latlngs, { ...Hotline.defaultOptions, ...options })
    }

    beforeAdd(map: Map): this {
        this.options.renderer = new HotlineCanvasRenderer(this.options)
        return super.beforeAdd!(map)
    }

    setStyle(style: HotlineOptions): this {
        return super.setStyle(style)
    }

    /**
     * Just like the Leaflet version, but with support for a z coordinate.
     */
    _projectLatlngs(latlngs: LatLng[] | LatLng[][], result: Point[][], projectedBounds: Bounds) {
        const flat = latlngs[0] instanceof LatLng

        if (flat) {
            const ring = (latlngs as LatLng[]).map((latlng) => {
                const point = this._map.latLngToLayerPoint(latlng) as Point3D
                point.z = latlng.alt
                return point
            })
            result.push(ring)
        } else {
            ;(latlngs as LatLng[][]).forEach((latlng) =>
                this._projectLatlngs(latlng, result, projectedBounds)
            )
        }
    }

    /**
     * Just like the Leaflet version, but uses `Util.clipSegment()`.
     */
    _clipPoints() {
        if (this.options.noClip) {
            this._parts = this._rings
            return
        }

        this._parts = []

        const parts = this._parts,
            bounds = this._renderer._bounds
        let i, j, k, len, len2, segment, points

        for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
            points = this._rings[i] as Point[]

            for (j = 0, len2 = points.length; j < len2 - 1; j++) {
                segment = HotlineUtil.clipSegment(points[j]!, points[j + 1]!, bounds, j, true)

                if (!segment) {
                    continue
                }

                parts[k] = parts[k] || []
                parts[k]!.push(segment[0]!)

                // if segment goes out of screen, or it's the last one, it's the end of the line part
                if (segment[1] !== points[j + 1] || j === len2 - 2) {
                    parts[k]!.push(segment[1]!)
                    k++
                }
            }
        }
    }

    _clickTolerance() {
        return this.options.weight! / 2 + this.options.outlineWidth! + 10
    }
}
