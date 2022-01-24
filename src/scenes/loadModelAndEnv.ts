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
    PointLight
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

        //camera.useFramingBehavior = true;

       

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
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
        
        const importResult2 = await SceneLoader.ImportMeshAsync(
            "",
            "",
            roofModel,
            scene,
            undefined,
            ".glb"
        );

        importResult2.meshes[0].scaling = new Vector3(1.5,1.28,1.38);

        return scene;
    };
}

export default new LoadModelAndEnvScene();
