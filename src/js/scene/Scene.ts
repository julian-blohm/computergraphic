import * as _three from 'three'
import * as _pixi from 'pixi.js'
import { OrbitControls } from 'three-orbitcontrols-ts'

import Cube from '../fractals/Cube'
import Mengersponge from '../fractals/Mengersponge'
import SierpinskiCarpet from '../fractals/SierpinskiCarpet'
import PixiShape from '../fractals/PixiShape'
import MandelbrotSet from '../fractals/Mandelbrot'
import LineFractal from '../fractals/LineFractal'
import KochSnowflake from '../fractals/KochSnowflake'
import Torus from '../fractals/Torus'
import TorusKnot from '../fractals/TorusKnot'
import MiraFractal from '../fractals/MiraFractal'
import SierpinskiTriangle from '../fractals/SierpinskiTriangle'
import SierpinskiPyramide from '../fractals/SierpinskiPyramide'
import PythagorasTree from '../fractals/PythagorasTree'
import BarnsleyFern from '../fractals/BarnsleyFern'
import DiamindSquare from '../fractals/DiamondSquare'

export default class Scene {
  private scene: _three.Scene
  private camera: _three.PerspectiveCamera
  private renderer: _three.WebGLRenderer
  private controller: OrbitControls
  private objectIndex: number
  private objectList: any[]
  private play: boolean
  private ctx: any
  private myCanvas: any
  private pixiScene: any

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
    this.myCanvas.width = 1920
    this.myCanvas.height = 1080
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
    let cube =
      'Es handelt sich bei diesem Objekt um einen Kubus oder auch Würfel. An diesem einfachen Objekt lässt sich zeigen, wie sich ein Objekt aus mehreren Polygonen zusammensetzt. Mit der Option „Polygon Level“ lässt sich die Anzahl der Polygone einstellen, welche genutzt werden um den Würfel dar zu stellen.'
    let torus =
      'Ein Torus ist ein mathematisches Objekt aus der Geometrie. Er eist eine „wulstartige“ geformte Fläche mit einem „Loch“, hat also die Gestalt eines Rettungsrings, Reifens oder Donuts. Man erhält einen Torus, indem man einen Kreis um eine Achse rotieren lässt, die in der Kreisebene liegt und den Kreis nicht schneidet. An diesem Objekt lässt sich mittels der Option „Polygon Level“ veranschaulichen, wie sich das Objekt verändert, wenn mehr oder weniger Polygone benutzt werden um das Objekt darzustellen.'
    let torusKnot =
      'Ein Torusknoten entsteht, indem man eine Schnur nimmt und sie um den Torusknoten windet, solange, bis man am Ausgangspunkt angekommen ist. Je nachdem, wie oft die Schnur um den Torus gewickelt wird, kann ein Torusknoten ganz unterschiedlich aussehen. In dem Projekt handelt es sich um einen der einfachsten Torusknoten, die Kleeblattschlinge oder den Kleeblattknoten. Dieses Objekt hat die gleichen Optionen wie der Torus.'
    let SirTri =
      'Das Sierpinski-Dreieck ist ein im Jahre 1915 von Waclaw Sierpinski beschriebenes Fraktal, welches eine selbstähnliche Teilmenge eines (meist gleichseitig dargestellten) Dreiecks ist. Teilt man das Dreieck in vier zueinander kongruente und zum Ausgangsdreieck ähnliche Dreiecke, deren Eckpunkte die Seitenmittelpunkte des Ausgangsdreiecks sind, dann sind die Teilmengen des Fraktals in den drei äußeren Dreiecken skalierte Kopien des gesamten Fraktals, während das mittlere Teildreieck nicht zum Fraktale gehört. Diese Aufteilung des Fraktals in skalpierte Kopien kann in den äußeren Teildreiecken rekursiv fortgesetzt werden. Als Optionen kann man zunächst die „Iteration“ auswählen. Hierbei Lässt sich auswählen, welcher Iterationsschritt des Fraktals gezeigt werden soll.'
    let sirPyr =
      'Die Sierpinski Pyramide lässt sich als eine dreidimensionale Variante des Sierpinski Dreiecks beschreiben. Hier wird als Ausgangsform eine Pyramide genutzt. Diese wird von den Seiten mit einer auf dem Kopf stehenden Pyramide „durchschossen“. Dadurch entstehen nun 5 Pyramiden als Teilmengen der Gesamtpyramide.'
    let sirCar =
      'Der Sierpinski Teppich ist ein Fraktal, das auf den Mathematiker Waclaw Sierpinski zurückgeht und das dieser in einer ersten Beschreibung im Jahre 1916 vorgestellt hat. Es ist verwandt mit dem Sierpinski Dreieck und dem Menger-Schwamm. Hierbei wird aus einem Quadrat in der Mitte ein Neuntel der Fläche entfernt. Aus den um das Loch verbliebenen acht quadratischen Feldern wird wiederum je ein Neuntel der Fläche entfernt. Dieser Schritt kann wiederum beliebig oft durchgeführt werden. Die Optionen sind wieder die gleichen, wie bei dem Sierpinski Dreieck um der Sierpinski Pyramide. Allerdings wurden hier die Iterationen um einen Schritt verringert, da ansonsten der Rechenaufwand zu hoch ist und keine gute Performance mehr zu gewährleisten ist.'
    let menSp =
      'Der Menger-Schwamm gehört wie das Sierpinski-Dreieck, -Pyramide oder -Teppich zu den Objekten der Fraktale. Der Schwamm wurde nach Karl Menger benannt und wurde zum ersten Mal 1926 veröffentlicht. Der Mengerschwamm ist eine dreidimensionale Analogie des Sierpinski Teppichs. Überträgt man das Konstruktionsprinzip des Sierpinski-Teppichs auf einen Würfen, erhält man ein Gebilde, welches einem Schwamm ähnelt. Ausgangslage ist hierbei jedoch ein Würfel. Man unterteilt jede Oberfläche des Würfels in neun Quadrate, diese unterteilen den Würfel in 27 kleinere Würfel. Jeder Würfel in der Mitte jeder Oberfläche und der Würfel im Inneren des großen Würfels wird entfernt. Es verbleibt ein durchlöcherter Würfel, der aus 20 Würfeln mit jeweils 1/27 des Volumes des Ausgangswürfels besteht'
    let kochSnow =
      'Die Koch-Kurve ist eines der am häufigsten zitierten Beispiele für ein Fraktal und wurde bei der Entdeckung als Monsterkurve bezeichnet. Die Koch-Kurve ist auch in der Form der Kochnischen Schneeflocke bekannt, die durch geeignete Kombination dreier Koch-Kurven entsteht. Bei dem Objekt in dem Projekt handelt es sich um so eine Schneeflocke. Die Kochsche Schneeflocke nimmt als Ausgangselement ein gleichseitiges Dreieck. An jeder Seite des Dreiecks wird nun das mittlere Drittel entfernt und darüber ein gleichseitiges Dreieck mit der Kantenlänge des entfernten, mittleren Drittels. Nach einigen Iterationen entsteht dann eine Art Schneeflocke. Die verfügbaren Optionen sind wieder die gleichen, wie bei den anderen Fraktalen.'
    let pyt =
      'Ein Pythagoras-Baum ist eine besondere Art eines Fraktals. Das ursprüngliche Verfahren zum Erstellen eines Pythagoras-Baums basiert auf dem Satz des Pythagoras, in dem auf ein Quadrat zwei weitere, kleinere Quadrate im rechten Winkel angeordnet werden. Durch rekursives Aufrufen dieser Konstruktionsvorschrift wird ein Fraktal erzeugt, das im Grenzfall der Form eines Baumes ähnelt. Durch den rechten Winkel des eingeschlossenen Dreiecks bleibt die Gesamtfläche jeder Ebene gleich, daher ist die Fläche des Grundelementes (Stammes) genau so groß wie die Summe der Fläche aller äußeren Elemente (Blätter). Als Option kann man hier wieder den Iterationsschritt auswählen.'
    let barnsley =
      'Der Barnsley Fern ist ein Fractal, welches nach dem Mathematiker Michael Barnsley benannt wurde.  Die Konstruktion beruht auf der Beobachtung, dass die Blätter eines Farnes selbst wie ein kleiner Farn aussehen. Dies ist eine recht typische Eigenschaft von Pflanzen: Teile der gesamten Pflanze sehen aus wie die gesamte Pflanze selbst. (Der Ast eines Baumes z.B. sieht selbst aus wie ein kleiner Baum). Erzeugt wird der Farn hierbei durch das von Barnsley eingeführte Verfahren des Iterativen Funktionen-Systems (iterated function system), kurz IFS. Das Verfahren erzeugte großes Aufsehen, da zuvor noch nie komplexe pflanzliche Muster so einfach in 4 oder mehr affinen Transformationen dargestellt werden konnten. Affinitätstransformationen verwenden in verschiedenen Richtungen verschiedene Verkleinerungsfaktoren; z.B. ist ein Quadrat einem Rechteck nicht ähnlich, da die Proportionen nicht übereinstimmen, aber affin, da eine einseitige Streckung um einen unterschiedlichen Faktor ein affines Rechteck erzeugt.  Obwohl das IFS keine Technik bietet, welche Entwicklung wie ein L-System berücksichtigt, lassen sich ziemlich schnell und einfach natürliche Strukturen erzeugen.  Beim Barnsley Fern gibt es 4 Transformationen. Per Zufalls wird für jeden Punkt der gezeichnet werden soll, eine dieser Transformationen angewendet. Bei genug Anwendungen entsteht dann der sogenannte Barnsley Fern. Als Optionen stehen dem Nutzer die Anzahl an Iterationen (also wieviele Punkte gezeichnet werden) und die Farbe des Farns zur Verfügung.'
    let diamond =
      'Der Diamond-Square Algorithmus ist ein Verfahren in der Computergraphik um Höhenfelder zu erzeugen. Ausgangspunkt für die Generierung einer fraktalen Landschaft auf Basis des Diamond-square Algorithmus ist ein Quadrat. Jeder Ecke des Quadrats wird ein Höhenwert zugeordnet. Der Algorithmus zerlegt das Quadrat rekursiv in kleinere Quadrate, wobei der Höhenwert des Mittelpunkts als Mittelwert der vier Eckpunkte, plus einer zufälligen Verschiebung, definiert wird. Analog wird der Höhenwert der Seitenhalbierenden eines Quadrats als Mittelwert der vier horizontal umgebenden Punkte, plus einer zufälligen Verschiebung, definiert. Die Verschiebung ist Normalverteilt mit einem Mittelwert von 0 und nimmt mit der Größe der Rechtecke ab. Die Mittelpunkte und Seitenhalbierende bilden die Eckpunkte der neuen Rechtecke. Ausnahme von der Regel zur Generierung der neuen Punkte bilden die vier Außenseiten des ursprünglichen Rechtecks, die jeweils nach der eindimensionalen Mittelpunktverschiebung generiert werden. Als Option stehen dem Nutzer die „Segmente“, das „Smoothing“ und die „Farbe“ zur Verfügung. Mit der Option „Segmente“ lässt sich festlegen, in wieviele Segmente der Bereich unterteilt werden soll - also eine Art Feinheit. Die Option „Smoothing“ ist dabei für das einstellen der Unebenheit - also wie stark die Höhen-Tiefen-Unterschiede sind.'
    let mandel =
      'Die Mandelbrot-Menge ist die Menge der komplexen Zahlen. Geometrisch als Teil der Gaußschen Zahlenebene interpretiert, ist die Mandelbrot-Menge ein Fraktal. Bilder davon können erzeugt werden, indem ein Pixelraster auf die Zahlenebene gelegt und so jedem Pixel ein Wert von  zugeordnet wird. Wenn die Folge mit dem entsprechenden  beschränkt ist, es also zur Mandelbrot-Menge gehört, wird das Pixel z. B. schwarz gefärbt'
    let graf =
      'Das H-Fraktel oder auch Line-Fractal geht von einer einzigen Linie aus. An den Endpunkten wird nun jeweils eine weitere kürzere Linie mit einer Drehung von 90° gezeichnet, wobei der Mittelpunkt dieser Linie vom Endpunkt der vorherigen Linie bestimmt. '

