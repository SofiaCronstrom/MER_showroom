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
import bar from '../../assets/painting-img/bar.jpg'
import glasses from '../../assets/painting-img/glasses.jpg'
import office from '../../assets/painting-img/office.jpg'
import yellow from '../../assets/yellow.png'
import yellowMap from '../../assets/YellowMap.png'
import green from '../../assets/green.png'
import greenMap from '../../assets/greenMap.png'
import stick from '../../assets/stick.png'
import stickMap from '../../assets/stickMap.png'


export const PaintingPlanes = (scene: Scene) => {

    const paintings = MeshBuilder.CreatePlane('painting', {width: 150, height: 150, sideOrientation: Mesh.DOUBLESIDE});
    paintings.position = new Vector3(-788.920, 195.099, 629.5);
    paintings.rotation = new Vector3((-1.99*Math.PI)/180,(90.99*Math.PI)/180,(0.02*Math.PI)/180)


    let paintingPos: any = [];

    paintingPos.push([1,-788.920, 195.099, 1170.46, Math.PI/2, Math.PI/1, Math.PI/1]);
    paintingPos.push([1,-788.920, 195.099, 898.41, Math.PI/2, Math.PI/1, Math.PI/1]);

    paintingPos.push([1,295.23, 576.07, -1037.44, Math.PI/1, (1.99*Math.PI)/180, Math.PI/1]);
    paintingPos.push([1,1.09, 578.35, -1029.06, Math.PI/1, (1.99*Math.PI)/180, Math.PI/1]);
    paintingPos.push([1,-282.25, 577.23, -1033.88, Math.PI/1, (1.99*Math.PI)/180, Math.PI/1]);
    
    let paintingArr: any = [];

    for (let i in paintingPos){
        
        (paintingPos[i][0] === 1) ? paintingArr[i] = paintings.clone('paintingArr' + i) : false;

        paintingArr[i].position.x = paintingPos[i][1];
        paintingArr[i].position.y = paintingPos[i][2];
        paintingArr[i].position.z = paintingPos[i][3];

        paintingArr[i].rotation.y = paintingPos[i][4];
        paintingArr[i].rotation.x = paintingPos[i][5];
        paintingArr[i].rotation.z = paintingPos[i][6];
    }

   const img1 = new StandardMaterial('img1', scene);
   img1.diffuseColor = new Color3(1, 1, 1);
   img1.emissiveColor = new Color3(1, 1, 1);
   img1.diffuseTexture = new Texture(bar, scene);
   paintingArr[0].material = img1;

   const img2 = new StandardMaterial('img2', scene);
   img2.diffuseColor = new Color3(1, 1, 1);
   img2.emissiveColor = new Color3(1, 1, 1);
   img2.diffuseTexture = new Texture(glasses, scene);
   paintingArr[1].material = img2;

   const img3 = new StandardMaterial('img3', scene);
   img3.diffuseColor = new Color3(1, 1, 1);
   img3.emissiveColor = new Color3(1, 1, 1);
   img3.diffuseTexture = new Texture(office, scene);
   paintings.material = img3;

   const img4 = new StandardMaterial('img4', scene);
   img4.diffuseColor = new Color3(0.906, 0.910, 0.910);
   img4.emissiveColor = new Color3(0.98,0.98,0.98) 
   img4.ambientColor = new Color3(0.286,0.286,0.286)
   img4.specularColor = new Color3(0,0,0)
   img4.diffuseTexture = new Texture(yellow, scene);
   img4.bumpTexture = new Texture(yellowMap, scene);
   paintingArr[2].material = img4;

   const img5 = new StandardMaterial('img4', scene);
   img5.diffuseColor = new Color3(0.906, 0.910, 0.910);
   img5.emissiveColor = new Color3(0.98,0.98,0.98);
   img5.ambientColor = new Color3(0.286,0.286,0.286)
   img5.specularColor = new Color3(0,0,0)
   img5.diffuseTexture = new Texture(stick, scene);
   img5.bumpTexture = new Texture(stickMap, scene);
   paintingArr[3].material = img5;

   const img6 = new StandardMaterial('img4', scene);
   img6.diffuseColor = new Color3(0.906, 0.910, 0.910);
   img6.emissiveColor = new Color3(0.98,0.98,0.98);
   img6.ambientColor = new Color3(0.286,0.286,0.286)
   img6.specularColor = new Color3(0,0,0)
   img6.diffuseTexture = new Texture(green, scene);
   img6.bumpTexture = new Texture(greenMap, scene);
   paintingArr[4].material = img6;



    return scene;
}