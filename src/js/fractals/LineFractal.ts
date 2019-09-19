import Fractral from './Fractal'
import Scene from '../scene/Scene'

export default class LineFractal extends Fractral {
  private ctx: any
  private f: number
  private canvas: any = document.getElementById('normalCanvas')
  private w: number = this.canvas.width
  private h: number = this.canvas.height

  public constructor(ctx: any, level: number, info: string, type: string, scene: Scene, name: string, color: string) {
    super(info, type, scene, name, color, level)
    this.f = Math.sqrt(2)
    this.ctx = ctx
  }
  private centerCanvas(): void {
    let canvas = document.getElementById('normalCanvas')
    canvas.style.marginLeft = '25%'
    canvas.style.marginTop = '10%'
  }

  public init(): void {
    this.centerCanvas()
    this.hor(300, 90, 250)
  }

  private hor(x: number, y: number, len: number): void {
    var _this = this
    if (len < 10) return
    _this.ctx.beginPath()
    _this.ctx.moveTo(x - len / 2, y)
    _this.ctx.lineTo(x + len / 2, y)
    _this.ctx.strokeStyle = _this.getColor
    _this.ctx.stroke()

    setTimeout(function(): void {
      _this.ver(x - len / 2, y, len / _this.f)
      _this.ver(x + len / 2, y, len / _this.f)
    }, 500)
  }

  private ver(x: number, y: number, len: number): void {
    var _this = this
    if (len < 10) return
    _this.ctx.beginPath()
    _this.ctx.moveTo(x, y - len / 2)
    _this.ctx.lineTo(x, y + len / 2)
    _this.ctx.strokeStyle = _this.getColor
    _this.ctx.stroke()

    setTimeout(function(): void {
      _this.hor(x, y - len / 2, len / _this.f)
      _this.hor(x, y + len / 2, len / _this.f)
    }, 500)
  }
}
