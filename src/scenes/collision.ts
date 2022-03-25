import { 
    Scene, 
    Vector3,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Texture
 } from "@babylonjs/core";

import wallMap from '../../assets/woodPanel.png'
import wood from '../../assets/wood.png'
import wallMap2 from '../../assets/wallMap.png'
import plaster from '../../assets/texture.jpg'


 export const CollisionMeshes = (scene: Scene) => {

    const WoodMap: StandardMaterial = new StandardMaterial('floorColor', scene);
    WoodMap.diffuseColor = new Color3(0.906, 0.910, 0.910);
    WoodMap.emissiveColor = new Color3(0.302,0.302,0.302) 
    WoodMap.ambientColor = new Color3(0.286,0.286,0.286)
    WoodMap.specularColor = new Color3(0,0,0)
    WoodMap.diffuseTexture = new Texture(wood, scene);
    WoodMap.bumpTexture = new Texture(wallMap, scene);

    const plasterMap: StandardMaterial = new StandardMaterial('plaster', scene);
    plasterMap.diffuseColor = new Color3(0.906, 0.910, 0.910);
    plasterMap.emissiveColor = new Color3(0.263,0.251,0.22) 
    plasterMap.ambientColor = new Color3(0.286,0.286,0.286)
    plasterMap.specularColor = new Color3(0,0,0)
    plasterMap.diffuseTexture = new Texture(plaster, scene);
    plasterMap.bumpTexture = new Texture(wallMap2, scene);
  
     //COLLISION MESHES
     const collPlane: Mesh = MeshBuilder.CreatePlane('collisionplane',{width: 1700, height: 600});
     collPlane.position = new Vector3(0, 254.98, -1032.14);
     collPlane.rotation = new Vector3(0, Math.PI/1, 0)
     collPlane.isVisible = false;
     collPlane.material = WoodMap;

     const collPlaneWood: Mesh = MeshBuilder.CreatePlane('collWood', {width: 100, height: 400});
     collPlaneWood.position = new Vector3(413.683,142.52,-1032.14);
     collPlaneWood.rotation = new Vector3(0, Math.PI/1, 0)
     collPlaneWood.isVisible = true;
     collPlaneWood.material = WoodMap;

     const collPlanePlaster: Mesh = MeshBuilder.CreatePlane('collPlaster', {width: 1000, height: 400});
     collPlanePlaster.position = new Vector3(-790.693,142.52,-208.49);
     collPlanePlaster.rotation = new Vector3(0, -Math.PI/2, 0)
     collPlanePlaster.isVisible = true;
     collPlanePlaster.material = plasterMap;
     collPlanePlaster.scaling = new Vector3(0.58,1.03,1)
     let woodArray: any = [];

     woodArray.push([1, 794.693, 142.52,-502.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-602.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-702.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-802.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-902.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-1002.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-1102.585, Math.PI/2]);
     woodArray.push([1, 794.693, 142.52,-1202.585, Math.PI/2]);

     woodArray.push([1, 813.683, 142.52,-1032.14, Math.PI/1]);
     woodArray.push([1, 713.683, 142.52,-1032.14,Math.PI/1]);
     woodArray.push([1, 513.683, 142.52,-1032.14,Math.PI/1]);
     woodArray.push([1, 313.683, 142.52,-1032.14,Math.PI/1]);
     woodArray.push([1, 213.683, 142.52,-1032.14,Math.PI/1]);
     woodArray.push([1, 113.683, 142.52,-1032.14,Math.PI/1]);
     woodArray.push([1, 613.6683, 142.52,-1032.14,Math.PI/1]);
     woodArray.push([1, 13.683, 142.52,-1032.14,Math.PI/1]);
    

    


    
     let panelArray: any = []

     for (let i in woodArray){
         (woodArray[i][0] === 1) ? panelArray[i] = collPlaneWood.clone('cloneWood' + i) : false;
        //  (woodArray[i][4] === 2) ? panelArray[i].rotating = new Vector3(0, Math.PI/3, 0) : false;
         panelArray[i].position.x = woodArray[i][1];
         panelArray[i].position.y = woodArray[i][2];
         panelArray[i].position.z = woodArray[i][3];
         panelArray[i].rotation.y = woodArray[i][4];
         
     }



     const collPlane2 = collPlane.clone('collisionplane2');
     collPlane2.position = new Vector3(0, 254.764, 1499.907);
     collPlane2.rotation = new Vector3(0,0,Math.PI/1)

     const collPlaneLong: Mesh = MeshBuilder.CreatePlane('collisionLong', {width: 2600, height: 600});
     collPlaneLong.position = new Vector3(-743.708, 254.98, 218.37);
     collPlaneLong.rotation = new Vector3(0, -Math.PI/2, 0);
     collPlaneLong.showBoundingBox = true;
     collPlaneLong.isVisible = false;
     
     const collPlaneLong2 = collPlaneLong.clone('collisionLong2');
     collPlaneLong2.position = new Vector3(743.708, 254.98, 218.37);
     collPlaneLong2.rotation = new Vector3(0, Math.PI/2, 0);
     collPlaneLong2.showBoundingBox = true;

     const collStairs: Mesh = MeshBuilder.CreatePlane('collisionStairs', {width: 800, height: 300});
     collStairs.position = new Vector3(-293.46, 100.91, -340.42);
     collStairs.rotation = new Vector3((51.11*Math.PI)/180, -Math.PI/1, -Math.PI/2)
     collStairs.showBoundingBox = true;
     collStairs.isVisible = false;

    let collArr = [collPlane, collPlane2, collPlaneLong, collPlaneLong2, collStairs, collPlaneWood]

    for (let i in collArr){
        collArr[i].checkCollisions = true;
    }
   

    
  return scene;
 };