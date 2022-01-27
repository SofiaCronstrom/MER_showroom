import { Engine, 
    Scene, 
    ArcRotateCamera,
    Vector3,
    HemisphericLight, 
    SceneLoader, 
    FreeCamera, 
    StandardMaterial, 
    UniversalCamera,
    DirectionalLight,
    PointLight,
    Color3,
    Color4, 
    Mesh,
    MeshBuilder
 } from "@babylonjs/core";

import { CreateSceneClass } from "../createScene";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";



// digital assets
import wallModel from "../../assets/glb/museum-walls.glb";
import roofModel from "../../assets/glb/museum-roof.glb"

export class LoadModelAndEnvScene implements CreateSceneClass {
    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.937,0.925,0.925);
        scene.ambientColor = new Color3(0.980, 0.976, 0.901);
        

        // This creates and positions a free camera (non-mesh)
            // const camera = new ArcRotateCamera(
            //     "camera",
            //     0,
            //     Math.PI / 3,
            //     10,
            //     new Vector3(0, 0, 0),
            //     scene
            // );

            const camera = new UniversalCamera("camera1", new Vector3(206, 30, 842), scene);
            
        // This targets the camera to scene origin
                camera.setTarget(Vector3.Zero());
                camera.rotation = new Vector3(0,-15,0)
                camera.speed = 6;
                
        // This attaches the camera to the canvas
                camera.attachControl(canvas, true);

        
        //Material to room scene and windows
        const roomColor = new StandardMaterial('roomColor', scene);
        roomColor.diffuseColor = new Color3(0.984, 0.988, 0.980);
        roomColor.emissiveColor = new Color3(0.039, 0.016, 0.137) 
        roomColor.ambientColor = new Color3(0.22,0.22,0.035)
        roomColor.specularColor = new Color3(0.973,0.973,0.973)
        
        const stairColor = new StandardMaterial('stairColor', scene);
        stairColor.diffuseColor = new Color3(0.556, 0.521, 0.419);
        
        const windowColor = new StandardMaterial('stairColor', scene);
        windowColor.emissiveColor = new Color3(1, 1, 1);

       

        // This creates a light
        const light1 = new PointLight("spot02", new Vector3(476.92, 1167.96, 1329.6),
        scene);
        const light2: DirectionalLight = new DirectionalLight("light3", new Vector3(-1,-2,-1), scene)
        light2.direction = new Vector3(0.72, -0.21, -0.67);
        light2.intensity = 0.7

        //create ground
        const ground: Mesh = MeshBuilder.CreateGround("ground", {height: 800, width: 800, subdivisions: 4}, scene);
        ground.position = new Vector3(1.25, 0.25, -5.28);
        ground.scaling = new Vector3(1.984, 1, 2.708);
        ground.material = roomColor;

        //room model
        const importResult = await SceneLoader.ImportMeshAsync(
            "",
            "",
            wallModel,
            scene,
            undefined,
            ".glb"
        );
      
        // // just scaling and adding material to the room
        importResult.meshes[0].scaling = new Vector3(1.5,1.28,1.38)
        importResult.meshes[1].material = roomColor;

        //adding roof model
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
        importResult2.meshes[1].material = roomColor;
        
        //stair meshes
        const stairPlane: Mesh = MeshBuilder.CreatePlane('stair1', {width: 200, height: 30, sideOrientation: Mesh.DOUBLESIDE}, scene); 
        stairPlane.position =  new Vector3 (-300, 130, -525);
        stairPlane.material = stairColor;

        const stairInstance: Mesh = MeshBuilder.CreatePlane('stair1', {width: 300, height: 50, sideOrientation: Mesh.DOUBLESIDE}, scene); 
        stairInstance.rotation = new Vector3(Math.PI/2, 0, 0);
        stairInstance.position = new Vector3 (-300, 110, -500);
        

        const stairs: any = Mesh.MergeMeshes([stairPlane, stairInstance]);
        stairs.position = new Vector3(0, -41.11, 243.97);
        
        //window meshes
        const windowLeft: Mesh = MeshBuilder.CreatePlane('windowLeft', {width: 1700, height: 300, sideOrientation: Mesh.DOUBLESIDE}); 
        windowLeft.rotation = new Vector3(0, Math.PI/2, 0);
        windowLeft.position = new Vector3(765.97, 566.026, 99.25)
        windowLeft.material = windowColor;

        const windowRight = windowLeft.createInstance('windowRight');
        windowRight.position = new Vector3(-765.97, 566.026, 99.25);
        windowRight.rotation = new Vector3(0, -Math.PI/2, 0);

        //Position stair meshes
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

        //Meshes for the second plane
        const secondPlane: Mesh = MeshBuilder.CreatePlane('secondPlane', {width: 1300, height: 300, sideOrientation: Mesh.DOUBLESIDE}); 
        secondPlane.position = new Vector3(0, 147, -600)
        secondPlane.rotation = new Vector3(Math.PI/2, 0, 0);
        secondPlane.material = roomColor;
    
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
        quadrantPlane.material = roomColor;
    
        
        const secondSection: any = Mesh.MergeMeshes([ secondPlane, quadrantPlane, rightPlane, leftPlane])
        secondSection.scaling = new Vector3(1.16,1,1.27)
        secondSection.position = new Vector3(0,200.51,-84)
        
        // //GRAVITY and COLLISION
        // scene.gravity = new Vector3(0, 0, 0);
        // // Enable Collisions
        // scene.collisionsEnabled = true;

        // //Then apply collisions and gravity to the active camera
        // camera.checkCollisions = true;
        // camera.applyGravity = true;
        // //Set the ellipsoid around the camera (e.g. your player's size)
        // camera.ellipsoid = new Vector3(1, 2, 1);
        
        // // //Wich meshes are collisionable
        // importResult.meshes[1].checkCollisions = true;
        // ground.checkCollisions = true;
        return scene;
    };
}

export default new LoadModelAndEnvScene();
