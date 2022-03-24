import { Engine, 
    Scene, 
    Color3,
    Vector3,
    Mesh,
    MeshBuilder,
    Texture,
    DirectionalLight,
    ShadowGenerator, 
    StandardMaterial,
 
 } from "@babylonjs/core";




// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";

import normalMap from '../../assets/NormalMap.png'
import texture from '../../assets/texture2.jpg'
import Map from '../../assets/frostedMap.png'
import frosted from '../../assets/frostedText.png'


export const MeshesInMainRoom =  (scene: Scene) => {
 
        
        const floorMap: StandardMaterial = new StandardMaterial('floorColor', scene);
        floorMap.diffuseColor = new Color3(0.906, 0.910, 0.910);
        floorMap.emissiveColor = new Color3(0.302,0.302,0.302) 
        floorMap.ambientColor = new Color3(0.286,0.286,0.286)
        floorMap.specularColor = new Color3(0,0,0)
        floorMap.diffuseTexture = new Texture(texture, scene);
        floorMap.bumpTexture = new Texture(normalMap, scene);

        const material: StandardMaterial = new StandardMaterial('floorColor', scene);
        material.diffuseColor = new Color3(0.906, 0.910, 0.910);
        material.emissiveColor = new Color3(0.302,0.302,0.302) 
        material.ambientColor = new Color3(0.286,0.286,0.286)
        material.specularColor = new Color3(0,0,0)
        material.diffuseTexture = new Texture(frosted, scene);
        material.bumpTexture = new Texture(Map, scene);
        
        const ground: Mesh = MeshBuilder.CreateGround("ground", {height: 1400, width: 800, subdivisions: 4}, scene);
        ground.position = new Vector3(1.25, -26.58, -5.28);
        ground.scaling = new Vector3(1.984, 1, 2.708);
        ground.material = floorMap;
        
       

         //STAIR MESHES
         const stairPlane: Mesh = MeshBuilder.CreateBox('stair1', {width: 200, height: 30, depth: 5}, scene); 
         stairPlane.position =  new Vector3 (-300, 130, -522.5);
         
 
         const stairInstance: Mesh = MeshBuilder.CreateBox('stair2', {width: 300, height: 50, depth: 10 }, scene); 
         stairInstance.rotation = new Vector3(Math.PI/2, 0, 0);
         stairInstance.position = new Vector3 (-300, 110, -500);
        
 
         const stairs: any = Mesh.MergeMeshes([stairPlane, stairInstance]);
         stairs.position = new Vector3(0, -117.64, 151.25);
         stairs.material = floorMap

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
        

        //VIDEOSTAND
        const videoStand: Mesh = MeshBuilder.CreateBox('videostand', {width: 150, height: 100, depth: 10}, scene )
        videoStand.position = new Vector3(119, 10,1177)
        videoStand.rotation = new Vector3(0,61,0)
        videoStand.material = floorMap;

        //RAILING
        const railing: Mesh = MeshBuilder.CreateBox('railing', {width:590, height: 100, depth: 5});
        railing.position = new Vector3(230.99,409.37,-406)
        railing.material = material;
        //SECOND PLANE MESH
        const secondPlane: Mesh = MeshBuilder.CreateBox('secondPlane', {width: 800, height: 300, depth: 20}); 
        secondPlane.position = new Vector3(0, 147, -600)
        secondPlane.rotation = new Vector3(Math.PI/2, 0, 0);
       
    
        const rightPlane = secondPlane.clone('rightPlane');
        rightPlane.position = new Vector3(-550, 147, -504);
        rightPlane.scaling = new Vector3(2,1,1)
        rightPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
    
        const leftPlane = secondPlane.clone('leftPlane');
        leftPlane.position = new Vector3(550, 147, -253);
        leftPlane.scaling = new Vector3(2,1,1)
        leftPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
        
        const quadrantPlane: Mesh = MeshBuilder.CreateBox('quadrantPlane', {width: 250, height: 450, depth: 20});
        quadrantPlane.position = new Vector3(175, 147, -325);
        quadrantPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
        
    
        
        const secondSection: any = Mesh.MergeMeshes([ secondPlane, quadrantPlane, rightPlane, leftPlane])
        secondSection.scaling = new Vector3(1.30,1,1.32)
        secondSection.position = new Vector3(0,200.51,-132.96)
        secondSection.material = floorMap;



        const light4 = new DirectionalLight("light4", new Vector3(-435, -1794, -1465),
        scene);
        light4.direction = new Vector3(-0.14, -0.98, 0.1)
        light4.intensity = 0.055
         
        const shadow: any = new ShadowGenerator(1024, light4);
        
        for (let i=0; i<stepsArray.length; i++){
            shadow.getShadowMap().renderList.push( secondSection, stepsArray[i]);
        }
        ground.receiveShadows = true;
        
    
    
    // //GRAVITY and COLLISION
   
        let collArr =  [ground, secondSection];

        for (let i in collArr){
            collArr[i].checkCollisions = true;
        }     

    return scene;
    };


