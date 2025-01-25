import { MESH_START_Z, MESH_START_Z2, MESH_START_Z3 } from './Constants.js';
export class Germ {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];  
      this.direction = true;

      this.mesh = this.BABYLON.MeshBuilder.CreateDisc("germ", { diameter: 2 }, this.scene);
      this.mesh.billboardMode = this.BABYLON.Mesh.BILLBOARDMODE_ALL;
      this.mesh.position.x = -10;
      this.mesh.position.y = 1.000;
      this.mesh.position.z = 5;
      this.mesh.material = this.textureObj.germ_texture;
      this.mesh.rotation.z = 180;
      this.startPosition = this.randomizeStart();
      setInterval(this.positionMesh.bind(this), 10);
    }

    positionMesh(){
            // Check if box is moving up
            this.mesh.position.x += 0.0125;
            if (this.mesh.position.z < this.startPosition + 0.5 && this.direction) {
                // Increment box position to the up
                this.mesh.position.z += 0.0125;
            }
            else {
                // Swap directions to move down
                this.direction = false;
            }
            // Check if box is moving down
            if (this.mesh.position.z > this.startPosition - 0.5 && !this.direction) {
                // Decrement box position to the down
                this.mesh.position.z -= 0.0125;
            }
            else {
                // Swap directions to move up
                this.direction = true;
            }

   
    }

    randomizeStart(){
        const rando = Math.random();
        if(rando > 0.9) {
            return MESH_START_Z;  
        }
        else if (rando > 0.6){
            return MESH_START_Z2;
        }
        else {
            return MESH_START_Z3;
        }
       
      
    }
  
  }