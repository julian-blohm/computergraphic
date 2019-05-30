import * as _three from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

export default class Scene {
  private scene: _three.Scene;
  private camera: _three.PerspectiveCamera;
  private renderer: _three.WebGLRenderer;
  private controller: OrbitControls;
  private state: number;
  private stateList: string[];
  private play: boolean;

  public constructor(
    antialias: boolean,
    fov: number,
    aspect: number,
    near: number,
    far: number
  ) {
    this.scene = new _three.Scene();
    this.renderer = new _three.WebGLRenderer({ antialias: antialias });
    this.camera = new _three.PerspectiveCamera(fov, aspect, near, far);
    this.controller = new OrbitControls(this.camera, this.renderer.domElement);
    this.state = -1;
    this.stateList = [];
    this.state = null;
    this.play = false;
  }

  public init(): void {
    //renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.enabled = true;
    this.controller.target.set(0, 0, 0);
    this.controller.update();
    document.body.appendChild(this.renderer.domElement);
    // light
    const ambLight = new _three.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambLight);
    const dirLigth = new _three.DirectionalLight(0xffffff, 0.3);
    this.scene.add(dirLigth);
    const spotLight = new _three.SpotLight(0xffffff, 0.75);
    spotLight.position.set(100, 100, 50);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    this.scene.add(spotLight);
  }

  private run(): void {
    if (this.play) {
      this.controller.update();
      //this.stateList[this.state].update(delta);
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.run.bind(this));
  }

  public start(): void {
    this.play = true;
    this.run();
  }
}
