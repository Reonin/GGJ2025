import { BUTTON_ANSWER_X, BUTTON_ANSWER_Y, MESH_START_Z } from './Constants.js';
import { Germ } from './Germ.js';
import { OilSpill } from './OilSpill.js';

export class PointFactory {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];
      this.listOfPointsActive2 = [];
      this.direction = true;
      this.scene.onBeforeRenderObservable.add(this.checkAndDestroyStaleMeshes.bind(this));
    //   this.scene.onAfterRenderObservable.add(this.createMesh.bind(this));
    setInterval(this.createMesh.bind(this), 3000);
    setInterval(this.createOilSpill.bind(this), 5000);
    }

    createMesh(){
        // if(Math.random() > 0.99) { // experiment with delta time instead
            const germ = new Germ(this.BABYLON, this.scene, this.textureObj);
            this.listOfPointsActive.push(germ);

        // }
    }

    createOilSpill(){
        // if(Math.random() > 0.99) { // experiment with delta time instead
            const oilSpill = new OilSpill(this.BABYLON, this.scene, this.textureObj);
            this.listOfPointsActive2.push(oilSpill);
        // }
    }

    checkAndDestroyStaleMeshes(){
        this.listOfPointsActive?.forEach((obj, index) => {
            //destroy if reaches arbitrary x end
            if(obj.mesh.position.x > 15) {
                obj.mesh.dispose();
                this.listOfPointsActive.splice(index, 1);
                this.listOfPointsActive2.splice(index, 1);
            }
        });
    }

    getGerms(){
        console.log(`${this.listOfPointsActive.length}`);
        return this.listOfPointsActive
    }

    destroyGerm(obj){
        obj.mesh.dispose();
    }

  }

