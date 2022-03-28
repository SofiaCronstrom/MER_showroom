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




// required imports
import "@babylonjs/core/Loading/loadingScreen";
import { meshUboDeclaration } from "@babylonjs/core/Shaders/ShadersInclude/meshUboDeclaration";



export const PaintingPlanes = (scene: Scene) => {

    const paintings = MeshBuilder.CreatePlane('painting', {width: 200, height: 200, sideOrientation: Mesh.DOUBLESIDE});
    paintings.position = new Vector3(-788.64, 117.32, 884.7);
}