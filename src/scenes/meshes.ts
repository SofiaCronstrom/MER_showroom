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
    DirectionalLight,
    ShadowGenerator
 } from "@babylonjs/core";


import { createColorMaterial } from "../material";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";




export const MeshesInMainRoom =  (scene: Scene) => {
 

        const ground: Mesh = MeshBuilder.CreateGround("ground", {height: 1400, width: 800, subdivisions: 4}, scene);
        ground.position = new Vector3(1.25, -26.58, -5.28);
        ground.scaling = new Vector3(1.984, 1, 2.708);
        ground.material = createColorMaterial(scene).roomColor;


         //STAIR MESHES
         const stairPlane: Mesh = MeshBuilder.CreateBox('stair1', {width: 200, height: 30, depth: 5}, scene); 
         stairPlane.position =  new Vector3 (-300, 130, -522.5);
         
 
         const stairInstance: Mesh = MeshBuilder.CreateBox('stair2', {width: 300, height: 50, depth: 10 }, scene); 
         stairInstance.rotation = new Vector3(Math.PI/2, 0, 0);
         stairInstance.position = new Vector3 (-300, 110, -500);
        
 
         const stairs: any = Mesh.MergeMeshes([stairPlane, stairInstance]);
         stairs.position = new Vector3(0, -117.64, 151.25);
         stairs.material = createColorMaterial(scene).stairColor

        //Position stair meshes (Refactor this part)
        let stairsArray = [];
        stairsArray.push([1, 0, 202.36, -208.75]);
        stairsArray.push([1, 0, 162.36, -163.75]);
        stairsArray.push([1, 0, 122.36, -118.75]);
        stairsArray.push([1, 0, 82.36, -73.75]);
        stairsArray.push([1, 0, 42.36, -28.75]);
        stairsArray.push([1, 0, 2.36, 16.25]);
        stairsArray.push([1, 0, -37.64, 61.25]);
        stairsArray.push([1, 0, -77.64, 106.25]);

        let stepsArray: any = []

        for (let i in stairsArray){
            (stairsArray[i][0] === 1) ? stepsArray[i] = stairs.clone('instanceStairs' + i) : false;
            
            stepsArray[i].position.x = stairsArray[i][1]
            stepsArray[i].position.y = stairsArray[i][2]
            stepsArray[i].position.z = stairsArray[i][3]
        }

   




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
        secondSection.position = new Vector3(0,200.51,-132.96)
        secondSection.material = createColorMaterial(scene).stairColor;



        const light4 = new DirectionalLight("light4", new Vector3(-435, -1794, -1465),
        scene);
        light4.direction = new Vector3(-0.14, -0.98, 0.1)
        light4.intensity = 0.015
         
        const shadow: any = new ShadowGenerator(1024, light4);
        shadow.getShadowMap().renderList.push(secondSection, stairs, );
        ground.receiveShadows = true;
        
    
    
    // // //GRAVITY and COLLISION
   
        let collArr =  [ground, secondSection];

        for (let i in collArr){
            collArr[i].checkCollisions = true;
        }     

    return scene;
    };


