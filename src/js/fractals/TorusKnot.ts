import Fractral from './Fractal'
import * as _three from 'three'
import { Scene } from 'three';

export default class TorusKnot extends Fractral {

  public init(): void {

    var geometry = new _three.TorusKnotGeometry(10, 3, Math.pow(this.getLevel, 2)*10+10, Math.pow(this.getLevel, 2)*3+5)
    var material = new _three.MeshBasicMaterial({color: this.getColor, wireframe: true, wireframeLinewidth: 1})
    var torusKnot = new _three.Mesh(geometry, material)

    const scene = this.getMainScene.getScene
    const camera = this.getMainScene.getCamera

    scene.add(torusKnot)
    camera.position.set(-25, 40, 50)
    
  }
}
