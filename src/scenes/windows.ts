import { 
    Scene, 
    Vector3,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Color3
 } from "@babylonjs/core";

 

 export const WindowPlanes = (scene: Scene) => {

      const windowColor: StandardMaterial = new StandardMaterial('stairColor', scene);
      windowColor.emissiveColor = new Color3(0.972, 0.980, 0.988);

     //WINDOW MESHES
     const windowLeft: Mesh = MeshBuilder.CreatePlane('windowLeft', {width: 1900, height: 300, sideOrientation: Mesh.DOUBLESIDE}); 
     windowLeft.rotation = new Vector3(0, Math.PI/2, 0);
     windowLeft.position = new Vector3(825.79, 533.6, 218.61)
     windowLeft.material = windowColor;

     const windowRight = windowLeft.createInstance('windowRight');
     windowRight.position = new Vector3(-825.79, 533.6, 218.61);
     windowRight.rotation = new Vector3(0, -Math.PI/2, 0);

     const roofWindow: Mesh = MeshBuilder.CreatePlane('roofWindow', {width: 720, height: 360, sideOrientation: Mesh.DOUBLESIDE });
     roofWindow.position = new Vector3(406.56,889.77,231.91);
     roofWindow.rotation = new Vector3(Math.PI/2.65, -Math.PI/2, -Math.PI/2)
     roofWindow.material = windowColor; 
     
     let positionArr: any = [];

     positionArr.push([1,406.56,889.77,692.82]);
     positionArr.push([1,406.56,889.77,-225.28]);
     positionArr.push([1,-406.56,889.77,692.82]);
     positionArr.push([1,-406.56,889.77,236.18]);
     positionArr.push([1,-406.56,889.77,-225.28]);
     
     let windowArr: any = [];
     for (let i in positionArr){
       (positionArr[i][0] === 1) ? windowArr[i] = roofWindow.clone('windowClone' + i) : false;

       windowArr[i].position.x = positionArr[i][1] 
       windowArr[i].position.y = positionArr[i][2]
       windowArr[i].position.z = positionArr[i][3]
     }
     
     let sliceArr: any = [];

     sliceArr = windowArr.slice(2);
     for (let i in sliceArr){
         sliceArr[i].rotation = new Vector3(-Math.PI/2.65, -Math.PI/2, -Math.PI/2);
     }

     //roofWindow, windowArr[0], windowArr[1]
return scene;
 }