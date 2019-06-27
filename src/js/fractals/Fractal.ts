import Scene from '../scene/Scene'

export default abstract class Fractral {
  private scene: Scene
  private name: string
  private color: string
  private level: number
  private type : string

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
