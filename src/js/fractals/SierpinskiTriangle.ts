import Fractral from './Fractal'
import Scene from '../scene/Scene'

export default class SierpinskiTriangle extends Fractral {
  private ctx: any
  private h: number
  private w: number
  private maxDepth: number

  public constructor(ctx: any, level: number, info: string, type: string, scene: Scene, name: string, color: string) {
    super(info, type, scene, name, color, level)
    this.ctx = ctx
    this.w = 600
    // Compute the height of the canvas to let an equilateral triangle
    // fit into it. Pythagoras is your friend here.
    this.h = (Math.sqrt(3) / 2) * this.w
    this.maxDepth = 10
  }

  private centerCanvas(): void {
    let canvas = document.getElementById('normalCanvas')
    canvas.style.marginLeft = '25%'
    canvas.style.marginTop = '10%'
  }

  public init(): void {
    this.centerCanvas()
    this.calcSierpinskiTriangle()
  }

  private calcSierpinskiTriangle(): void {
    this.ctx.clearRect(0, 0, this.w, this.h)

    let x0 = 0,
      y0 = this.h - 1
    let x1 = this.w,
      y1 = this.h - 1
    let x2 = this.w / 2,
      y2 = 0
    this.ctx.fillStyle = this.getColor
    this.drawTriangle(x0, y0, x1, y1, x2, y2)
    this.ctx.fillStyle = 'black'
    this.removeCenterTriangle(x0, y0, x1, y1, x2, y2, this.getLevel)
  }

  private drawTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath()
    this.ctx.moveTo(x0, y0)
    this.ctx.lineTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.lineTo(x0, y0)
    this.ctx.fill()
  }

  private removeCenterTriangle(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    depth: number,
  ): void {
    if (depth > 0) {
      // Midpoint coordinates
      let x01 = (x0 + x1) / 2,
        y01 = (y0 + y1) / 2
      let x02 = (x0 + x2) / 2,
        y02 = (y0 + y2) / 2
      let x12 = (x1 + x2) / 2,
        y12 = (y1 + y2) / 2
      // Remove the center triangle
      this.drawTriangle(x01, y01, x02, y02, x12, y12)
      if (depth > 1) {
        // Recursively remove center triangles for the
        // remaining filled triangles
        this.removeCenterTriangle(x0, y0, x01, y01, x02, y02, depth - 1)
        this.removeCenterTriangle(x01, y01, x1, y1, x12, y12, depth - 1)
        this.removeCenterTriangle(x02, y02, x12, y12, x2, y2, depth - 1)
      }
    }
  }
}
