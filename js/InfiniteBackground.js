class InfiniteBackground {
    instances = [];
    threshold;
    spawnPlace;

    constructor(mesh, scene) {
        this.speed = 0;
        this.instances[0] = mesh.clone("instance-1");
        this.instances[1] = mesh.clone("instance-2");
        this.spawnPlace =
            mesh.position.x +
            mesh.getBoundingInfo().boundingBox.extendSize.x * 2;

        this.threshold =
            mesh.position.x + mesh.getBoundingInfo().boundingBox.extendSize.x;
        this.instances[1].position.x = this.spawnPlace;

        mesh.setEnabled(false);

        scene.onBeforeRenderObservable.add(() => {
            const animationRatio = scene.getAnimationRatio();

            for (let i = 0; i < this.instances.length; i++) {
                this.instances[i].position.x += this.speed * animationRatio;

                const leftEdge =
                    this.instances[i].position.x -
                    mesh.getBoundingInfo().boundingBox.extendSize.x;

                // Check if the instance has moved beyond the threshold
                if (leftEdge >= this.threshold) {
                    // Move the instance to the far left to loop
                    this.instances[i].position.x -=
                        mesh.getBoundingInfo().boundingBox.extendSize.x * 4;
                }
            }
        });
    }

    setScrollSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}

export const ScrollingBackground = (scene) => {
    const background = BABYLON.MeshBuilder.CreatePlane(
        "plane",
        { width: 40, height: 10 },
        scene
    ); // Increase size if needed
    const backgroundMaterial = new BABYLON.StandardMaterial(
        "backgroundMaterial",
        scene
    );

    // Position the background closer to the camera, in front of it
    background.position.z = 0; // Move it closer to the camera (can be adjusted)
    background.position.y = -5; // Align the background at the camera height

    // Make sure the background faces the camera
    background.rotation.x = Math.PI / 2;
    background.rotation.y = Math.PI;

    backgroundMaterial.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/74u1cfx.png",
        scene
    );
    background.material = backgroundMaterial;

    const infiniteBackground = new InfiniteBackground(background, scene);
    background.infiniteBackground = infiniteBackground;

    return background;
};

export const updateScrollSpeed = (background, newSpeed) => {
    background.infiniteBackground.setScrollSpeed(newSpeed);
};
