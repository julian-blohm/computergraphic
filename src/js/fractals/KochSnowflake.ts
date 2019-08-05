import Fractral from './Fractal'
import Scene from '../scene/Scene'

export default class KochSnowflake extends Fractral {

  private iterations: number
  private snowflakeSize: number
  private snowflakeChildScale: number


  private snowflakeVertices: number
  private snowflakeVertexBuffer: number

  private triangle1Side: number
  private triangle2Side: number




  public constructor(type: string, scene: Scene, name: string, color: string, level: number, iterations: number) {
    super(type, scene, name, color, level)
    this.iterations = iterations
    this.snowflakeSize = 1.5
    this.snowflakeChildScale = 1 / 3


  }

  public init(): void {

  }

  private initSnowflakeVertices():void {

    this.triangle1Side = this.snowflakeSize
    



  }

  
}
