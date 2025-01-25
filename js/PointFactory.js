import { BUTTON_ANSWER_X, BUTTON_ANSWER_Y, MESH_START_Z } from './Constants.js';

export class PointFactory {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];  
      this.direction = true;
      this.scene.onBeforeRenderObservable.add(this.checkAndDestroyStaleMeshes.bind(this));
    }

    createMesh(){
        const germ = this.BABYLON.MeshBuilder.CreateDisc("germ", { diameter: 2 }, this.scene);
        germ.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        germ.position.x = -10;
        germ.position.y = 1.000;
        germ.position.z = 5;
        germ.material = this.textureObj.germ_texture;
        germ.rotation.z = 180;
        this.listOfPointsActive.push(germ);
        setInterval(this.positionMesh.bind(this), 10);
    }
  
    positionMesh(mesh){
        // debugger;
        this.listOfPointsActive.forEach((mesh, index) => {
            // Check if box is moving up
            mesh.position.x += 0.0125;
            if (mesh.position.z < MESH_START_Z + 0.5 && this.direction) {
                // Increment box position to the up
                mesh.position.z += 0.0125;
            }
            else {
                // Swap directions to move down
                this.direction = false;
            }
            // Check if box is moving down
            if (mesh.position.z > MESH_START_Z - 0.5 && !this.direction) {
                // Decrement box position to the down
                mesh.position.z -= 0.0125;
            }
            else {
                // Swap directions to move up
                this.direction = true;
            }

        });
    }

    // destroyMesh(mesh){
    //     mesh.dispose();
    // }

    checkAndDestroyStaleMeshes(){
        this.listOfPointsActive?.forEach((mesh, index) => {
            if(mesh.position.x > 8) {
                console.log('destroy');
                mesh.dispose();
                this.listOfPointsActive.splice(index, 1);
            }
        });
    }
  
  }