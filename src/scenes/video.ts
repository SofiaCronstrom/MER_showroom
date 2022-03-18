
import { 
    Scene,
    Vector3,
    FreeCamera, 
    Color3,
    MeshBuilder,
    Mesh,
    StandardMaterial,
    VideoTexture
 } from "@babylonjs/core";

import video from '../../assets/video.mp4';

 export const Video = (scene: Scene) => {


    const videoPlane: Mesh = MeshBuilder.CreatePlane('videoplane', {width: 150, height: 100, sideOrientation: Mesh.DOUBLESIDE}, scene);
    videoPlane.position = new Vector3(119, 127,1177)
    videoPlane.rotation = new Vector3(0,61,0)

   const videoTextMat = new StandardMaterial('materialVideo', scene);
   const videoTexture = new VideoTexture('videotexture', video, scene);
   
   videoTextMat.diffuseTexture = videoTexture;
   videoTextMat.roughness = 1;
   videoTextMat.emissiveColor = new Color3(1,1,1);
   videoPlane.material = videoTextMat;


return scene;
 }