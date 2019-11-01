import Scene from '../scene/Scene'

export default abstract class Fractral {
  private scene: Scene
  private name: string
  private color: string
  private level: number
  private type: string
  private segments: number
  private smooth: number
  private info: string
  private fill: boolean

  public constructor(info: string, type: string, scene: Scene, name: string, color = 'white', level = 0) {
    this.scene = scene
    this.name = name
    this.color = color
    this.level = level
    this.type = type
    this.info = info
    this.fill = true
  }
  //gets overwritten
  public init() {}

  public update(): void {
    if (this.getName === 'Diamond Square') {
      const color = (document.getElementById('color') as HTMLTextAreaElement).value
      const segments = (document.getElementById('level') as HTMLTextAreaElement).value
      const smooth = (document.getElementById('smooth') as HTMLTextAreaElement).value
      const fill = (document.getElementById('fill') as HTMLTextAreaElement).value
      this.color = color
      this.segments = parseInt(segments)
      this.smooth = parseInt(smooth)
      if (fill === 'fill') {
        this.fill = false
      } else {
        this.fill = true
      }
    }
    const level = (document.getElementById('level') as HTMLTextAreaElement).value
    const color = (document.getElementById('color') as HTMLTextAreaElement).value

    this.color = color
    this.level = parseInt(level, 10)
  }

  public renderMenu(): void {
    const menu = document.getElementById('menu')
    const info = document.getElementById('info-container')

    this.removeMenu(menu)
    this.removeMenu(info)
    this.addMenu(menu)
    this.addInfoText(info)
  }

  private removeMenu(menu: HTMLElement): void {
    while (menu.firstChild) {
      menu.removeChild(menu.firstChild)
    }
  }

  private addInfoText(menu: HTMLElement): void {
    const info = document.createElement('div')
    info.innerHTML = '<br/><p>' + this.getInfo + '</p>'
    menu.appendChild(info)
  }

