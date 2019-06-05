import Fractral from './Fractal'
import * as _three from 'three'

export default class Cube extends Fractral {
  //Test Cube
  public init(): void {
    // Create a Cube Mesh with basic material
    var geometry = new _three.BoxGeometry(1, 1, 1)
    var material = new _three.MeshBasicMaterial({ color: this.getColor })
    var cube = new _three.Mesh(geometry, material)
    const scene = this.getMainScene.getScene
    const camera = this.getMainScene.getCamera
    // Add cube to Scene
    scene.add(cube)
    camera.position.set(-5, 4, 5)
  }
}
