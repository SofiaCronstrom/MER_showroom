import {
    Scene, 
    Vector3,
    SceneLoader, 
  
 } from "@babylonjs/core";


import "@babylonjs/loaders/glTF";
import { createColorMaterial } from "../material";

// digital assets
import wallModel from "../../assets/museum-walls.glb";
import roofModel from "../../assets/museum-roof.glb"


export const ImportMeshes = async (scene: Scene) =>{
       //ROOM MODEL
       const importResult = await SceneLoader.ImportMeshAsync(
        "",
        "",
        wallModel,
        scene,
        undefined,
        ".glb"
    );
  
    //scaling and adding material
    importResult.meshes[0].scaling = new Vector3(1.6,1.28,1.7)
    importResult.meshes[1].material = createColorMaterial(scene).roomColor;
    importResult.meshes[0].position = new Vector3(0,-47.2,233.42)

    //ROOF MODEL
    const importResult2 = await SceneLoader.ImportMeshAsync(
        "",
        "",
        roofModel,
        scene,
        undefined,
        ".glb"
    );
    
    // //adding material ang changing scale of roofmodel
    importResult2.meshes[0].scaling = new Vector3(1.6,1.28,1.7);
    importResult2.meshes[1].material = createColorMaterial(scene).roomColor;
    importResult2.meshes[0].position = new Vector3(0,0,233.42)
    importResult2.meshes[1].position = new Vector3(0,836.08,0)

    return scene;
}