  private addMenu(menu: HTMLElement): void {
    const div = document.createElement('div')
    if (this.getName === 'Mandelbrot') {
      div.innerHTML =
        '<label class="hide">Level</label>\
      <br class="hide"/>\
      <select class="hide" id="level">\
        <option value="0">0</option>\
        <option value="1">1</option>\
        <option value="2">2</option>\
        <option value="3">3</option>\
      </select>\
      <br class="hide"/>\
        <label class="hide">Zoom Faktor</label>\
    <br class="hide"/>\
    <select class="hide" id="zoomFactor">\
      <option value="2000">0</option>\
      <option value="2800">1</option>\
      <option value="3600">2</option>\
      <option value="4400">3</option>\
    </select>\
    <br class="hide"/>\
    <label class="hide">X Zoom</label>\
    <br class="hide"/>\
    <select class="hide" id="zoomX">\
      <option value="0.7">0.7</option>\
      <option value="0.8">0.8</option>\
    </select>\
    <br class="hide"/>\
    <label class="hide">Y Zoom</label>\
    <br class="hide"/>\
    <select class="hide" id="zoomY">\
      <option value="0.6">0.6</option>\
      <option value="0.7">0.7</option>\
    </select>\
    <br class="hide"/>\
   '
    } else if (this.getName === 'Pythagoras Tree') {
      div.innerHTML =
        '<label>Iteration</label>\
  <br />\
  <select id="level">\
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
  <label class="hide">Farbe</label>\
  <br />\
  <select class="hide" id="color">\
    <option value="red">Rot</option>\
  </select>\
  <br />\
 '
    } else if (this.getName === 'Barnsley Fern') {
      div.innerHTML =
        '<label>Iteration</label>\
  <br />\
  <select id="level">\
    <option value="0">0</option>\
    <option value="1">1</option>\
    <option value="2">2</option>\
    <option value="3">3</option>\
    <option value="4">4</option>\
    <option value="5">5</option>\
    <option value="100">100</option>\
    <option value="500">500</option>\
    <option value="1000">1000</option>\
    <option value="5000">5000</option>\
    <option value="10000">10000</option>\
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
    } else if (this.getName === 'Koch Curve') {
      div.innerHTML =
        '<label>Iteration</label>\
  <br />\
  <select id="level">\
    <option value="0">0</option>\
    <option value="1">1</option>\
    <option value="2">2</option>\
    <option value="3">3</option>\
    <option value="4">4</option>\
    <option value="5">5</option>\
    <option value="6">6</option>\
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
    } else if (this.getName === 'Diamond Square') {
      div.innerHTML =
        '<label>Segmente</label>\
  <br />\
  <select id="level">\
    <option value="4">4</option>\
    <option value="8">8</option>\
    <option value="16">16</option>\
    <option value="32">32</option>\
    <option value="64">64</option>\
    <option value="128">128</option>\
    <option value="256">256</option>\
    <option value="512">512</option>\
  </select>\
  <br />\
  <label>Smoothing</label>\
  <br />\
  <select id="smooth">\
    <option value="1">1</option>\
    <option value="9">9</option>\
    <option value="17">17</option>\
    <option value="33">33</option>\
    <option value="66">66</option>\
    <option value="130">130</option>\
    <option value="263">263</option>\
    <option value="513">513</option>\
    <option value="1026">1026</option>\
    <option value="2000">2000</option>\
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
  <label>Polygone füllen</label>\
  <br />\
  <select id="fill">\
    <option value="noFill">nein</option>\
    <option value="fill">ja</option>\
  </select>  <br />\
 '
    } else if (this.getName === 'Cube') {
      div.innerHTML =
        '<label>Polygon Level</label>\
        <br />\
      <select id="level">\
        <option value="0">0</option>\
        <option value="1">1</option>\
        <option value="2">2</option>\
        <option value="3">3</option>\
        <option value="4">4</option>\
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
    } else if (this.getName === 'Torus' || this.getName === 'Torus Knot') {
      div.innerHTML =
        '<label>Polygon Level</label>\
<br />\
<select id="level">\
  <option value="0">0</option>\
  <option value="1">1</option>\
  <option value="2">2</option>\
  <option value="3">3</option>\
  <option value="4">4</option>\
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
    } else if (this.getName === 'Graftal') {
      div.innerHTML =
        '<label class="hide">Farbe</label>\
  <br />\
  <select id="color" class="hide">\
    <option value="white">Weiß</option>\
    <option value="red">Rot</option>\
    <option value="green">Grün</option>\
    <option value="yellow">Gelb</option>\
  </select>\
  <select class="hide" id="level">\
    <option value="4">4</option>\
    <option value="8">8</option>\
    <option value="16">16</option>\
    <option value="32">32</option>\
    <option value="64">64</option>\
    <option value="128">128</option>\
    <option value="256">256</option>\
    <option value="512">512</option>\
  </select>\
  <br />\
  '
    } else if (this.getName === 'Sierpinski Carpet' || this.getName === 'Mengersponge') {
      div.innerHTML =
        '<label>Iteration</label>\
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
    } else {
      div.innerHTML =
        '<label>Iteration</label>\
<br />\
  <select id="level">\
    <option value="0">0</option>\
    <option value="1">1</option>\
    <option value="2">2</option>\
    <option value="3">3</option>\
    <option value="4">4</option>>\
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

  public get getSegments(): number {
    return this.segments
  }

  public get getSmooth(): number {
    return this.smooth
  }

  public get getType(): string {
    return this.type
  }

  public get getInfo(): string {
    return this.info
  }

  //SET Methods
  private set setColor(color: string) {
    this.color = color
  }

  private set setLevel(level: number) {
    this.level = level
  }

  public get getFill(): boolean {
    return this.fill
  }

  //SET Methods
  private set setFill(fill: boolean) {
    this.fill = fill
  }
}