    // this.objectList.push(new MiraFractal('2d', this, 'MIRA', '#FFFFFF', 5, window.innerWidth, window.innerHeight))
    this.objectList.push(new Cube(cube, '3d', this, 'Cube', 'white'))
    this.objectList.push(new Torus(torus, '3d', this, 'Torus', 'white'))
    this.objectList.push(new TorusKnot(torusKnot, '3d', this, 'Torus Knot', 'white'))
    this.objectList.push(
      new SierpinskiTriangle(this.ctx, 1, SirTri, 'normalCanvas', this, 'Sierpinski Triangle', 'white'),
    )
    this.objectList.push(new SierpinskiPyramide(0, 2, 0, 2, 2, 1, sirPyr, '3d', this, 'Sierpinski Pyramide', 'white'))
    this.objectList.push(new SierpinskiCarpet(0, 0, 3, 0, 0, sirCar, '3d', this, 'Sierpinski Carpet', 'white'))
    this.objectList.push(new Mengersponge(0, 0, 0, 3, 0, 0, menSp, '3d', this, 'Mengersponge', 'white'))
    this.objectList.push(new KochSnowflake(this.ctx, 5, kochSnow, 'normalCanvas', this, 'Koch Curve', 'white'))
    this.objectList.push(new PythagorasTree(this.ctx, 0, pyt, 'normalCanvas', this, 'Pythagoras Tree', 'red'))
    this.objectList.push(new BarnsleyFern(this.ctx, 1000, barnsley, 'normalCanvas', this, 'Barnsley Fern', 'white'))
    // this.objectList.push(new PixiShape('2d', this, 'PIXI SHAPE 2D', 'red'))
    this.objectList.push(new DiamindSquare(diamond, '3d', this, 'Diamond Square', 'white'))
    this.objectList.push(new MandelbrotSet(this.ctx, 350, mandel, 'normalCanvas', this, 'Mandelbrot', 'red'))
    this.objectList.push(new LineFractal(this.ctx, 350, graf, 'normalCanvas', this, 'Graftal', 'white'))
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
    this.myCanvas.width = this.myCanvas.width
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
    console.log(this.objectList[objectIndex].getType)
    console.log('*******************')
    console.log('*******************')
    console.log('*******************')

    if (this.objectList[objectIndex].getType === '3d') {
      console.log('3D')
      document.getElementById('pixiCanvas').style.display = 'none'
      document.getElementById('normalCanvas').style.display = 'none'
      document.getElementById('threeCanvas').style.display = 'block'
    }
    if (this.objectList[objectIndex].getType === '2d') {
      console.log('2D')
      document.getElementById('pixiCanvas').style.display = 'block'
      document.getElementById('threeCanvas').style.display = 'none'
      document.getElementById('normalCanvas').style.display = 'none'
    }
    if (this.objectList[objectIndex].getType === 'normalCanvas') {
      console.log('normal')
      document.getElementById('normalCanvas').style.display = 'block'
      document.getElementById('threeCanvas').style.display = 'none'
      document.getElementById('pixiCanvas').style.display = 'none'
    }
  }
}
