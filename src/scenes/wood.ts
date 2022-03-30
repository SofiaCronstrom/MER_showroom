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

 export const woodPlane = (scene: Scene) =>{
    
    const WoodMap: StandardMaterial = new StandardMaterial('floorColor', scene);
    WoodMap.diffuseColor = new Color3(0.906, 0.910, 0.910);
    WoodMap.emissiveColor = new Color3(0.302,0.302,0.302) 
    WoodMap.ambientColor = new Color3(0.286,0.286,0.286)
    WoodMap.specularColor = new Color3(0,0,0)
    WoodMap.diffuseTexture = new Texture(wood, scene);
    WoodMap.bumpTexture = new Texture(wallMap, scene);

    const collPlaneWood: Mesh = MeshBuilder.CreatePlane('collWood', {width: 100, height: 400});
    collPlaneWood.position = new Vector3(413.683,142.52,-1032.14);
    collPlaneWood.rotation = new Vector3(0, Math.PI/1, 0)
    collPlaneWood.isVisible = true;
    collPlaneWood.material = WoodMap;

   
    let woodArray: any = [];

    woodArray.push([1, 794.693, 142.52, 539.93, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52, 497.415, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52, 397.415, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52, 297.415, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52, 197.415, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52, 97.415, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-2.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-102.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-202.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-302.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-402.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-502.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-602.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-702.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-802.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-902.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-1002.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-1102.585, Math.PI/2]);
    woodArray.push([1, 794.693, 142.52,-1202.585, Math.PI/2]);


 
    woodArray.push([1, -794.693, 142.52,-1090.38, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,-990.38, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,-890.38, -Math.PI/2]);
    woodArray.push([1, -790.693, 142.52,-790.38, -Math.PI/2]);
    woodArray.push([1, -790.693, 142.52,-690.38, -Math.PI/2]);
    woodArray.push([1, -790.693, 142.52,-590.38, -Math.PI/2]);
    woodArray.push([1, -790.693, 142.52,-490.38, -Math.PI/2]);
    woodArray.push([1, -789, 142.52,-390.38, -Math.PI/2]);
    woodArray.push([1, -789, 142.52,-290.38, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,-195.43, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,-95.43, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,4.57, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,104.57, -Math.PI/2]);
    woodArray.push([1, -794.693, 142.52,204.57, -Math.PI/2]);

    woodArray.push([1, 813.683, 142.52,-1032.14, Math.PI/1]);
    woodArray.push([1, 713.683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, 513.683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, 313.683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, 213.683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, 113.683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, 613.6683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, 13.683, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -86.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -186.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -286.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -386.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -486.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -586.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -686.371, 142.52,-1032.14,Math.PI/1]);
    woodArray.push([1, -786.371, 142.52,-1032.14,Math.PI/1]);

   


   
    let panelArray: any = []

    for (let i in woodArray){
        (woodArray[i][0] === 1) ? panelArray[i] = collPlaneWood.clone('cloneWood' + i) : false;
       //  (woodArray[i][4] === 2) ? panelArray[i].rotating = new Vector3(0, Math.PI/3, 0) : false;
        panelArray[i].position.x = woodArray[i][1];
        panelArray[i].position.y = woodArray[i][2];
        panelArray[i].position.z = woodArray[i][3];
        panelArray[i].rotation.y = woodArray[i][4];
        
    }

    return scene;

 }