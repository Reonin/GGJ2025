import { Obstacle } from './Obstacle.js';

export class Shark extends Obstacle {
    constructor(Babylon, scene, textureObj) {
        super(Babylon, scene, textureObj, {
            startZ : Math.floor(Math.random() * 6),
            mesh : BABYLON.MeshBuilder.CreatePlane("shark",
                {
                    width: 3, height: 2
                   // radius: 2,
                  //  tessellation: 32
             //       diameterX: 4,  // stretch horizontally
             //       diameterY: 1,  // compress vertically
             //       diameterZ: 7   // adjust depth
                }, scene),
            //billboard : BABYLON.Mesh.BILLBOARDMODE_NONE,
            texture : textureObj.shark_texture
        });
        this.mesh.rotation.z = 0;
        this.mesh.rotation.y = 0;
        this.mesh.rotation.x = 0;
        this.mesh.scaling = new BABYLON.Vector3(1.5, 1, 1); // Scale along the X-axis
        this.hitbox = BABYLON.MeshBuilder.CreateDisc("sharkHitBox",
                {
                  radius: 2,
                  //  tessellation: 32
             //       diameterX: 4,  // stretch horizontally
             //       diameterY: 1,  // compress verticallyW
             //       diameterZ: 7   // adjust depth
                }, scene)
            //billboard : BABYLON.Mesh.BILLBOARDMODE_NONE,


        //this.mesh.rotation.z = -25;
        //this.mesh.rotation.y = 180;
    }

    positionObstacle(){
        this.mesh.position.x += .0325;
    }

}
