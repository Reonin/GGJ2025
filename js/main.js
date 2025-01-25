import { BUTTON_ANSWER_X, BUTTON_ANSWER_Y, MESH_START_Z } from './Constants.js';
import setUpButtons from './buttonConfig.js';
import setUpHUD from './HUDConfig.js';
import loadAssets from './AssetLoader.js';
import { GameManager } from './RoundSwap.js';
import { AudioManager } from './AudioManager.js';
import {
    ScrollingBackground,
    updateScrollSpeed,
} from "./InfiniteBackground.js";
import { PointFactory } from './PointFactory.js';

// import {changeRound, checkForCorrectAnswer} from './RoundSwap.js';
let audioManager;
let pointFactory;
export function init() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true, { stencil: true }); // Generate the BABYLON 3D engine

    let advancedTexture;
    let startGameButton;
    let player1 = {};
    let player2 = {};
    let correctAnswer;
    let currentRound = 0;

    const buttonList = {
        startGameButton,
    };

    let player1Score = {},
        player2Score = {},
        scoreLabel1 = {},
        title = {},
        subtitle = {},
        question = {};

    const HUD = {
        player1,
        player2,
        correctAnswer,
        player1Score,
        player2Score,
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
        pointFactory.createMesh();

        audioManager.loadSounds();

        const assetsManager = new BABYLON.AssetsManager(scene);
        const meshTask1 = assetsManager.addMeshTask(
            "seed-0 task",
            "",
            "./models/",
            "pistachio-0.glb"
        );

        const background = ScrollingBackground(scene);

        meshTask1.onSuccess = (task) => {
            const seedMesh = task.loadedMeshes[0];
            seedMesh.name = "seed0";
            seedMesh.rotation = new BABYLON.Vector3(0, 0, 0);
            seedMesh.rotation = new BABYLON.Vector3(-Math.PI / 2.2, 0, 0);
            seedMesh.position.y = 1;
            seedMesh.position.z = -0.25;
            seedMesh.isVisible = false;
        };

        // Create the bubble (a sphere)
        //const bubble = MeshBuilder.CreateSphere("bubble", { diameter: 1 }, scene);

        assetsManager.load();

        HUD.player1.meshes = [{}, {}, {}];

        HUD.player2.meshes = [{}, {}, {}];

        bubble = BABYLON.MeshBuilder.CreateSphere("bubble", { diameter: .5 }, scene);

        // Function to handle microphone input
        async function handleMicrophoneInput() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                const audioContext = new (window.AudioContext ||
                    window.webkitAudioContext)();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                source.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                let currentScale = 1;
                let currentYPosition = 0;
                let previousScale = currentScale;

                async function updateBubbleSize() {
                    analyser.getByteFrequencyData(dataArray);

                    // Calculate average volume
                    const average =
                        dataArray.reduce((sum, value) => sum + value, 0) /
                        dataArray.length;
                    const targetScale = Math.min(50, Math.max(1, average / 10)); // Allow bigger scaling

                    // Map the average volume to a scale for the bubble size
                    currentScale += (targetScale - currentScale) * (targetScale > currentScale ? 0.009 : 0.009);

                    // Check if the bubble is growing or shrinking
                    const isGrowing = currentScale > previousScale;
                    if (isGrowing) {
                        bubble.position.z -= .01;
                        console.log(`The bubble is growing! Its position is ${bubble.position.z}`);
                    } else if (currentScale < previousScale) {
                        if(bubble.position.z <= 5 && currentScale < 9){
                            bubble.position.z += .01;
                            console.log(`The bubble is shrinking! Its position is ${bubble.position.z}`);
                        }
                    }

                    previousScale = currentScale;

                    // Update the bubble size
                    bubble.scaling.set(currentScale, currentScale, currentScale);

                    console.log(`Scale is ${currentScale}`);
                    // Move the bubble up or down based on size
                    //const targetYPosition = (currentScale - 1) * 2; // Scale height movement proportionally to bubble size
                    //currentYPosition += (targetYPosition - currentYPosition) * .1; // Smoothly transition vertical position

                    //bubble.position.z = currentYPosition; // Update bubble's vertical position

                    // Log the bubble diameter
                    const diameter = currentScale * bubble.getBoundingInfo().boundingBox.extendSize.x * 2;
                    //console.log(`Bubble diameter: ${diameter}`);

                }

                // Update bubble size on every frame
                scene.onBeforeRenderObservable.add(updateBubbleSize);
            } catch (err) {
                console.error(
                    "Microphone access denied or not supported.",
                    err
                );
            }
        }

        handleMicrophoneInput();



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
