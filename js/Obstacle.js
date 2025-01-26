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
        this.mesh.position.x = -15;
        this.mesh.position.y = 0;
        this.mesh.position.z = 3;
        this.mesh.material = this.textureObj.urchin_texture;
        setInterval(this.positionObstacle.bind(this), 10);
    }

    positionObstacle(){
        this.mesh.position.x += .0125;

    }
}
