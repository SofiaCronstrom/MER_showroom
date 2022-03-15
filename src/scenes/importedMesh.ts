import {
    Scene, 
    Vector3,
    SceneLoader,
    Mesh,
    DirectionalLight,
    ShadowGenerator, 
    MeshBuilder,
    SceneComponentConstants
   
 } from "@babylonjs/core";


import "@babylonjs/loaders/glTF";
import { createColorMaterial } from "../material";

// digital assets
import wallModel from "../../assets/museum-walls.glb";
import roofModel from "../../assets/museum-roof.glb"
import railingModel from '../../assets/railing.glb'
import chairModel from '../../assets/chairs.glb'

import { modalToggle}  from "./modal";
import {ActionManager} from '@babylonjs/core/Actions/actionManager';
import {ExecuteCodeAction} from '@babylonjs/core/Actions/directActions';

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


    const importResult3 = await SceneLoader.ImportMeshAsync(
        "",
        "",
        railingModel,
        scene,
        undefined,
        ".glb" 
    )
    
    importResult3.meshes[0].scaling = new Vector3(2.92, 1,1);
    importResult3.meshes[1].position = new Vector3(-79.36, -408.2, 356.35)
    importResult3.meshes[1].material = createColorMaterial(scene).stairColor;
    

    //cant make instance of mesh

    
    // let  railingArr = [];

    // railingArr.push([1,0, 147, -600]);
    // railingArr.push([1,-550, 147, -404])
    // railingArr.push([1,550, 147, -153])

    // let railingArr2: any = []
    // for (let i in railingArr){
    //     (railingArr[i][0] === 1) ? railingArr2[i] = meshInstance.createInstance('railing' + i) : ;
        
    //     railingArr2[i].position.x = railingArr[1];
    //     railingArr2[i].position.y = railingArr[2];
    //     railingArr2[i].position.z = railingArr[3];
        
    // }

    const importResult4 = await SceneLoader.ImportMeshAsync(
        "",
        "",
        chairModel,
        scene,
        undefined,
        ".glb" 
    )
   
    importResult4.meshes[0].scaling = new Vector3(0.13, -0.13,0.13);
    importResult4.meshes[0].rotation = new Vector3(0,(60*Math.PI/180),(180*Math.PI)/180)
    importResult4.meshes[0].position = new Vector3(415.11, -25, -662.74)
    
    
    //PLANE UNDER IMPORTRESULT4
    const planeUnderChair: Mesh = MeshBuilder.CreatePlane('chairPlane', {width: 300, height: 400, sideOrientation: Mesh.DOUBLESIDE})
    planeUnderChair.position = new Vector3(418, -25.63, -794);
    planeUnderChair.rotation = new Vector3(-90*Math.PI/180, -27.82*Math.PI/180, 0)
    planeUnderChair.material = createColorMaterial(scene).roomColor;


    //LIGHT TO CAST SHADOW UNDER IMPORTRESULT4.MESHES
    const light3 = new DirectionalLight("light3", new Vector3(540, -1794, -1329),
        scene);

        light3.direction = new Vector3(0.32, -0.55, -0.77)
        light3.intensity = 0.2

    //SHADOW UNDER IMPORTRESULT4
        const shadow: any = new ShadowGenerator(1024, light3);
        for (let i = 0; i<importResult4.meshes.length; i++){
            shadow.getShadowMap().renderList.push(importResult4.meshes[i]);
            importResult4.meshes[i].material = createColorMaterial(scene).chairColor;

            importResult4.meshes[i].actionManager = new ActionManager(scene);
            importResult4.meshes[i].actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function(ev){	
             scene.hoverCursor = "pointer";
          }));
        }
        planeUnderChair.receiveShadows = true;
    
    
    //hover pointer on importResult4
 
   
   
           
     
    //Check click on importResult4
    scene.onPointerUp = (evt, pickResult) => {
        if (pickResult?.hit){
            if (pickResult?.pickedMesh?.name === "Object019" || pickResult?.pickedMesh?.name === "Object020"){
             modalToggle();
            let iframe: any = document.querySelector('#modal-iframe');
            iframe.innerHTML = "Hello"
            }
        }
    }



    return scene;
}