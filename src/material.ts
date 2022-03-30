import { StandardMaterial,
         Scene, 
         Color3, 
         Texture, 
         PBRMetallicRoughnessMaterial } from "@babylonjs/core";

import leather from '../assets/leather.jpg'
import leatherMap from '../assets/leatherMap.png'
export const createColorMaterial = (scene: Scene) => {

    const roomColor: StandardMaterial = new StandardMaterial('roomColor', scene);
    roomColor.diffuseColor = new Color3(0.906, 0.910, 0.910);
    roomColor.emissiveColor = new Color3(0.302,0.302,0.302) 
    roomColor.ambientColor = new Color3(0.286,0.286,0.286)
    roomColor.specularColor = new Color3(0.8, 0.796, 0.486)
    
   
   const chairColor: StandardMaterial = new StandardMaterial('chairmaterial', scene);
   chairColor.emissiveColor = new Color3(0.623, 0.176, 0.301);
   
   const sofaColor: StandardMaterial = new StandardMaterial('sofacolor', scene);
   sofaColor.diffuseColor = new Color3(0.906, 0.910, 0.910);
    sofaColor.emissiveColor = new Color3(0.902,0.902,0.902);
    sofaColor.diffuseTexture = new Texture(leather, scene);
    sofaColor.bumpTexture = new Texture(leatherMap, scene);

   
 
    return {
            
           
            roomColor,
            chairColor,
            sofaColor
            
    };
}
