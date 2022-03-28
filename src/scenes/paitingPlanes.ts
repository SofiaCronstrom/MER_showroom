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

    const paintings = MeshBuilder.CreatePlane('painting', {width: 150, height: 150, sideOrientation: Mesh.DOUBLESIDE});
    paintings.position = new Vector3(-788.920, 195.099, 629.5);
    paintings.rotation = new Vector3((-1.99*Math.PI)/180,(90.99*Math.PI)/180,(0.02*Math.PI)/180)


    let paintingPos: any = [];

    paintingPos.push([1,-788.920, 195.099, 1170.46, Math.PI/2, Math.PI/1]);
    paintingPos.push([1,-788.920, 195.099, 898.41, Math.PI/2, Math.PI/1]);

    paintingPos.push([1,295.23, 576.07, -1037.44, Math.PI/1, (1.99*Math.PI)/180]);
    paintingPos.push([1,1.09, 578.35, -1029.06, Math.PI/1, (1.99*Math.PI)/180]);
    paintingPos.push([1,-282.25, 577.23, -1033.88, Math.PI/1, (1.99*Math.PI)/180]);
    
    let paintingArr: any = [];

    for (let i in paintingPos){
        
        (paintingPos[i][0] === 1) ? paintingArr[i] = paintings.clone('paintingArr' + i) : false;

        paintingArr[i].position.x = paintingPos[i][1];
        paintingArr[i].position.y = paintingPos[i][2];
        paintingArr[i].position.z = paintingPos[i][3];

        paintingArr[i].rotation.y = paintingPos[i][4];
        paintingArr[i].rotation.x = paintingPos[i][5];
    }
    return scene;
}