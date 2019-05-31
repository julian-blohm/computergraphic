import * as _three from "three";
import Scene from "../scene/Scene";

export default class Fractral {
  private scene: Scene;

  public constructor(scene: Scene) {
    this.scene = scene;
  }

  public get getMainScene(): Scene {
    return this.scene;
  }
  public init() {}
  public update() {}
}
