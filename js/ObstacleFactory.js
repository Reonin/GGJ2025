import { URCHIN_START_Z } from './Constants.js';
import { Urchin } from './Urchin.js';
import { Shark } from './Shark.js';
import { Hook } from './FishingHook.js'

export class ObstacleFactory {
    constructor(Babylon, scene, textureObj) {
      this.BABYLON = Babylon;
      this.scene = scene;
      this.textureObj = textureObj;
      this.listOfPointsActive = [];
      this.direction = true;
      this.scene.onBeforeRenderObservable.add(this.checkAndDestroyStaleMeshes.bind(this));
      setInterval( this.createUrchin.bind(this) , 3000);
      setInterval( this.createShark.bind(this), 5000);
      setInterval( this.createHook.bind(this), 7000);
    }
    createUrchin(){
        if(Math.random() >= 0.5) { // experiment with delta time instead
            const urchin = new Urchin(this.BABYLON, this.scene, this.textureObj, {});
            this.listOfPointsActive.push(urchin);

        }
    }
    createShark(){
        if(Math.random() >= 0.5) { // experiment with delta time instead
            const shark = new Shark(this.BABYLON, this.scene, this.textureObj, {});
            this.listOfPointsActive.push(shark);

        }
    }

    createHook(){
        if(Math.random() >= 0.5) { // experiment with delta time instead
            const hook = new Hook(this.BABYLON, this.scene, this.textureObj, {});
            this.listOfPointsActive.push(hook);

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
    randomInterval(min, max) {
        return Math.random() * (max - min) + min; // Random number between min and max
    }
}

