import { 
    Scene, 
    Vector3,
    Mesh,
    MeshBuilder,
    
 } from "@babylonjs/core";


import { MeshesInMainRoom } from "./meshes";

 export const CollisionMeshes = async (scene: Scene) => {
  
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
   
     let collArr =  [(await MeshesInMainRoom(scene)).ground, collStairs, collPlane, collPlane2, collPlaneLong, collPlaneLong2, (await MeshesInMainRoom(scene)).secondSection];

     for (let i in collArr){
         collArr[i].checkCollisions = true;
     }

     return scene;

 };