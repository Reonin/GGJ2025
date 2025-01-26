import { BUTTON_ANSWER_X, BUTTON_ANSWER_Y, MESH_START_Z } from './Constants.js';
import setUpButtons from './buttonConfig.js';
import setUpHUD from './HUDConfig.js';
import loadAssets from './AssetLoader.js';
import { GameManager } from './RoundSwap.js';
import { AudioManager } from './AudioManager.js';
import handleMicrophoneInput from './Bubble.js';
import {
    ScrollingBackground,
    updateScrollSpeed,
} from "./InfiniteBackground.js";
import { PointFactory } from './PointFactory.js';
import { ObstacleFactory } from './ObstacleFactory.js';

// import {changeRound, checkForCorrectAnswer} from './RoundSwap.js';
let audioManager;
let pointFactory;
let obstacleFactory;
export function init() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true, { stencil: true }); // Generate the BABYLON 3D engine
    BABYLON.Engine.audioEngine.useCustomUnlockedButton = true;
    // Unlock audio on first user interaction.
    window.addEventListener(
        "click",
        () => {
        if (!BABYLON.Engine.audioEngine.unlocked) {
            BABYLON.Engine.audioEngine.unlock();
        }
        },
        { once: true },
    );
    let advancedTexture;
    let startGameButton;
    let player1 = {};
    let correctAnswer;
    let currentRound = 0;
    let isGameStarted = false;


    const buttonList = {
        startGameButton,
    };

    let player1Score = {},
        scoreLabel1 = {},
        title = {},
        subtitle = {},
        question = {};

    const HUD = {
        player1,
        correctAnswer,
        player1Score,
        scoreLabel1,
        title,
        subtitle,
        question,
        currentRound,
    };

    let textureObj;
    const gameManager = new GameManager();

    let bubble;


    let seed0;
    let seed1;
    let seed2;
    let seed3;
    let seed4;

    const createScene = async function () {
        // // Creates a basic Babylon Scene object
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.UniversalCamera(
            "camera1",
            // new BABYLON.Vector3(0, 2, 0), scene);
            new BABYLON.Vector3(0, 15, 0),
            scene
        );
        // Targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // // This attaches the camera to the canvas
        // // camera.attachControl(canvas, true);
        // // Creates a light, aiming 0,1,0 - to the sky
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, -0.4),
            scene
        );
        // // Dim the light a small amount - 0 to 1
        // light.intensity = 0.5;

        camera.attachControl(canvas, true);
        camera.inputs.addMouseWheel();

        //GUI
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
            "GUI",
            true,
            scene,
            BABYLON.Texture.NEAREST_NEAREST
        );
        let loadedGUI = await advancedTexture.parseFromURLAsync(
            "./json/guiTexture.json"
        );

        textureObj = loadAssets(BABYLON, scene);
        setUpButtons(advancedTexture, buttonList);
        setUpHUD(advancedTexture, HUD);
        audioManager = new AudioManager(BABYLON, scene);
        pointFactory = new PointFactory(BABYLON, scene, textureObj);
        obstacleFactory = new ObstacleFactory(BABYLON, scene, textureObj);
        pointFactory.createMesh();
        obstacleFactory.createUrchin();

        audioManager.loadSounds();

        const assetsManager = new BABYLON.AssetsManager(scene);

        const background = ScrollingBackground(scene);


        assetsManager.load();

        HUD.player1.meshes = [{}, {}, {}];


        bubble = BABYLON.MeshBuilder.CreateSphere("bubble", { diameter: .5 }, scene);
        bubble.position.x = 5;
        scene.registerBeforeRender(() => {
            bubble.rotation.x += 0.02;
            bubble.rotation.y += 0.01;
            bubble.rotation.z += 0.01;
        });

        // Enable collision for the bubble
        bubble.checkCollisions = true;

        let lastCollidedGerm = null;
        let collisionCooldown = 0;
        let score = 0;

       setInterval(() => {
        if (!isGameStarted) return;

        collisionCooldown++;

        if (collisionCooldown < 30) return; // Frame cooldown

        scene.meshes.forEach((m) => {
        if (bubble !== m && bubble.intersectsMesh(m, true) && m.name === 'germ' && m !== lastCollidedGerm) {
           console.log("Collision detected between bubble and germ");
           lastCollidedGerm = m;
           collisionCooldown = 0;
           score += 1;
           HUD.player1Score.text = score;
           m.dispose();
          }
       }, 100);
    })
 




        bubble.material = textureObj.bubble_texture;

        // Function to handle microphone input

        handleMicrophoneInput(scene, bubble, audioManager);



        const directionArr1 = [true, true, true];
        const directionArr2 = [true, true, true];

        let linesystem;
        let linesystem2;
        // Code in this function will run ~60 times per second
        scene.registerBeforeRender(() => {});

        HUD.player1.meshes.forEach((element) => {
            element.material = textureObj.blue_mat;
        });
        HUD.player1Score.text = "0";

        buttonList.startGameButton.onPointerUpObservable.add(function () {
            updateScrollSpeed(background, 0.03);
            hideTitleScreen();
            gameManager.changeRound(1, HUD, true);
            isGameStarted = true;

            seed0 = scene.getMeshByName("seed0");
        });

        return scene;
    };

    const PromiseScene = createScene(); //Call the createScene function that returns a promise
    PromiseScene.then((scene) => {
        // scene.debugLayer.show();//show debugger
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });
        const hl = new BABYLON.HighlightLayer("hl1", scene);
        scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN) {
                switch (kbInfo.event.key) {
                    case "A":
                    case "a":
                        console.log("KEY DOWN: ", kbInfo.event.key);
                        seed0.position.x += 1;
                    break;
                    case '`':
                        scene.debugLayer.show();
                    break;

                }
            }
        });
    });

    const hideTitleScreen = () => {
        HUD.title.isVisible = false;
        HUD.subtitle.isVisible = false;

        buttonList.startGameButton.isVisible = false;
    };

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}
