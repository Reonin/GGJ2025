import { URCHIN_START_Z } from './Constants.js';
import { Obstacle } from './Obstacle.js';

export class ObstacleFactory {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];
      this.direction = true;
      this.scene.onBeforeRenderObservable.add(this.checkAndDestroyStaleMeshes.bind(this));

      setInterval( this.createUrchin.bind(this) , 3000);
    }
    createUrchin(){
        if(Math.random() >= 0.5) { // experiment with delta time instead
            const urchin = new Obstacle(this.BABYLON, this.scene, this.textureObj);
            this.listOfPointsActive.push(urchin);

        }
    }



    checkAndDestroyStaleMeshes(){
        this.listOfPointsActive?.forEach((obj, index) => {
            //destroy if reaches arbitrary x end
            if(obj.mesh.position.x > 15) {
                obj.mesh.dispose();
                this.listOfPointsActive.splice(index, 1);
            }
        });
    }
}

