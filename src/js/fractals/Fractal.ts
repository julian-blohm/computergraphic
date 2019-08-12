import Scene from '../scene/Scene'
import MandelbrotSet from './Mandelbrot'

export default abstract class Fractral {
  private scene: Scene
  private name: string
  private color: string
  private level: number
  private type: string

  public constructor(type: string, scene: Scene, name: string, color = 'white', level = 0) {
    this.scene = scene
    this.name = name
    this.color = color
    this.level = level
    this.type = type
  }
  //gets overwritten
  public init() {}

  public update(): void {
    const level = (document.getElementById('level') as HTMLTextAreaElement).value
    const color = (document.getElementById('color') as HTMLTextAreaElement).value
    this.color = color
    this.level = parseInt(level, 10)
  }

  public renderMenu(): void {
    const menu = document.getElementById('menu')
    this.removeMenu(menu)
    this.addMenu(menu)
  }

  private removeMenu(menu: HTMLElement): void {
    while (menu.firstChild) {
      menu.removeChild(menu.firstChild)
    }
  }

  private addMenu(menu: HTMLElement): void {
    const div = document.createElement('div')
    if (this.getName === 'Mandelbrot') {
      div.innerHTML =
        '<label>Level</label>\
      <br />\
      <select id="level">\
        <option value="0">0</option>\
        <option value="1">1</option>\
        <option value="2">2</option>\
        <option value="3">3</option>\
      </select>\
      <br />\
        <label>Zoom Faktor</label>\
    <br />\
    <select id="zoomFactor">\
      <option value="2000">0</option>\
      <option value="2800">1</option>\
      <option value="3600">2</option>\
      <option value="4400">3</option>\
    </select>\
    <br />\
    <label>X Zoom</label>\
    <br />\
    <select id="zoomX">\
      <option value="0.7">0.7</option>\
      <option value="0.8">0.8</option>\
    </select>\
    <br />\
    <label>Y Zoom</label>\
    <br />\
    <select id="zoomY">\
      <option value="0.6">0.6</option>\
      <option value="0.7">0.7</option>\
    </select>\
    <br />\
   '
    } else if (this.getName === 'Pythagoras Tree') {
      div.innerHTML =
        '<label>Level</label>\
  <br />\
  <select id="level">\
    <option value="0">0</option>\
    <option value="1">1</option>\
    <option value="2">2</option>\
    <option value="3">3</option>\
    <option value="4">4</option>\
    <option value="5">5</option>\
    <option value="6">6</option>\
    <option value="7">7</option>\
    <option value="8">8</option>\
    <option value="9">9</option>\
    <option value="10">10</option>\
  </select>\
  <br />\
  <label>Farbe</label>\
  <br />\
  <select id="color">\
    <option value="white">Weiß</option>\
    <option value="red">Rot</option>\
    <option value="green">Grün</option>\
    <option value="yellow">Gelb</option>\
  </select>\
  <br />\
 '
    } else {
      div.innerHTML =
        '<label>Level</label>\
    <br />\
    <select id="level">\
      <option value="0">0</option>\
      <option value="1">1</option>\
      <option value="2">2</option>\
      <option value="3">3</option>\
    </select>\
    <br />\
    <label>Farbe</label>\
    <br />\
    <select id="color">\
      <option value="white">Weiß</option>\
      <option value="red">Rot</option>\
      <option value="green">Grün</option>\
      <option value="yellow">Gelb</option>\
    </select>\
    <br />\
   '
    }

    menu.appendChild(div)
  }

  //GET Methods
  public get getMainScene(): Scene {
    return this.scene
  }

  public get getName(): string {
    return this.name
  }

  public get getColor(): string {
    return this.color
  }

  public get getLevel(): number {
    return this.level
  }

  public get getType(): string {
    return this.type
  }

  //SET Methods
  private set setColor(color: string) {
    this.color = color
  }

  private set setLevel(level: number) {
    this.level = level
  }
}
