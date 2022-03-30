import {
    Scene, 
    Vector3,
    SceneLoader,
    Mesh,
    DirectionalLight,
    ShadowGenerator, 
    MeshBuilder,   
 } from "@babylonjs/core";


import "@babylonjs/loaders/glTF";
import { createColorMaterial } from "../material";

// digital assets
import wallModel from "../../assets/museum-walls.glb";
import roofModel from "../../assets/museum-roof.glb"
import chairModel from '../../assets/chairs.glb'
import sofaModel from '../../assets/sofa.glb'


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
    
    //adding material ang changing scale of roofmodel
    importResult2.meshes[0].scaling = new Vector3(1.6,1.28,1.7);
    importResult2.meshes[1].material = createColorMaterial(scene).roomColor;
    importResult2.meshes[0].position = new Vector3(0,0,233.42)
    importResult2.meshes[1].position = new Vector3(0,836.08,0)
    


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

    const importResult3 = await SceneLoader.ImportMeshAsync(
        "",
        "",
        sofaModel,
        scene,
        undefined,
        ".glb" 
    )
    importResult3.meshes[0].scaling = new Vector3(111.32,111.32,111.32);
    importResult3.meshes[0].rotation = new Vector3((0.27*Math.PI/180),(84.79*Math.PI/180),(-0.2*Math.PI/180));
    importResult3.meshes[0].position = new Vector3(-540.4,-21.74,-32.07);
    importResult3.meshes[3].material = createColorMaterial(scene).sofaColor;
    //PLANE UNDER IMPORTRESULT4
    const planeUnderChair: Mesh = MeshBuilder.CreatePlane('chairPlane', {width: 300, height: 400, sideOrientation: Mesh.DOUBLESIDE})
    planeUnderChair.position = new Vector3(418, -25.63, -794);
    planeUnderChair.rotation = new Vector3(-90*Math.PI/180, -27.82*Math.PI/180, 0)
    planeUnderChair.material = createColorMaterial(scene).roomColor;
    planeUnderChair.isVisible = false
     
    const planeClone = planeUnderChair.clone('sofaPlane');
    planeClone.position = new Vector3(-565.949,-25.63,-14.63)

    //LIGHT TO CAST SHADOW UNDER IMPORTRESULT4.MESHES
    const light3 = new DirectionalLight("light3", new Vector3(540, -1794, -1329),scene);
          light3.direction = new Vector3(0.32, -0.55, -0.77)
          light3.intensity = 0.3

    //SHADOW UNDER IMPORTRESULT4
   
        const shadow: any = new ShadowGenerator(1020, light3);
        for (let i = 0; i<importResult4.meshes.length; i++){
            shadow.getShadowMap().renderList.push(importResult4.meshes[i]);
            importResult4.meshes[i].material = createColorMaterial(scene).chairColor;

            importResult4.meshes[i].actionManager = new ActionManager(scene);
            importResult4.meshes[i].actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function(ev){	
             scene.hoverCursor = "pointer";
          }));
        }

        for (let i in importResult3.meshes){
            shadow.getShadowMap().renderList.push(importResult3.meshes[i]);

            importResult3.meshes[i].actionManager = new ActionManager(scene);
            importResult3.meshes[i].actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function(ev){	
             scene.hoverCursor = "pointer";
          }));
          }
        
        planeUnderChair.receiveShadows = true;
        planeClone.receiveShadows = true;
    
   
 
   
   
           
     
    //Check click on importResult4
    let iframe: any = document.querySelector('#modal-iframe');
    scene.onPointerUp = (evt, pickResult) => {
        if (pickResult?.hit){
            if (pickResult?.pickedMesh?.name === "Object019" || pickResult?.pickedMesh?.name === "Object020"){
             modalToggle();
            iframe.innerHTML = "<b>Arper juno</b></p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus felis, volutpat ac nisl id, condimentum auctor nisi. Mauris dui nunc, dignissim ut odio eget, scelerisque vehicula odio. Nunc a lorem leo. Suspendisse sed ex convallis justo pretium ultricies nec nec ex. <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus felis, volutpat ac nisl id, condimentum auctor nisi. Mauris dui nunc, dignissim ut odio eget, scelerisque vehicula odio."
            } else if (pickResult?.pickedMesh?.name === "andtradition_cloud_ln4"){
                modalToggle();
                
            }
        }
    }



    return scene;
}