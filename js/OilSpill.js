import { MESH_START_Z, MESH_START_Z2, MESH_START_Z3 } from './Constants.js';
import { Germ } from './Germ.js';

export class OilSpill {
    constructor(Babylon, scene, textureObj, config = {}) {
        this.BABYLON = Babylon;
        this.scene = scene;
        this.textureObj = textureObj;
        this.listOfPointsActive = [];
        this.direction = true;
        this.directionX = Math.random() > 0.5 ? 1 : -1; // Random initial horizontal direction
        this.directionZ = Math.random() > 0.5 ? 1 : -1; // Random initial vertical direction
        this.speedX = Math.random() * 0.02 + 0.01; // Random horizontal speed
        this.speedZ = Math.random() * 0.02 + 0.01; //
        this.mesh = BABYLON.MeshBuilder.CreateDisc("oilSpill",{ radius: .5 }, scene),
        this.mesh.billboardMode = config.billboard || this.BABYLON.Mesh.BILLBOARDMODE_ALL;
        this.textureObj = textureObj;
        this.mesh.material = this.textureObj.oil_spill_texture;
        this.mesh.position.z = -10
        this.mesh.position.x = this.randomizeStart();
        setInterval(this.positionOilSpill.bind(this), 10); 
    }

    positionOilSpill() {
        // Always move right on the x-axis (same as the first asset)
        this.mesh.position.x += this.speedX;
        this.mesh.position.z += this.speedZ;
    }
    
    randomizeStart() {
        // Randomize initial Z position and parameters for unique movement
        const startZPositions = [-3, -5, -7, -9];
        return startZPositions[Math.floor(Math.random() * startZPositions.length)];
    }
}