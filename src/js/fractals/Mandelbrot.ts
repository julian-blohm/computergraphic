import Fractral from './Fractal'
import * as _three from 'three'
import Scene from '../scene/Scene'

export default class MandelbrotSet extends Fractral {
  private ctx: any
  private zoomX: any
  private zoomY: any
  private zoomFactor: any

  public update(): void {
    const zoomFactor = (document.getElementById('zoomFactor') as HTMLTextAreaElement).value
    const zoomX = (document.getElementById('zoomX') as HTMLTextAreaElement).value
    const zoomY = (document.getElementById('zoomY') as HTMLTextAreaElement).value
    this.zoomX = zoomX
    this.zoomY = zoomY
    this.zoomFactor = zoomFactor
  }

  public constructor(ctx: any, level: number, info: string, type: string, scene: Scene, name: string, color: string) {
    super(info, type, scene, name, color, level)
    this.ctx = ctx
    this.zoomX = 2
    this.zoomY = 1.5
    this.zoomFactor = 2000
  }

  public init(): void {
    let myCanvas = document.getElementById('threeCanvas')
    console.log(myCanvas)
    let ctx = this.ctx
    console.log(ctx)

    var zoomFactor = 200
    var zoomX = 2
    var zoomY = 1.5
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    for (var x = 0; x < myCanvas.width; x++) {
      // @ts-ignore: I don't care that it might not be a HTML Canvas Element
      for (var y = 0; y < myCanvas.height; y++) {
        var belongsToSet = this.checkIfInSet(x / zoomFactor - zoomX, y / zoomFactor - zoomY)
        if (belongsToSet == 0) {
          ctx.fillStyle = '#000'
          ctx.fillRect(x, y, 1, 1) // Draw a black pixel
        } else {
          ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)'
          ctx.fillRect(x, y, 1, 1) // Draw a colorful pixel
        }
      }
    }
  }

  private checkIfInSet(x: number, y: number): number {
    var realComponentOfResult = x
    var imaginaryComponentOfResult = y
    for (var i = 0; i < this.getLevel; i++) {
      var tempRealComponent =
        realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x
      var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult + y
      realComponentOfResult = tempRealComponent
      imaginaryComponentOfResult = tempImaginaryComponent

      // Return a number as a percentage
      if (realComponentOfResult * imaginaryComponentOfResult > 5) return (i / this.getLevel) * 100
    }
    return 0 // Return zero if in set
  }

  public get getZoomFactor(): number {
    return this.zoomFactor
  }

  public get getZoomX(): number {
    return this.zoomX
  }

  public get getZoomY(): number {
    return this.zoomY
  }

  //SET Methods
  private set setZoomFactor(zoomFactor: number) {
    this.zoomFactor = zoomFactor
  }

  private set setZoomX(zoomX: number) {
    this.zoomX = zoomX
  }

  private set setZoomY(zoomY: number) {
    this.zoomY = zoomY
  }
}
