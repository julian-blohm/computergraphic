import Fractral from './Fractal'
import Scene from '../scene/Scene'

  interface vector2D {x: number, y: number}

export default class KochSnowflake extends Fractral {

  private vectorA: vector2D
  private vectorB: vector2D
  private vectorC: vector2D

  private ctx: any
  
  public constructor(ctx: any, level: number, type: string, scene: Scene, name: string, color: string) {
    super(type, scene, name, color, level)
    this.ctx = ctx

    this.vectorA = {
      x: 50,
      y: 150
    }
   
    this.vectorB = {
      x: 270,
      y: 490
    }
  
    this.vectorC = {
      x: 500,
      y: 150
    }

  }

  public init() {



    this.snowFlake(this.vectorA, this.vectorC, 5)
    this.snowFlake(this.vectorB, this.vectorA, 5)
    this.snowFlake(this.vectorC, this.vectorB, 5)
  }

  private snowFlake(a: vector2D, b: vector2D, depth: number) {
    var _this = this
    
    let c = _this.divide(_this.add(_this.multiply(a, 2), b), 3)
    let d = _this.divide(_this.add(_this.multiply(b, 2), a), 3)
    let f = _this.divide(_this.add(a, b), 2)

    let v1 = _this.divide(_this.minus(f, a), _this.length(f, a))
    let v2: vector2D
    v2 = {
      x: -v1.x,
      y: v1.y
    }

    var e = _this.add(_this.multiply(v2, Math.sqrt(3)/6 * _this.length(b, a)), f)

    _this.drawLine(a, b)

    if (depth !=0){

      for (var i=0;i<10;i++) {
        _this.drawLine(c, d)
      }
    }  

    this.snowFlake(a, c, depth-1)
    this.snowFlake(c, e, depth-1)
    this.snowFlake(e, d, depth-1)
    this.snowFlake(d, b, depth-1)

  }

  private multiply(v: vector2D, num: number): vector2D {
    v.x = v.x*num
    v.y = v.y*num

    return v
  }

  private divide(v: vector2D, num: number): vector2D {
    v.x = v.x/num
    v.y = v.y/num

    return v
  }

  private add(a: vector2D, b: vector2D): vector2D {
    let c: vector2D
    c = {
      x: a.x + b.x,
      y: a.y + b.y
    }

    return c
  }

  private minus(a: vector2D, b: vector2D): vector2D {
    let c: vector2D
    c = {
      x: a.x - b.x,
      y: a.y - b.y
    }

    return c
  }

  private length(a: vector2D, b: vector2D) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }


  private drawLine(a: vector2D, b: vector2D) {
    var _this = this

    _this.ctx.beginPath()
    _this.ctx.strokeStyle = "#000000" //
    _this.ctx.moveTo(a.x, a.y)
    _this.ctx.lineTo(b.x, b.y)
    _this.ctx.stroke()
    _this.ctx.closePath()

  }
  
}
