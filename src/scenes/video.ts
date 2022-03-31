
import { 
    Scene,
    Vector3,
    FreeCamera, 
    Color3,
    MeshBuilder,
    Mesh,
    StandardMaterial,
    VideoTexture,
    PointerEventTypes
 } from "@babylonjs/core";


import video from '../../assets/video.mp4';



 export const Video = (scene: Scene) => {

    //VIDEO CONTAINER
    const videoPlane: Mesh = MeshBuilder.CreatePlane('videoplane', {width: 150, height: 100, sideOrientation: Mesh.DOUBLESIDE}, scene);
    videoPlane.position = new Vector3(119, 127,1177)
    videoPlane.rotation = new Vector3(0,61,0)
   
   //MP4
   const videoTextMat = new StandardMaterial('materialVideo', scene);
   const videoTexture = new VideoTexture('videotexture', video, scene);
   videoTexture.video.pause();
   
   videoTextMat.diffuseTexture = videoTexture;
   videoTextMat.roughness = 1;
   videoTextMat.emissiveColor = new Color3(1,1,1);
   videoPlane.material = videoTextMat;


   //LOGIC FOR VIDEO
   scene.onPointerObservable.add( (evt: any) => {
    if(evt.pickInfo.pickedMesh === videoPlane){
        if(videoTexture.video.paused)
        videoTexture.video.play();
    else
        videoTexture.video.pause();
    console.log(videoTexture.video.paused?"paused":"playing"); 
    }
   }, PointerEventTypes.POINTERPICK);

   


  return scene;
 }