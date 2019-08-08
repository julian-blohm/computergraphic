import Fractal from './Fractal'
import * as _three from 'three'
import Scene from '../scene/Scene'

export default class SierpinskiPyramide extends Fractal {
  private x: number
  private y: number
  private z: number
  private base: number
  private height: number

  public constructor(
    x: number,
    y: number,
    z: number,
    base: number,
    height: number,
    level: number,
    type: string,
    scene: Scene,
    name: string,
    color: string,
  ) {
    super(type, scene, name, color, level)
    this.x = x
    this.y = y
    this.z = z
    this.base = base
    this.height = height
  }

  public init(): void {
    console.log('INIT')
    const scene = this.getMainScene.getScene
    const camera = this.getMainScene.getCamera
    this.calcSierpinski(scene, this.x, this.y, this.z, this.base, this.height, this.getLevel)
    const spotLight = new _three.SpotLight(0xffffff, 0.9)
    const ambLight = new _three.AmbientLight(0xffffff, 0.3)
    spotLight.position.set(0, 100, 50)
    spotLight.castShadow = true
    scene.add(spotLight)
    scene.add(ambLight)
    camera.position.set(-5, 4, 5)
  }

  private calcSierpinski(
    scene: _three.Scene,
    x: number,
    y: number,
    z: number,
    b: number,
    h: number,
    it: number,
    lvl = 0,
  ): void {
    if (it === lvl) {
      console.log('IT === LVL')
      scene.add(this.calcPyramid(x, y, z, b, h))
    } else {
      console.log('ELSE -----> IT === LVL')
      const nb = b / 2
      const nh = h / 2

      const childs = [[0, nh / 2, 0], [-nb, -nh / 2, 0], [0, -nh / 2, nb], [nb, -nh / 2, 0], [0, -nh / 2, -nb]]

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      childs.forEach(point => {
        console.log('FOREACH LOOP')
        this.calcSierpinski(scene, x + point[0], y + point[1], z + point[2], nb, nh, it, lvl + 1)
      })
    }
  }

  private calcPyramid(x: number, y: number, z: number, base: number, height: number): _three.Mesh {
    console.log('CLACPYRAMID')
    const material = new _three.MeshPhongMaterial({ color: this.getColor, flatShading: true, shininess: 2 })
    const geometry = new _three.ConeBufferGeometry(base, height, 4, 1)
    const mesh = new _three.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    mesh.receiveShadow = true
    return mesh
  }
}
