import './style.css'

import { UniversalCamera } from '@babylonjs/core/Cameras'
import { Engine } from '@babylonjs/core/Engines/engine.js'
import { EnvironmentHelper } from '@babylonjs/core/Helpers/environmentHelper.js'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'
import { Scene } from '@babylonjs/core/scene.js'
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience.js'
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";

// Required for EnvironmentHelper
import '@babylonjs/core/Materials/Textures/Loaders'

// Enable GLTF/GLB loader for loading controller models from WebXR Input registry
import '@babylonjs/loaders/glTF'

// Without this next import, an error message like this occurs loading controller models:
//  Build of NodeMaterial failed" error when loading controller model
//  Uncaught (in promise) Build of NodeMaterial failed: input rgba from block
//  FragmentOutput[FragmentOutputBlock] is not connected and is not optional.
import '@babylonjs/core/Materials/Node/Blocks'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import { Color3 } from '@babylonjs/core/Maths/math.color'




function constructCanvas(): HTMLCanvasElement{
  const app = document.querySelector<HTMLDivElement>('#app')
  var canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.id = "gameCanvas";
  app?.appendChild(canvas);
  return canvas
}

export const canvas = constructCanvas();
export const engine = new Engine(canvas, true);

async function main():Promise<void>{
  var scene = new Scene(engine);
  const environmentHelper = new EnvironmentHelper({
    skyboxColor: Color3.Black(),
    groundOpacity: 0.3,
    createGround: true
  }, scene);
  
  const camera= new UniversalCamera("Camera", new Vector3(0,0,-5), scene);
  camera.speed = 0;
  camera.attachControl(canvas, true);
  var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

  await WebXRDefaultExperience.CreateAsync(scene,{
    disableTeleportation: true
  });
  var pay_attention = await SceneLoader.ImportMeshAsync("","", "scene.gltf", scene);
  pay_attention.meshes[0].scaling=new Vector3(2,2,-2);
  pay_attention.meshes[0].position = new Vector3(0,-1,0);
  

  
  // // // hide/show the Inspector
  // window.addEventListener("keydown", (ev) => {
  //     // Shift+Ctrl+Alt+I
  //     if (ev.shiftKey && ev.ctrlKey) {
  //         if (scene.debugLayer.isVisible()) {
  //             scene.debugLayer.hide();
  //         } else {
  //             scene.debugLayer.show();
  //         }
  //     }
  // });

  // run the main render loop
  engine.runRenderLoop(() => {
      scene.render();
  });

  
}

// new App();
main();