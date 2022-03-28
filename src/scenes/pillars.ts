
import { 
    Scene, 
    Vector3,
    Mesh,
    MeshBuilder,
    Color3,
    StandardMaterial,
    Texture
 } from "@babylonjs/core";
 import {ActionManager} from '@babylonjs/core/Actions/actionManager';
 import {ExecuteCodeAction} from '@babylonjs/core/Actions/directActions';



 import wallMap2 from '../../assets/wallMap.png'
import plaster from '../../assets/texture.jpg'




export const pillarMeshes = (scene: Scene) => {

  const plasterMap: StandardMaterial = new StandardMaterial('plaster', scene);
  plasterMap.diffuseColor = new Color3(0.906, 0.910, 0.910);
  plasterMap.emissiveColor = new Color3(0.361, 0.357, 0.353) 
  plasterMap.ambientColor = new Color3(0.286,0.286,0.286)
  plasterMap.specularColor = new Color3(0,0,0)
  plasterMap.diffuseTexture = new Texture(plaster, scene);
  plasterMap.bumpTexture = new Texture(wallMap2, scene);


       //SECOND PLANE TUBE
       const box: Mesh = MeshBuilder.CreateBox("pillars", {height: 370, width: 20, depth: 20});
       box.material = plasterMap;
       const box2 = MeshBuilder.CreateBox("pillars", {height: 370, width: 5, depth: 30});
       box2.material = plasterMap;
       const box3 = MeshBuilder.CreateBox("pillars", {height: 370, width: 5, depth: 30});
       box3.rotation = new Vector3(0, Math.PI/2, 0)
       box3.material = plasterMap;
       
       const mergeBox: any = Mesh.MergeMeshes([box, box2, box3]);
       mergeBox.position = new Vector3(-542.48, 160.57, 172.24);
       mergeBox.actionManager = new ActionManager(scene);
       mergeBox.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function(ev){	
        scene.hoverCursor = "pointer";
           
      }));
       let pillars: any = [];

       pillars.push([1,-542.48, 160.57, -410.26]);
       pillars.push([1,-37.81, 160.57, -425.26]);
       pillars.push([1,540.63,160.57,-410.26]);
       pillars.push([1,542.5,160.57,503.51]);
       
      

       let pillarsPosition: any = [];
       for (let i in pillars){
         (pillars[i][0] === 1) ? pillarsPosition[i] = mergeBox.clone('instancePillars' + i) : false;  

         pillarsPosition[i].position.x = pillars[i][1]
         pillarsPosition[i].position.y = pillars[i][2]
         pillarsPosition[i].position.z = pillars[i][3]
       }

       return scene;
}