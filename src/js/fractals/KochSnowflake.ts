import Fractral from './Fractal'
import Scene from '../scene/Scene'

export default class KochSnowflake extends Fractral {
  private ctx: any

  public constructor(ctx: any, level: number, info: string, type: string, scene: Scene, name: string, color: string) {
    super(info, type, scene, name, color, level)
    this.ctx = ctx
  }

  private centerCanvas(): void {
    let canvas = document.getElementById('normalCanvas')
    canvas.style.marginLeft = '25%'
    canvas.style.marginTop = '10%'
  }

  public init(): void {
    this.centerCanvas()
    this.ctx.beginPath()
    this.ctx.stroke()
    this.ctx.closePath()
    this.calcKochCurve([50, 150], [500, 150], this.getLevel)
    this.calcKochCurve([270, 490], [50, 150], this.getLevel)
    this.calcKochCurve([500, 150], [270, 490], this.getLevel)
  }

  private calcKochCurve(A: number[], B: number[], level: number): void {
    if (level < 0) {
      return null
    }

    let C = this.divide(this.add(this.multiply(A, 2), B), 3)
    let D = this.divide(this.add(this.multiply(B, 2), A), 3)
    let F = this.divide(this.add(A, B), 2)

    let V1 = this.divide(this.minus(F, A), this.length(F, A))
    let V2 = [V1[1], -V1[0]]

    let E = this.add(this.multiply(V2, (Math.sqrt(3) / 6) * this.length(B, A)), F)

    this.line(A, B, this.getColor)

    if (level != 0) {
      for (var i = 0; i < 10; i++) this.line(C, D, 'black')
    }

    this.calcKochCurve(A, C, level - 1)
    this.calcKochCurve(C, E, level - 1)
    this.calcKochCurve(E, D, level - 1)
    this.calcKochCurve(D, B, level - 1)
  }

  private multiply(v: number[], num: number): number[] {
    return [v[0] * num, v[1] * num]
  }

  private divide(v: number[], num: number): number[] {
    return [v[0] / num, v[1] / num]
  }

  private add(a: number[], b: number[]): number[] {
    return [a[0] + b[0], a[1] + b[1]]
  }

  private minus(a: number[], b: number[]): number[] {
    return [a[0] - b[0], a[1] - b[1]]
  }

  private length(a: number[], b: number[]): number {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
  }

  private line(a: number[], b: number[], c: string): void {
    this.ctx.beginPath()
    this.ctx.strokeStyle = c
    this.ctx.moveTo(a[0], a[1])
    this.ctx.lineTo(b[0], b[1])
    this.ctx.stroke()
    this.ctx.closePath()
  }
}
