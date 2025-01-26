import { URCHIN_START_Z } from './Constants.js';

export class Obstacle {
    constructor(Babylon, scene, textureObj, config = {}) {
        this.BABYLON = Babylon;
        this.scene = scene;
        this.textureObj = textureObj;
        this.listOfPointsActive = [];
        this.direction = true;

        this.type = "obstacle";
        this.mesh = config.mesh || this.BABYLON.MeshBuilder.CreateSphere("urchin", { diameter: 2 }, this.scene);
        this.mesh.billboardMode = config.billboard || this.BABYLON.Mesh.BILLBOARDMODE_ALL;
        this.mesh.position.x = config.startX || -15;
        this.mesh.position.y = config.startY || 0;
        this.mesh.position.z = config.startZ || 5;
        this.mesh.material = config.texture || this.textureObj.urchin_texture;
        setInterval(this.positionObstacle.bind(this), 10);
    }

    setStartPosition(startZ){
        this.mesh.position.z = startZ;
    }

    setMesh(mesh){
        this.mesh = mesh;
    }

    positionObstacle(){
        this.mesh.position.x += .0125;

    }
    randomInterval(min, max) {
        return Math.random() * (max - min) + min; // Random number between min and max
    }
}
