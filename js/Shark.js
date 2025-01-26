import { Obstacle } from './Obstacle.js';

export class Shark extends Obstacle {
    constructor(Babylon, scene, textureObj) {
        super(Babylon, scene, textureObj, {
            startZ : Math.floor(Math.random() * 6),
            mesh : BABYLON.MeshBuilder.CreateDisc("shark",{
                    radius: 2

             //       diameterX: 4,  // stretch horizontally
             //       diameterY: 1,  // compress vertically
             //       diameterZ: 7   // adjust depth
                }, scene),
            //billboard : BABYLON.Mesh.BILLBOARDMODE_NONE,
            texture : textureObj.shark_texture
        });
        console.log(`Shark created!`);
        this.mesh.rotation.z = 0;
        this.mesh.rotation.y = 0;
        this.mesh.rotation.x = 0;
        //this.mesh.rotation.z = -25;
        //this.mesh.rotation.y = 180;
    }

    positionObstacle(){
        this.mesh.position.x += .0325;
    }

}
