import { Engine, MeshBuilder, Scene, ArcRotateCamera, Vector3, HemisphericLight, SceneLoader, Material} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import {CreateSceneClass} from "../createScene";

// If you don't need the standard material you will still need to import it since the scene requires it.
// import "@babylonjs/core/Materials/standardMaterial";

import {walls} from "../../assets/glb/museum-walls.glb";


export class DefaultSceneWithTexture implements CreateSceneClass {

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
    
        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());
    
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        // Our built-in 'sphere' shape.
        const sphere = MeshBuilder.CreateSphere(
            "sphere",
            { diameter: 2, segments: 32 },
            scene
        );
    
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
    
        // Our built-in 'ground' shape.
        const ground = MeshBuilder.CreateGround(
            "ground",
            { width: 6, height: 6 },
            scene
        );
       
        const importResult = await SceneLoader.ImportMeshAsync(
            "",
            "",
            walls,
            scene,
            undefined,
            ".glb"
        );
         
       
        
    
        return scene;
    };
}

export default new DefaultSceneWithTexture();