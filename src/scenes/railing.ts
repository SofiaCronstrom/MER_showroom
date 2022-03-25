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
import { version } from "webpack";


import Map from '../../assets/frostedMap.png'
import frosted from '../../assets/frostedText.png'

export const Railing = (scene: Scene) => {
    
    const material: StandardMaterial = new StandardMaterial('floorColor', scene);
        material.diffuseColor = new Color3(0.906, 0.910, 0.910);
        material.emissiveColor = new Color3(0.302,0.302,0.302) 
        material.ambientColor = new Color3(0.286,0.286,0.286)
        material.specularColor = new Color3(0,0,0)
        material.diffuseTexture = new Texture(frosted, scene);
        material.bumpTexture = new Texture(Map, scene);


         //RAILING
         const railing: Mesh = MeshBuilder.CreateBox('railing', {width:590, height: 100, depth: 5});
         railing.position = new Vector3(230.99,409.37,-406)
         railing.material = material;

         const railing2 = railing.clone('railingclone2');
         railing2.position = new Vector3(525.38,409.5,95.78);
         railing2.scaling = new Vector3(1.68,1,1);
         railing2.rotation = new Vector3(0, -Math.PI/2, 0);
         const railing3 = railing.clone('railingclone3');
         railing3.position = new Vector3(-661.27,409.3,253.77);
         railing3.scaling = new Vector3(0.46,1,1);
         const railing4 = railing.clone('railingclone4');
         railing4.position = new Vector3(-525,408.75,-222.49)
         railing4.scaling = new Vector3(1.6,1,1);
         railing4.rotation = new Vector3(0, Math.PI/2, 0);
         const railing5 = railing.clone('railingclone3');
         railing5.position = new Vector3(661.27,409.3,588.11);
         railing5.scaling = new Vector3(0.46,1,1);

    return scene;
}