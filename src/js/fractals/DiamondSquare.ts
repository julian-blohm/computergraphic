import Fractral from './Fractal'
import * as _three from 'three'
import Scene from '../scene/Scene'

export default class DiamindSquare extends Fractral {
  private width: number
  private height: number
  private segmentsSqu: number
  private smoothSqu: number
  private deepth: number
  private terrain: number[][]

  public init(): void {
    const scene = this.getMainScene.getScene
    const camera = this.getMainScene.getCamera
    // Add cube to Scene
    // Add light to scene
    const spotLight = new _three.SpotLight(0xffffff, 0.9)
    const ambLight = new _three.AmbientLight(0xffffff, 0.3)
    spotLight.position.set(0, 100, 50)
    scene.add(spotLight)
    scene.add(ambLight)
    camera.position.set(0, 180, 875)
    this.initTerrain()
    this.renderTerrain(this.calcDiamonSquare())
  }

  private renderTerrain(terrain: number[][]): void {
    let geometry = new _three.PlaneGeometry(this.width, this.height, this.segmentsSqu, this.segmentsSqu)
    let geometryGround = new _three.PlaneGeometry(this.width, this.height, this.segmentsSqu, this.segmentsSqu)
    var index = 0
    for (var i = 0; i <= this.segmentsSqu; i++) {
      for (var j = 0; j <= this.segmentsSqu; j++) {
        geometry.vertices[index].z = terrain[i][j]
        geometryGround.vertices[index].z = terrain[i][j] + this.deepth
        index++
      }
    }
    let material = new _three.MeshBasicMaterial({
      color: this.getColor,
      wireframe: this.getFill,
    })

    let materialGround = new _three.MeshBasicMaterial({
      color: this.getColor,
      wireframe: this.getFill,
    })
    let mesh = new _three.Mesh(geometry, material)

    let meshGround = new _three.Mesh(geometryGround, materialGround)
    const scene = this.getMainScene.getScene
    scene.add(meshGround)
    scene.add(mesh)
  }

  private initTerrain(): void {
    this.terrain = []
    this.width = 1000
    this.height = 500
    this.segmentsSqu = parseInt((document.getElementById('level') as HTMLTextAreaElement).value)
    this.deepth = -1
    this.smoothSqu = parseInt((document.getElementById('smooth') as HTMLTextAreaElement).value)
    //## Austauschen mit var
    for (var i = 0; i <= this.segmentsSqu; i++) {
      this.terrain[i] = []
      for (var j = 0; j <= this.segmentsSqu; j++) {
        this.terrain[i][j] = 0
      }
    }
  }

  private calcDiamonSquare(): number[][] {
    let size = this.segmentsSqu + 1
    for (var length = this.segmentsSqu; length >= 2; length /= 2) {
      let half = Math.floor(length / 2)
      this.smoothSqu /= 2

      //neue potenzen
      for (var x = 0; x < this.segmentsSqu; x += length) {
        for (var y = 0; y < this.segmentsSqu; y += length) {
          var average =
            this.terrain[x][y] + // top left
            this.terrain[x + length][y] + // top right
            this.terrain[x][y + length] + // lower left
            this.terrain[x + length][y + length] // lower right
          average /= 4
          average += 2 * this.smoothSqu * Math.random() - this.smoothSqu

          this.terrain[x + half][y + half] = average
        }
      }
      for (var x = 0; x < this.segmentsSqu; x += half) {
        for (var y = (x + half) % length; y < this.segmentsSqu; y += length) {
          var average =
            this.terrain[(x - half + size) % size][y] + // middle left
            this.terrain[(x + half) % size][y] + // middle right
            this.terrain[x][(y + half) % size] + // middle top
            this.terrain[x][(y - half + size) % size] // middle bottom
          average /= 4
          average += 2 * this.smoothSqu * Math.random() - this.smoothSqu

          this.terrain[x][y] = average

          // values on the top and right edges
          if (x === 0) this.terrain[this.segmentsSqu][y] = average
          if (y === 0) this.terrain[x][this.segmentsSqu] = average
        }
      }
    }
    return this.terrain
  }
}
