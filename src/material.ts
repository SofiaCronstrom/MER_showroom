import { StandardMaterial, Scene, Color3, Texture, PBRMetallicRoughnessMaterial } from "@babylonjs/core";


export const createColorMaterial = (scene: Scene) => {

    const roomColor: StandardMaterial = new StandardMaterial('roomColor', scene);
    roomColor.diffuseColor = new Color3(0.906, 0.910, 0.910);
    roomColor.emissiveColor = new Color3(0.302,0.302,0.302) 
    roomColor.ambientColor = new Color3(0.286,0.286,0.286)
    roomColor.specularColor = new Color3(0.8, 0.796, 0.486)
    
   
   const chairColor: StandardMaterial = new StandardMaterial('chairmaterial', scene);
   chairColor.emissiveColor = new Color3(0.623, 0.176, 0.301);
   
   const sofaColor: StandardMaterial = new StandardMaterial('sofacolor', scene);
   sofaColor.emissiveColor = new Color3(0.207, 0.090, 0.470);
   sofaColor.diffuseColor = new Color3(0.4,0.4,0.4)

   
 
    return {
            
           
            roomColor,
            chairColor,
            sofaColor
            
    };
}
