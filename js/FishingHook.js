import { Obstacle } from './Obstacle.js';

export class Hook extends Obstacle {
    constructor(Babylon, scene, textureObj) {
        super(Babylon, scene, textureObj, {
            startZ : -5,
            startX : scene.getMeshByName("bubble").position.x - 10 - Math.floor(Math.random() * 3),
            mesh : BABYLON.MeshBuilder.CreatePlane("hook",{
                width : 2, height: 4

             //       diameterX: 4,  // stretch horizontally
             //       diameterY: 1,  // compress vertically
             //       diameterZ: 7   // adjust depth
                }, scene),
            //billboard : BABYLON.Mesh.BILLBOARDMODE_NONE,
            texture : textureObj.hook_texture
    });
        this.goingDown = true;
    }

    positionObstacle(){
        this.mesh.position.x += .0125;
        if(this.goingDown === true){
            this.mesh.position.z += .0300;
        }
        setInterval(() => {
            this.goingDown = false;
            this.mesh.position.z -= .0300;
            if(this.mesh.position.z < -9){
                this.mesh.dispose();
            }
            // Code to run repeatedly
        }, this.randomInterval(1500,7500));
    }

}
