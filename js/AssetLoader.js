export default function loadAssets(BABYLON, scene) {
    let hostPath;

    if(location.hostname === "localhost"){
        hostPath = '.';
    }
    else {
        hostPath = '/GGJ2025/';
    }

    const purple_mat = new BABYLON.StandardMaterial("purple_mat", scene);
    purple_mat.diffuseColor = new BABYLON.Color3(1, 0, 1);

    const blue_mat = new BABYLON.StandardMaterial("blue_mat", scene);
    blue_mat.diffuseColor = new BABYLON.Color3(0, 0, 1);

    const red_mat = new BABYLON.StandardMaterial("red_mat", scene);
    red_mat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    const brown_mat = new BABYLON.StandardMaterial("brown_mat", scene);
    brown_mat.diffuseColor = new BABYLON.Color3(0.306, 0.157, 0.016);

    const soil_texture = new BABYLON.StandardMaterial("soil", scene);
    soil_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/soil.png", scene);

    const germ_texture = new BABYLON.StandardMaterial("germ", scene);
    germ_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/plasticbag.png", scene, {invertY: true});
    germ_texture.diffuseTexture.hasAlpha = true;

    const bubble_texture = new BABYLON.StandardMaterial("bubble", scene);
    bubble_texture.alpha = 0.85;
    bubble_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/bubble.png", scene);


    const urchin_texture = new BABYLON.StandardMaterial("urchin", scene);
    urchin_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/urchin.png", scene);
    urchin_texture.diffuseTexture.vScale = 1;
    urchin_texture.diffuseTexture.uScale = 2;
    urchin_texture.diffuseTexture.hasAlpha = true;
    urchin_texture.useAlphaFromDiffuseTexture = true

    const shark_texture = new BABYLON.StandardMaterial("shark", scene);
    shark_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/shark.png", scene);
    //shark_texture.diffuseTexture.vScale = 1;
    //shark_texture.diffuseTexture.uScale = -1;
    shark_texture.diffuseTexture.hasAlpha = true;
    shark_texture.useAlphaFromDiffuseTexture = true;

    const oil_spill_texture = new BABYLON.StandardMaterial("oil", scene);
    oil_spill_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/oil.png", scene);
    oil_spill_texture.diffuseTexture.hasAlpha = true;
    oil_spill_texture.useAlphaFromDiffuseTexture = true;

    const textureObj = { purple_mat, blue_mat, red_mat, brown_mat, soil_texture, germ_texture, bubble_texture, urchin_texture, shark_texture, oil_spill_texture};
    return textureObj;
}
