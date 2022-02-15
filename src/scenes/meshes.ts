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
 } from "@babylonjs/core";


import { createColorMaterial } from "../material";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";

// digital assets
import wallModel from "../../assets/glb/museum-walls.glb";
import roofModel from "../../assets/glb/museum-roof.glb"

export const MeshesInMainRoom = async (scene: Scene) => {
 

        const ground: Mesh = MeshBuilder.CreateGround("ground", {height: 800, width: 800, subdivisions: 4}, scene);
        ground.position = new Vector3(1.25, 0.25, -5.28);
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
         const stairPlane: Mesh = MeshBuilder.CreatePlane('stair1', {width: 200, height: 30, sideOrientation: Mesh.DOUBLESIDE}, scene); 
         stairPlane.position =  new Vector3 (-300, 130, -525);
         stairPlane.material = createColorMaterial(scene).roomColor;
 
         const stairInstance: Mesh = MeshBuilder.CreatePlane('stair1', {width: 300, height: 50, sideOrientation: Mesh.DOUBLESIDE}, scene); 
         stairInstance.rotation = new Vector3(Math.PI/2, 0, 0);
         stairInstance.position = new Vector3 (-300, 110, -500);
         
 
         const stairs: any = Mesh.MergeMeshes([stairPlane, stairInstance]);
         stairs.position = new Vector3(0, -41.11, 243.97);
         // stairs.showBoundingBox = true;
         // stairs.backFaceCulling = true;

        //Position stair meshes (Refactor this part)
        let stairsArray = [];
        stairsArray.push([1, 0, 204.83, -129.25]);
        stairsArray.push([1, 0, 169.52, -78.15]);
        stairsArray.push([1, 0, 134.2, -26.72]);
        stairsArray.push([1, 0, 98.90, 24.11]);
        stairsArray.push([1, 0, 63.6, 74.82]);
        stairsArray.push([1, 0, 28.3, 125.88]);
        stairsArray.push([1, 0, -7, 177.51]);
        stairsArray.push([1, 0, -76.67, 284.17 ]);
        stairsArray.push([1, 0, -111.67, 337.63]);
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
        const secondPlane: Mesh = MeshBuilder.CreatePlane('secondPlane', {width: 1300, height: 300, sideOrientation: Mesh.DOUBLESIDE}); 
        secondPlane.position = new Vector3(0, 147, -600)
        secondPlane.rotation = new Vector3(Math.PI/2, 0, 0);
        secondPlane.material = createColorMaterial(scene).roomColor;
    
        const rightPlane = secondPlane.clone('rightPlane');
        rightPlane.position = new Vector3(-550, 147, -404);
        rightPlane.scaling = new Vector3(0.3,0.7,1); 
        rightPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
    
        const leftPlane = secondPlane.clone('leftPlane');
        leftPlane.position = new Vector3(550, 147, -153);
        leftPlane.scaling = new Vector3(0.8,0.7,3)
        leftPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
        
        const quadrantPlane: Mesh = MeshBuilder.CreatePlane('quadrantPlane', {width: 500, height: 500, sideOrientation: Mesh.DOUBLESIDE});
        quadrantPlane.position = new Vector3(200, 147, -450);
        quadrantPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
        quadrantPlane.material = createColorMaterial(scene).roomColor;
    
        
        const secondSection: any = Mesh.MergeMeshes([ secondPlane, quadrantPlane, rightPlane, leftPlane])
        secondSection.scaling = new Vector3(1.16,1,1.27)
        secondSection.position = new Vector3(0,200.51,-84)

        //COLLISION MESHES
        const collPlane: Mesh = MeshBuilder.CreatePlane('collisionplane',{width: 1550, height: 200, sideOrientation: Mesh.DOUBLESIDE});
        collPlane.position = new Vector3(0, 99.31, -1032.14);
        //collPlane.isVisible = false;
        collPlane.showBoundingBox = true;

        const collPlane2 = collPlane.clone('collisionplane2');
        collPlane2.position = new Vector3(0, 99.31, 1032.14);

        const collPlaneLong: Mesh = MeshBuilder.CreatePlane('collisionLong', {width: 2100, height: 200, sideOrientation: Mesh.DOUBLESIDE});
        collPlaneLong.position = new Vector3(-743.708, 99.31, 0);
        collPlaneLong.rotation = new Vector3(0, Math.PI/2, 0);
        collPlaneLong.showBoundingBox = true;

        const collPlaneLong2 = collPlaneLong.clone('collisionLong2');
        collPlaneLong2.position = new Vector3(743.708, 99.31, 0);
        collPlaneLong2.rotation = new Vector3(0, Math.PI/2, 0);
        collPlaneLong2.showBoundingBox = true;

        const collStairs: Mesh = MeshBuilder.CreatePlane('collisionStairs', {width: 800, height: 300, sideOrientation: Mesh.DOUBLESIDE});
        collStairs.position = new Vector3(-293.46, 119.26, -298.51);
        collStairs.rotation = new Vector3(Math.PI/3.3, -Math.PI/1, -Math.PI/2)
        collStairs.showBoundingBox = true;


         // // //GRAVITY and COLLISION
      
        
       
        ground.checkCollisions = true;
        collStairs.checkCollisions = true;
        collPlaneLong.checkCollisions = true;
        collPlaneLong2.checkCollisions = true;
        collPlane.checkCollisions = true;
        collPlane2.checkCollisions = true;

    return scene;
    };


