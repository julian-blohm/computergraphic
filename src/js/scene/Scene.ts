import * as _three from 'three'
import * as _pixi from 'pixi.js'
import { OrbitControls } from 'three-orbitcontrols-ts'

import Cube from '../fractals/Cube'
import Mengersponge from '../fractals/Mengersponge'
import SierpinskiCarpet from '../fractals/SierpinskiCarpet'
import PixiShape from '../fractals/PixiShape'
import MandelbrotSet from '../fractals/Mandelbrot'

export default class Scene {
  private pixiScene: _pixi.Application
  private scene: _three.Scene
  private camera: _three.PerspectiveCamera
  private renderer: _three.WebGLRenderer
  private controller: OrbitControls
  private objectIndex: number
  private objectList: any[]
  private play: boolean
  private ctx: any
  private myCanvas: any

  public constructor() {
    this.pixiScene = new _pixi.Application({
      width: 256, // default: 800
      height: 256, // default: 600
      antialias: true, // default: false
      transparent: false, // default: false
      resolution: 1, // default: 1
    })
    //adding pixijs canvas (its hidden)
    document.body.appendChild(this.pixiScene.view)
    document.body.getElementsByTagName('canvas')[0].setAttribute('id', 'pixiCanvas')
    //adding threejs canvas
    this.scene = new _three.Scene()
    this.renderer = new _three.WebGLRenderer({ antialias: true })
    this.renderer.domElement.id = 'threeCanvas'
    this.camera = new _three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 3000)
    this.controller = new OrbitControls(this.camera, this.renderer.domElement)
    this.objectList = []
    this.objectIndex = 0
    this.play = false

    //normales canvas
    this.myCanvas = document.createElement('canvas')
    this.myCanvas.setAttribute('id', 'normalCanvas')
    this.myCanvas.width = 600
    this.myCanvas.height = 600
    document.body.appendChild(this.myCanvas)
    this.ctx = this.myCanvas.getContext('2d')
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
    this.objectList.push(new Cube('3d', this, 'Cube 1', 'red'))
    this.objectList.push(new MandelbrotSet(this.ctx, 5, 'normalCanvas', this, 'Mandelbrot', 'red'))
    this.objectList.push(new PixiShape('2d', this, 'PIXI SHAPE 2D', 'red'))
    this.objectList.push(new SierpinskiCarpet(-1.5, -1.5, 3, 0, 0, '3d', this, 'Sierpinski', 'white'))
    this.objectList.push(new Mengersponge(-1.5, -1.5, -1.5, 3, 0, 0, '3d', this, 'Mengersponge', 'red'))
    this.objectList.push(new Cube('3d', this, 'Cube 2', 'green'))
    this.objectList.push(new Cube('3d', this, 'Cube 3'))
    this.objectList.push(new Cube('3d', this, 'Cube 4', 'yellow'))
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
    this.changeCanvas(this.objectIndex)
    this.controller.enabled = true
    this.objectList[0].init()
    this.objectList[0].renderMenu()
    this.run()
  }

  public changeObject(objectIndex: number): void {
    this.changeCanvas(this.objectIndex)
    this.removeObjects(this.scene)
    this.controller.enabled = true
    this.objectIndex = objectIndex
    this.objectList[objectIndex].renderMenu()
    this.objectList[objectIndex].init()
  }

  public updateObject(objectIndex: number): void {
    this.changeCanvas(this.objectIndex)
    this.removeObjects(this.scene)
    this.controller.enabled = true
    this.objectIndex = objectIndex
    this.objectList[objectIndex].update()
    this.objectList[objectIndex].init()
  }

  private removeObjects(scene: _three.Object3D): void {
    this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height)
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

  public get getPixiScene(): _pixi.Application {
    return this.pixiScene
  }

  public get getCamera(): _three.Camera {
    return this.camera
  }

  public changeCanvas(objectIndex: number): void {
    if (this.objectList[objectIndex].getType === '3d') {
      document.getElementById('pixiCanvas').style.display = 'none'
      document.getElementById('normalCanvas').style.display = 'none'
      document.getElementById('threeCanvas').style.display = 'block'
    }
    if (this.objectList[objectIndex].getType === '2d') {
      document.getElementById('pixiCanvas').style.display = 'block'
      document.getElementById('threeCanvas').style.display = 'none'
      document.getElementById('normalCanvas').style.display = 'none'
    }
    if (this.objectList[objectIndex].getType === 'normalCanvas') {
      document.getElementById('normalCanvas').style.display = 'block'
      document.getElementById('threeCanvas').style.display = 'none'
      document.getElementById('pixiCanvas').style.display = 'none'
    }
  }
}
