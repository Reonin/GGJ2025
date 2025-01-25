export class AudioManager {
  constructor(Babylon, scene) {
    this.BABYLON = Babylon;
    this.scene = scene;
    this.pingFX;
    this.softFX;
    this.warmPiano;
    this.error;
  }

  loadSounds() {
    this.pingFX = new this.BABYLON.Sound("Ping", "./audio/ping.mp3", this.scene, null, {
      loop: false,
      autoplay: false,
    });

    this.softFX = new this.BABYLON.Sound("snd", "./audio/snd_fragment.mp3", this.scene, null, {
      loop: false,
      autoplay: false,
      volume: 0.15,
    });

    this.warmPiano = new this.BABYLON.Sound("WarmPiano", "./audio/deep-underwater.mp3", this.scene, null, {
      loop: true,
      autoplay: true,
      volume: 0.2,
    });

    this.bubbleUpFX = new this.BABYLON.Sound("bubp", "./audio/bubbleup.wav", this.scene, null, {
      loop: false,
      autoplay: false,
      volume: 1,
    });
    this.bubbleDownFX = new this.BABYLON.Sound("bubd", "./audio/bubbledown.wav", this.scene, null, {
      loop: false,
      autoplay: false,
      volume: 1,
    });

    this.popFX = new this.BABYLON.Sound("pop", "./audio/pop.mp3", this.scene, null, {
      loop: false,
      autoplay: false,
      volume: 0.15,
    });

    this.error = new this.BABYLON.Sound("error", "./audio/error.mp3", this.scene, null, {
      loop: false,
      autoplay: false,
      volume: 1.0,
    });
  }

}