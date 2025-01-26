import { BUTTON_ANSWER_X, BUTTON_ANSWER_Y, MESH_START_Z } from './Constants.js';
import { Germ } from './Germ.js';
export class PointFactory {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];  
      this.direction = true;
      this.scene.onBeforeRenderObservable.add(this.checkAndDestroyStaleMeshes.bind(this));
    //   this.scene.onAfterRenderObservable.add(this.createMesh.bind(this));
    setInterval(this.createMesh.bind(this), 3000);
    }

    createMesh(){
        // if(Math.random() > 0.99) { // experiment with delta time instead
            const germ = new Germ(this.BABYLON, this.scene, this.textureObj);
            this.listOfPointsActive.push(germ);
          
        // }
    }
  
    
    checkAndDestroyStaleMeshes(){
        this.listOfPointsActive?.forEach((obj, index) => {
            //destroy if reaches arbitrary x end 
            if(obj.mesh.position.x > 12) {
                obj.mesh.dispose();
                this.listOfPointsActive.splice(index, 1);
            }
        });
    }

    getGerms(){
        return this.listOfPointsActive
    }

    destroyGerm(obj){
        obj.mesh.dispose();
    }
  
  }