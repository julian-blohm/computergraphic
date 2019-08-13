import Fractral from './Fractal'
import Scene from '../scene/Scene'

export default class PythagorasTree extends Fractral {
  private ctx: any
  private f: number

  public constructor(ctx: any, level: number, type: string, scene: Scene, name: string, color: string) {
    super(type, scene, name, color, level)
    this.ctx = ctx
  }

  public init(): void {
    this.calcPythagorasTree(275, 500, 375, 500, 0)
  }

  private calcPythagorasTree(x1: number, y1: number, x2: number, y2: number, level: number): void {
    if (level === this.getLevel) {
      return
    }
    let dx = x2 - x1
    let dy = y1 - y2
    let x3 = x2 - dy
    let y3 = y2 - dx
    let x4 = x1 - dy
    let y4 = y1 - dx
    let x5 = x4 + 0.5 * (dx - dy)
    let y5 = y4 - 0.5 * (dx + dy)
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.lineTo(x3, y3)
    this.ctx.lineTo(x4, y4)
    this.ctx.closePath()

    this.ctx.fillStyle = this.HSVtoRGB(1 + level * 0.02, 1, 1)
    this.ctx.fill()
    this.ctx.strokeStyle = 'lightGray'
    this.ctx.stroke()

    this.ctx.moveTo(x3, y3)
    this.ctx.beginPath()
    this.ctx.lineTo(x4, y4)
    this.ctx.lineTo(x5, y5)
    this.ctx.closePath()

    this.ctx.fillStyle = this.HSVtoRGB(1 + level * 0.035, 1, 1)
    this.ctx.fill()
    this.ctx.strokeStyle = 'lightGray'
    this.ctx.stroke()

    this.calcPythagorasTree(x4, y4, x5, y5, level + 1)
    this.calcPythagorasTree(x5, y5, x3, y3, level + 1)
  }

  /* copied from stackoverflow */
  private HSVtoRGB(h: number, s: number, v: number): string {
    let r, g, b, i, f, p, q, t

    i = Math.floor(h * 6)
    f = h * 6 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0:
        ;(r = v), (g = t), (b = p)
        break
      case 1:
        ;(r = q), (g = v), (b = p)
        break
      case 2:
        ;(r = p), (g = v), (b = t)
        break
      case 3:
        ;(r = p), (g = q), (b = v)
        break
      case 4:
        ;(r = t), (g = p), (b = v)
        break
      case 5:
        ;(r = v), (g = p), (b = q)
        break
    }
    return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')'
  }
}
