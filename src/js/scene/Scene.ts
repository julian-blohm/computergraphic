import * as _three from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts'

import Cube from '../fractrals/Cube'
import Mengersponge from '../fractrals/Mengersponge'
import SierpinskiTriangle from '../fractrals/SierpinskiTriangle';

export default class Scene {
  private scene: _three.Scene
  private camera: _three.PerspectiveCamera
  private renderer: _three.WebGLRenderer
  private controller: OrbitControls
  private objectIndex: number
  private objectList: any[]
  private play: boolean

  public constructor() {
    this.scene = new _three.Scene()
    this.renderer = new _three.WebGLRenderer({ antialias: true })
    this.camera = new _three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 3000)
    this.controller = new OrbitControls(this.camera, this.renderer.domElement)
    this.objectList = []
    this.objectIndex = 0
    this.play = false
  }

  public init(): void {
    //renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.renderer.shadowMap.enabled = true
    this.controller.target.set(0, 0, 0)
    this.controller.update()
    document.body.appendChild(this.renderer.domElement)
    // light
    const ambLight = new _three.AmbientLight(0xffffff, 0.4)
    this.scene.add(ambLight)
    const dirLigth = new _three.DirectionalLight(0xffffff, 0.3)
    this.scene.add(dirLigth)
    const spotLight = new _three.SpotLight(0xffffff, 0.75)
    spotLight.position.set(100, 100, 50)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    this.scene.add(spotLight)
    this.addObjectsToList()
    this.renderObjectListMenu()
    this.renderObject()
  }

  private addObjectsToList(): void {
    this.objectList.push(new Cube(this, 'Cube 1', 'red'))
    this.objectList.push(new Mengersponge(-1.5, -1.5, -1.5, 3, 0, 3, this, 'Mengersponge', 'red'))
    this.objectList.push(new Cube(this, 'Cube 2', 'green'))
    this.objectList.push(new Cube(this, 'Cube 3'))
    this.objectList.push(new Cube(this, 'Cube 4', 'yellow'))
    this.objectList.push(new SierpinskiTriangle(-1.5, -1.5, -1.5, 3, 0, 3, this, 'Dreieck', 'red'))
  }

  public start(): void {
    this.play = true
    this.run()
  }

  private run(): void {
    if (this.play) {
      this.controller.update()
      this.objectList[this.objectIndex].update()
    }
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.run.bind(this))
  }

  private renderObject(): void {
    this.controller.enabled = true
    this.objectList[0].init()
    this.objectList[0].renderMenu()
    this.run()
  }

  public changeObject(objectIndex: number): void {
    this.removeObjects(this.scene)
    this.controller.enabled = true
    this.objectIndex = objectIndex
    this.objectList[objectIndex].renderMenu()
    this.objectList[objectIndex].init()
  }

  public updateObject(objectIndex: number): void {
    this.removeObjects(this.scene)
    this.controller.enabled = true
    this.objectIndex = objectIndex
    this.objectList[objectIndex].update()
    this.objectList[objectIndex].init()
  }

  private removeObjects(scene: _three.Object3D): void {
    for (let i = scene.children.length - 1; i >= 0; i--) {
      this.removeObjects(scene.children[i])
      scene.remove(scene.children[i])
    }
  }

  private renderObjectListMenu(): void {
    const objectListMenu = document.getElementById('objectSelect')
    for (let i = 0; i < this.objectList.length; i++) {
      const opt = document.createElement('option')
      opt.appendChild(document.createTextNode(this.objectList[i].getName))
      opt.value = i.toString()
      objectListMenu.appendChild(opt)
    }
  }
  public get getScene(): _three.Scene {
    return this.scene
  }

  public get getCamera(): _three.Camera {
    return this.camera
  }
}
