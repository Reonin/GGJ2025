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

    const face_texture = new BABYLON.StandardMaterial("face", scene);
    face_texture.alpha = 1;
    face_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/smileface.webp", scene);
    face_texture.diffuseTexture.hasAlpha = true;

    const face_blow_texture = new BABYLON.StandardMaterial("face", scene);
    face_blow_texture.alpha = 1;
    face_blow_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/blowupface.webp", scene);
    face_blow_texture.diffuseTexture.hasAlpha = true;

    const happy_blow_texture = new BABYLON.StandardMaterial("face", scene);
    happy_blow_texture.alpha = 1;
    happy_blow_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/happyface.webp", scene);
    happy_blow_texture.diffuseTexture.hasAlpha = true;

    const surpriseface_texture = new BABYLON.StandardMaterial("face", scene);
    surpriseface_texture.alpha = 1;
    surpriseface_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/surpriseface.webp", scene);
    surpriseface_texture.diffuseTexture.hasAlpha = true;
    

    const urchin_texture = new BABYLON.StandardMaterial("urchin", scene);
    urchin_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/urchin.png", scene);
    urchin_texture.diffuseTexture.vScale = 1;
    urchin_texture.diffuseTexture.uScale = 2;
    urchin_texture.diffuseTexture.hasAlpha = true;
    urchin_texture.useAlphaFromDiffuseTexture = true

    const shark_texture = new BABYLON.StandardMaterial("shark", scene);
    shark_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/shark.png", scene);
    //shark_texture.diffuseTexture.vScale = 1;
    //shark_texture.uOffset = 2;
    //shark_texture.vOffset = -0.3;
    //shark_texture.diffuseTexture.uScale = -1;
    shark_texture.diffuseTexture.hasAlpha = true;
    shark_texture.useAlphaFromDiffuseTexture = true;

    const oil_spill_texture = new BABYLON.StandardMaterial("oil", scene);
    oil_spill_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/oil.png", scene);
    oil_spill_texture.diffuseTexture.hasAlpha = true;
    oil_spill_texture.useAlphaFromDiffuseTexture = true;

    const hook_texture = new BABYLON.StandardMaterial("hook", scene);
    hook_texture.diffuseTexture = new BABYLON.Texture(hostPath + "/textures/hook.png", scene);
    hook_texture.vOffset = 5;
    //hook_texture.diffuseTexture.vScale = .8;
    //hook_texture.diffuseTexture.uScale = .8;
    hook_texture.diffuseTexture.hasAlpha = true;
    hook_texture.useAlphaFromDiffuseTexture = true;

    const textureObj = { purple_mat, blue_mat, red_mat, brown_mat, soil_texture, germ_texture, bubble_texture, urchin_texture, shark_texture, hook_texture, oil_spill_texture, face_texture, face_blow_texture, happy_blow_texture, surpriseface_texture};
    return textureObj;
}
