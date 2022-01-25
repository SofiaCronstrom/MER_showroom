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
    Color4
 } from "@babylonjs/core";

import { CreateSceneClass } from "../createScene";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";


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
            const camera = new ArcRotateCamera(
                "my first camera",
                0,
                Math.PI / 3,
                10,
                new Vector3(0, 0, 0),
                scene
            );

            // var camera = new UniversalCamera("UniversalCamera", new Vector3(0, 2, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

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

        
        

        const importResult = await SceneLoader.ImportMeshAsync(
            "",
            "",
            wallModel,
            scene,
            undefined,
            ".glb"
        );
      
        // just scale it so we can see it better
        importResult.meshes[0].scaling = new Vector3(1.5,1.28,1.38)
        importResult.meshes[1].material = roomColor;
        const importResult2 = await SceneLoader.ImportMeshAsync(
            "",
            "",
            roofModel,
            scene,
            undefined,
            ".glb"
        );

        importResult2.meshes[0].scaling = new Vector3(1.5,1.28,1.38);
        importResult2.meshes[0].material = stairColor;
        
        scene.debugLayer.show({
            embedMode: true,
          });

        return scene;
    };
}

export default new LoadModelAndEnvScene();
