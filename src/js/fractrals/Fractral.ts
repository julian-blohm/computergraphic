import Scene from '../scene/Scene'

export default abstract class Fractral {
  private scene: Scene
  private name: string
  private color: string
  private level: number

  public constructor(scene: Scene, name: string, color = 'white', level = 2) {
    this.scene = scene
    this.name = name
    this.color = color
    this.level = level
  }
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
      <option value="2">2</option>\
      <option value="4">4</option>\
      <option value="6">6</option>\
      <option value="8">8</option>\
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

  //SET Methods
  private set setColor(color: string) {
    this.color = color
  }

  private set setLevel(level: number) {
    this.level = level
  }
}
