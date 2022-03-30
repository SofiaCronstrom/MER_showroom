import { Engine, 
    Scene, 
    ArcRotateCamera,
    Vector3,
    FreeCamera, 
    DirectionalLight,
    Color3,
    Color4, 
    MeshBuilder
 } from "@babylonjs/core";

import { CreateSceneClass } from "../createScene";
import {MeshesInMainRoom} from './meshes'
import { CollisionMeshes } from "./collision";
import { WindowPlanes } from "./windows";
import { ImportMeshes } from "./importedMesh";
import { pillarMeshes } from "./pillars";
import { Video } from "./video";
import {Railing} from './railing';
import {PaintingPlanes} from './paitingPlanes';

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import { woodPlane } from "./wood";
import { Sculpture } from "./sculpture";





export class LoadModelAndEnvScene implements CreateSceneClass {
    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0,0,0);
        scene.ambientColor = new Color3(0.980, 0.976, 0.901);
        scene.gravity = new Vector3(0, -0.05, 0);

        // // // This creates and positions a free camera (non-mesh)
        //     const camera = new ArcRotateCamera(
        //         "camera",
        //         0,
        //         Math.PI / 3,
        //         10,
        //         new Vector3(0, 0, 0),
        //         scene
        //     );
            
            // //FREE CAMERA
            const camera = new FreeCamera("FreeCamera", new Vector3(0,0,0), scene);
            
        // This targets the camera to scene origin
                //camera.setTarget(Vector3.Zero());
                camera.rotation = new Vector3(0,-15,0)
                camera.speed = 111;
                camera.position = new Vector3(741.7, 100,1497.91)
                camera.applyGravity = true;
                camera.ellipsoid = new Vector3(2, 3, 2);
                camera.inertia=0.2;
                camera.angularSensibility=500;
                camera.fov=1;
        // // // This attaches the camera to the canvas
                scene.collisionsEnabled = true;
                camera.checkCollisions = true;
                camera.attachControl(canvas, true);

        

       // This creates a light
        const light1 = new DirectionalLight("light1", new Vector3(540, -1794, 1329),
        scene);
        light1.direction = new Vector3(0.29, -0.52, 0.8)
        light1.intensity = 0.2
        const light2: DirectionalLight = new DirectionalLight("light2", new Vector3(-540, -1794, 1329), scene)
        light2.direction = new Vector3(-0.13, 0, 0.99);
        light2.intensity = 0.2
        
       
        MeshesInMainRoom(scene);
        CollisionMeshes(scene);
        WindowPlanes(scene);
        ImportMeshes(scene);
        pillarMeshes(scene);
        //Video(scene);
        Railing(scene);
        PaintingPlanes(scene);
        woodPlane(scene);
        Sculpture(scene);
    return scene;
    };
   
}

export default new LoadModelAndEnvScene();
