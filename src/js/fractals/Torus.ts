import Fractral from './Fractal'
import * as _three from 'three'

export default class Torus extends Fractral {
  public init(): void {
    var geometry = new _three.TorusGeometry(10, 3, 13, Math.pow(this.getLevel, 2) * 10 + 10)
    var material = new _three.MeshBasicMaterial({ color: this.getColor, wireframe: true, wireframeLinewidth: 1 })
    var torus = new _three.Mesh(geometry, material)

    //var cube = new _three.Mesh(geometry, material)
    const scene = this.getMainScene.getScene
    const camera = this.getMainScene.getCamera
    // Add cube to Scene
    scene.add(torus)
    camera.position.set(-25, 40, 50)
  }
}
