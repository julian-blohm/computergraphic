import Fractral from './Fractal'
import Scene from '../scene/Scene'

export default class BarnsleyFern extends Fractral {
  private ctx: any
  private x: number = 0
  private y: number = 0
  private canvas: any = document.getElementById('normalCanvas')
  private w: number = this.canvas.width
  private h: number = this.canvas.height

  public constructor(ctx: any, level: number, info: string, type: string, scene: Scene, name: string, color: string) {
    super(info, type, scene, name, color, level)
    this.ctx = ctx
  }

  private centerCanvas(): void {
    let canvas = document.getElementById('normalCanvas')
    canvas.style.marginLeft = '0'
    canvas.style.marginTop = '0'
  }

  public init(): void {
    this.centerCanvas()
    this.calcBarnsleyFern()
  }

  private calcBarnsleyFern(): void {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.ctx.fillStyle = this.getColor
    this.ctx.translate(this.w / 2, this.h / 2)
    for (var i = 0; i < this.getLevel; i++) {
      var random = Math.random() * 100
      if (random < 1) {
        this.first()
      } else if (random < 86) {
        this.scond()
      } else if (random < 94) {
        this.third()
      } else {
        this.fourth()
      }
    }
  }

  private first(): void {
    var xn = this.x
    var yn = this.y
    var zx = 0
    var zy = 0.16 * yn
    this.drawPoint(zx, zy)
  }

  private scond(): void {
    var xn = this.x
    var yn = this.y
    var zx = 0.85 * xn + 0.04 * yn
    var zy = -0.04 * xn + 0.85 * yn + 1.6
    this.drawPoint(zx, zy)
  }

  private third(): void {
    var xn = this.x
    var yn = this.y
    var zx = 0.2 * xn - 0.26 * yn
    var zy = 0.23 * xn + 0.22 * yn + 1.6
    this.drawPoint(zx, zy)
  }

  private fourth(): void {
    var xn = this.x
    var yn = this.y
    var zx = -0.15 * xn + 0.28 * yn
    var zy = 0.26 * xn + 0.24 * yn + 0.44
    this.drawPoint(zx, zy)
  }

  private drawPoint(xn: number, yn: number): void {
    this.x = xn
    this.y = yn
    this.ctx.fillRect(xn * 20, -yn * 20, 1, 1)
  }
}
