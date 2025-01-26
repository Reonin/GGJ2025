import { MESH_START_Z, MESH_START_Z2, MESH_START_Z3 } from './Constants.js';
export class Germ {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];
      this.direction = true;
      this.directionX = Math.random() > 0.5 ? 1 : -1; // Random initial horizontal direction
      this.directionZ = Math.random() > 0.5 ? 1 : -1; // Random initial vertical direction
      this.speedX = Math.random() * 0.02 + 0.01; // Random horizontal speed
      this.speedZ = Math.random() * 0.02 + 0.01; //


      this.mesh = this.BABYLON.MeshBuilder.CreateSphere("germ", {diameter:.5, updatable: true}, scene);

      this.mesh.billboardMode = this.BABYLON.Mesh.BILLBOARDMODE_ALL;
      this.mesh.position.x = -10; // Start on the right
      //this.mesh.position.y = 1.000;
      this.mesh.position.z = 5;
      this.mesh.material = this.textureObj.germ_texture;
      this.mesh.position.z = this.randomizeStart(); // Randomized start along the z-axis      this.mesh.checkCollisions = true;
      this.startPosition = this.randomizeStart();
      setInterval(this.positionMesh.bind(this), 10);
    }

    positionMesh() {
        // Always move right on the x-axis
        this.mesh.position.x += this.speedX;

        // Move in the current direction along z-axis
        this.mesh.position.z += this.directionZ * this.speedZ;

        // Change direction only after reaching the target z position
        if ((this.directionZ === 1 && this.mesh.position.z >= this.targetZ) ||
            (this.directionZ === -1 && this.mesh.position.z <= this.targetZ)) {
            this.directionZ *= -1; // Reverse direction
            this.targetZ = this.mesh.position.z + (Math.random() * 2 - 1) * 1; // Set a new target within a range
            this.speedZ = Math.random() * 0.02 + 0.01; // Update vertical speed
        }

        // Keep the germ within vertical bounds (adjust as necessary for your scene)
        if (this.mesh.position.z > 5) {
            this.mesh.position.z = 5;
            this.directionZ = -1; // Reverse direction
        } else if (this.mesh.position.z < -5) {
            this.mesh.position.z = -5;
            this.directionZ = 1; // Reverse direction
        }
    }

    randomizeStart() {
        // Randomize initial Z position and return a random starting point
        const startZPositions = [MESH_START_Z, MESH_START_Z2, MESH_START_Z3];
        return startZPositions[Math.floor(Math.random() * startZPositions.length)];
    }
  }
