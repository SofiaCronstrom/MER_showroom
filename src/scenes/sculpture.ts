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
    PBRSpecularGlossinessMaterial,
    CubeTexture
 } from "@babylonjs/core";

 //import enviroment from '../../assets/enviroment.dds';

 export const Sculpture = (scene: Scene) => {

  
    const sphere: Mesh = MeshBuilder.CreateSphere('sphere', {diameter: 50});
    sphere.position = new Vector3(576.29, 47.03, 120.63);
    const pbr = new PBRSpecularGlossinessMaterial("pbr", scene);
    sphere.material = pbr;
    pbr.diffuseColor = new Color3(1.0, 0.766, 0.336);
    pbr.specularColor = new Color3(1.0, 0.766, 0.336);
    pbr.glossiness = 0.4;
   // pbr.environmentTexture = CubeTexture.CreateFromPrefilteredData(enviroment, scene);

    return scene;
 }