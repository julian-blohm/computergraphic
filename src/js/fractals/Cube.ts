import Fractral from './Fractal'
import * as _three from 'three'

export default class Cube extends Fractral {
  //Test Cube
  public init(): void {
    // Create a Cube Mesh with basic material
    var geometry = new _three.BoxGeometry(
      2.5,
      2.5,
      2.5,
      Math.pow(this.getLevel, 2),
      Math.pow(this.getLevel, 2),
      Math.pow(this.getLevel, 2),
    )
    var material = new _three.MeshBasicMaterial({ color: this.getColor, wireframe: true, wireframeLinewidth: 1 })
    var cube = new _three.Mesh(geometry, material)
    const scene = this.getMainScene.getScene
    const camera = this.getMainScene.getCamera
    // Add cube to Scene
    scene.add(cube)
    camera.position.set(-5, 4, 5)
  }
}
