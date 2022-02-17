import { Engine, 
    Scene, 
    ArcRotateCamera,
    Vector3,
    FreeCamera, 
    DirectionalLight,
    PointLight,
    Color3,
    Color4, 
 } from "@babylonjs/core";

import { CreateSceneClass } from "../createScene";
import {MeshesInMainRoom} from './meshes'
// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";



export class LoadModelAndEnvScene implements CreateSceneClass {
    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.937,0.925,0.925);
        scene.ambientColor = new Color3(0.980, 0.976, 0.901);
        scene.gravity = new Vector3(0, -0.15, 0);

        // This creates and positions a free camera (non-mesh)
            // const camera = new ArcRotateCamera(
            //     "camera",
            //     0,
            //     Math.PI / 3,
            //     10,
            //     new Vector3(0, 0, 0),
            //     scene
            // );

            const camera = new FreeCamera("FreeCamera", new Vector3(0,0,0), scene);
            
        // This targets the camera to scene origin
                // camera.setTarget(Vector3.Zero());
                camera.rotation = new Vector3(0,-15,0)
                camera.speed = 6;
                camera.position = new Vector3(0, 150,0)
                camera.applyGravity = true;
                camera.ellipsoid = new Vector3(2, 2, 2);
        // // This attaches the camera to the canvas
                scene.collisionsEnabled = true;
                camera.checkCollisions = true;
                camera.attachControl(canvas, true);

        

       // This creates a light
        const light1 = new DirectionalLight("light1", new Vector3(765.3, 793.5, -1001.84),
        scene);
        light1.direction = new Vector3(0.29, -0.52, 0.8)
        light1.intensity = 0.1
        const light2: DirectionalLight = new DirectionalLight("light2", new Vector3(-754.58, 760.6,1033.2), scene)
        light2.direction = new Vector3(0.95, -0.29, 0.12);
        light2.intensity = 0.2
        const light3 = new DirectionalLight("light3", new Vector3(445.055, 165.035, -1032.513),
        scene);
        light3.direction = new Vector3(-0.66, -0.33, -0.67)
        light3.intensity = 0.1
        const light4 = new DirectionalLight("light4", new Vector3(-641.619, 172.217, 692.893),
        scene);
        light4.direction = new Vector3(-0.60, -0.52, -0.61)
        light4.intensity = 0.2

   
        MeshesInMainRoom(scene);
    return scene;
    };
   
}

export default new LoadModelAndEnvScene();
