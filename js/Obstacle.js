import { URCHIN_START_Z } from './Constants.js';

export class Obstacle {
    constructor(Babylon, scene, textureObj) {
        this.BABYLON = Babylon;
        this.scene = scene;
        this.textureObj = textureObj;
        this.listOfPointsActive = [];
        this.direction = true;

        this.mesh = this.BABYLON.MeshBuilder.CreateSphere("obstacle", { diameter: 2 }, this.scene);
        this.mesh.billboardMode = this.BABYLON.Mesh.BILLBOARDMODE_ALL;
        this.mesh.position.x = -10;
        this.mesh.position.y = 1.000;
        this.mesh.position.z = 3;
        this.mesh.material = this.textureObj.urchin_texture;
        //this.mesh.rotation.x = 45;
        //this.mesh.rotation.y = -45;
        //this.mesh.rotation.z = 180;
        setInterval(this.positionObstacle.bind(this), 10);
    }

    positionObstacle(){
        this.mesh.position.x += .0125;

    }
}
