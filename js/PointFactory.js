import { BUTTON_ANSWER_X, BUTTON_ANSWER_Y, MESH_START_Z } from "./Constants.js";
import { Germ } from "./Germ.js";
import { constrainToBoundaries } from './InfiniteBackground.js';
import { ScrollingBackground} from './InfiniteBackground.js'
export class PointFactory {
    constructor(Babylon, scene, textureObj) {
        this.BABYLON = Babylon;
        this.scene = scene;
        this.textureObj = textureObj;
        this.listOfPointsActive = [];
        this.direction = true;
        this.scene.onBeforeRenderObservable.add(
            this.checkAndDestroyStaleMeshes.bind(this)
        );
        //   this.scene.onAfterRenderObservable.add(this.createMesh.bind(this));
        setInterval(this.createMesh.bind(this), 3000);
    }

    createMesh() {
        // if(Math.random() > 0.99) { // experiment with delta time instead
        const germ = new Germ(this.BABYLON, this.scene, this.textureObj);
        this.listOfPointsActive.push(germ);

        // }
    }

    checkAndDestroyStaleMeshes() {
        this.listOfPointsActive?.forEach((obj, index) => {
            //destroy if reaches arbitrary x end
            if (obj.mesh.position.x > 12) {
                obj.mesh.dispose();
                this.listOfPointsActive.splice(index, 1);
            }
        });
    }

    checkCollisions(mc) {
        if(this.listOfPointsActive.length > 1){
            for (const germ of this.listOfPointsActive) {
                if (this.areColliding(mc, germ.mesh)) {
                    germ.mesh.dispose();
                }
            }
        }
    }

    areColliding(mesh1, mesh2, tolerance = 0.01) {
        const boundingBoxA = mesh1.getBoundingInfo().boundingBox;
        const boundingBoxB = mesh2.getBoundingInfo().boundingBox;
    
        return (
            boundingBoxA.maximumWorld.x > boundingBoxB.minimumWorld.x + tolerance &&
            boundingBoxA.minimumWorld.x < boundingBoxB.maximumWorld.x - tolerance &&
            boundingBoxA.maximumWorld.y > boundingBoxB.minimumWorld.y + tolerance &&
            boundingBoxA.minimumWorld.y < boundingBoxB.maximumWorld.y - tolerance &&
            boundingBoxA.maximumWorld.z > boundingBoxB.minimumWorld.z + tolerance &&
            boundingBoxA.minimumWorld.z < boundingBoxB.maximumWorld.z - tolerance
        );
    }

    getGerms(){
        return this.listOfPointsActive
    }
}
