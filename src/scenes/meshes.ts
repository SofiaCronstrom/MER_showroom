import { Engine, 
    Scene, 
    ArcRotateCamera,
    Vector3,
    SceneLoader, 
    FreeCamera, 
    Color3,
    Color4, 
    Mesh,
    MeshBuilder,
    Texture,
 } from "@babylonjs/core";


import { createColorMaterial } from "../material";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";

// digital assets
import wallModel from "../../assets/museum-walls.glb";
import roofModel from "../../assets/museum-roof.glb"
import Concrete from '../../assets/texture1.jpg'

export const MeshesInMainRoom = async (scene: Scene) => {
 

        const ground: Mesh = MeshBuilder.CreateGround("ground", {height: 800, width: 800, subdivisions: 4}, scene);
        ground.position = new Vector3(1.25, 1, -5.28);
        ground.scaling = new Vector3(1.984, 1, 2.708);
        ground.material = createColorMaterial(scene).roomColor;


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
        importResult.meshes[0].scaling = new Vector3(1.5,1.28,1.38)
        importResult.meshes[1].material = createColorMaterial(scene).roomColor;


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
        importResult2.meshes[0].scaling = new Vector3(1.5,1.28,1.38);
        importResult2.meshes[1].material = createColorMaterial(scene).roomColor;
        


         //STAIR MESHES
         const stairPlane: Mesh = MeshBuilder.CreateBox('stair1', {width: 200, height: 30, depth: 5}, scene); 
         stairPlane.position =  new Vector3 (-300, 130, -522.5);
         
 
         const stairInstance: Mesh = MeshBuilder.CreateBox('stair2', {width: 300, height: 50, depth: 10 }, scene); 
         stairInstance.rotation = new Vector3(Math.PI/2, 0, 0);
         stairInstance.position = new Vector3 (-300, 110, -500);
        
 
         const stairs: any = Mesh.MergeMeshes([stairPlane, stairInstance]);
         stairs.position = new Vector3(0, -117.64, 224.57);
         stairs.material = createColorMaterial(scene).stairColor

        //Position stair meshes (Refactor this part)
        let stairsArray = [];
        stairsArray.push([1, 0, 202.36, -135.43]);
        stairsArray.push([1, 0, 162.36, -90.43]);
        stairsArray.push([1, 0, 122.36, -45.43]);
        stairsArray.push([1, 0, 82.36, -0.43]);
        stairsArray.push([1, 0, 42.36, 44.57]);
        stairsArray.push([1, 0, 2.36, 89.57]);
        stairsArray.push([1, 0, -37.64, 134.57]);
        stairsArray.push([1, 0, -77.64, 179.57]);

        let stepsArray: any = []

        for (let i in stairsArray){
            (stairsArray[i][0] === 1) ? stepsArray[i] = stairs.clone('instanceStairs' + i) : false;
            
            stepsArray[i].position.x = stairsArray[i][1]
            stepsArray[i].position.y = stairsArray[i][2]
            stepsArray[i].position.z = stairsArray[i][3]
        }

         //WINDOW MESHES
         const windowLeft: Mesh = MeshBuilder.CreatePlane('windowLeft', {width: 1700, height: 300, sideOrientation: Mesh.DOUBLESIDE}); 
         windowLeft.rotation = new Vector3(0, Math.PI/2, 0);
         windowLeft.position = new Vector3(765.97, 566.026, 99.25)
         windowLeft.material = createColorMaterial(scene).windowColor;
 
         const windowRight = windowLeft.createInstance('windowRight');
         windowRight.position = new Vector3(-765.97, 566.026, 99.25);
         windowRight.rotation = new Vector3(0, -Math.PI/2, 0);


        //SECOND PLANE MESH
        const secondPlane: Mesh = MeshBuilder.CreateBox('secondPlane', {width: 1300, height: 300, depth: 10}); 
        secondPlane.position = new Vector3(0, 147, -600)
        secondPlane.rotation = new Vector3(Math.PI/2, 0, 0);
       
    
        const rightPlane = secondPlane.clone('rightPlane');
        rightPlane.position = new Vector3(-550, 147, -404);
         
        rightPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
    
        const leftPlane = secondPlane.clone('leftPlane');
        leftPlane.position = new Vector3(550, 147, -153);
        
        leftPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
        
        const quadrantPlane: Mesh = MeshBuilder.CreateBox('quadrantPlane', {width: 500, height: 500, depth: 10});
        quadrantPlane.position = new Vector3(200, 147, -450);
        quadrantPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
        
    
        
        const secondSection: any = Mesh.MergeMeshes([ secondPlane, quadrantPlane, rightPlane, leftPlane])
        secondSection.scaling = new Vector3(1.30,1,1.32)
        secondSection.position = new Vector3(0,200.51,-56.92)
        secondSection.material = createColorMaterial(scene).stairColor;
        //COLLISION MESHES
        const collPlane: Mesh = MeshBuilder.CreatePlane('collisionplane',{width: 1550, height: 600});
        collPlane.position = new Vector3(0, 300, -1032.14);
        collPlane.rotation = new Vector3(0, Math.PI/1, 0)
        collPlane.isVisible = false;
        collPlane.showBoundingBox = true;

        const collPlane2 = collPlane.clone('collisionplane2');
        collPlane2.position = new Vector3(0, 300, 1032.14);
        collPlane2.rotation = new Vector3(0,0,Math.PI/1)

        const collPlaneLong: Mesh = MeshBuilder.CreatePlane('collisionLong', {width: 2100, height: 600});
        collPlaneLong.position = new Vector3(-700.708, 300, 0);
        collPlaneLong.rotation = new Vector3(0, -Math.PI/2, 0);
        collPlaneLong.showBoundingBox = true;
        collPlaneLong.isVisible = false;
        const collPlaneLong2 = collPlaneLong.clone('collisionLong2');
        collPlaneLong2.position = new Vector3(743.708, 300, 0);
        collPlaneLong2.rotation = new Vector3(0, Math.PI/2, 0);
        collPlaneLong2.showBoundingBox = true;

        const collStairs: Mesh = MeshBuilder.CreatePlane('collisionStairs', {width: 800, height: 300});
        collStairs.position = new Vector3(-293.46, 119.26, -298.51);
        collStairs.rotation = new Vector3(Math.PI/3.3, -Math.PI/1, -Math.PI/2)
        collStairs.showBoundingBox = true;
        collStairs.isVisible = false;

         // // //GRAVITY and COLLISION
      
        let collArr = [ground, collStairs, collPlane, collPlane2, collPlaneLong, collPlaneLong2, secondSection];

        for (let i in collArr){
            collArr[i].checkCollisions = true;
        }
       

    return scene;
    };


