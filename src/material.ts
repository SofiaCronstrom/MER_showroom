import { StandardMaterial, Scene, Color3 } from "@babylonjs/core";

export const createColorMaterial = (scene: Scene) => {

    const roomColor = new StandardMaterial('roomColor', scene);
    roomColor.diffuseColor = new Color3(0.906, 0.910, 0.910);
    roomColor.emissiveColor = new Color3(0.302,0.302,0.302) 
    roomColor.ambientColor = new Color3(0.286,0.286,0.286)
    roomColor.specularColor = new Color3(0.8, 0.796, 0.486)
    
   const stairColor = new StandardMaterial('stairColor', scene);
   stairColor.diffuseColor = new Color3(0.556, 0.521, 0.419);

   const windowColor = new StandardMaterial('stairColor', scene);
   windowColor.emissiveColor = new Color3(1, 1, 1);
    return {
            
            roomColor,
            stairColor,
            windowColor
            
    };
}
