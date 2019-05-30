import "./style/style.css";
import Scene from "./js/scene/Scene";

const scene = new Scene(
  true,
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);

scene.init();
scene.start();
