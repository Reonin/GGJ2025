export default async function handleMicrophoneInput(scene, bubble, audioManager) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048; // Increased for more precise frequency analysis
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const MIN_SCALE = 0.5;
        const MAX_SCALE = 5; // Adjust as needed
        let currentScale = 1;
        let previousScale = currentScale;
        let isAudioPlaying = true;
        let timeReset = setInterval(() => {
            isAudioPlaying = true;
          }, 1000);

        function getPitch(dataArray) {
            // Find the index with the highest amplitude
            let highestIndex = 0;
            let highestAmplitude = 0;
            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i] > highestAmplitude) {
                    highestAmplitude = dataArray[i];
                    highestIndex = i;
                }
            }

            // Convert index to approximate frequency
            return (highestIndex * audioContext.sampleRate) / (2 * analyser.frequencyBinCount);
        }

        function updateBubbleSize() {
            analyser.getByteFrequencyData(dataArray);

            // Get the pitch
            const pitch = getPitch(dataArray);


            let targetScale = currentScale;
            if (pitch > 1000) { // High pitch
                targetScale = Math.min(MAX_SCALE, currentScale * 1.05);
            } else if (pitch < 300) { // Low pitch
                targetScale = Math.max(MIN_SCALE, currentScale * 0.95);
            }
            // Smoothly update scale
            currentScale += (targetScale - currentScale) * 0.1;

            // Update bubble size
            bubble.scaling.set(currentScale, currentScale, currentScale);

            // Adjust z-position based on size
            if (currentScale > previousScale) {
                if(bubble.position.z >= -3){
                    bubble.position.z -= 0.02; // Move forward when growing
                    if(isAudioPlaying){
                        audioManager.bubbleUpFX.play();
                        isAudioPlaying = false;
                    }
                }
            } else if (currentScale < previousScale) {
                if(bubble.position.z <= 3 && currentScale < 7){
                    bubble.position.z += 0.02; // Move backward when shrinking
                    if(isAudioPlaying) {
                        audioManager.bubbleDownFX.play();
                        isAudioPlaying = false;
                    }
                }
            }

            previousScale = currentScale;

            //console.log(`Pitch: ${pitch.toFixed(2)}, Scale: ${currentScale.toFixed(2)}`);
        }

        // Update bubble size on every frame
        scene.onBeforeRenderObservable.add(updateBubbleSize);
    } catch (err) {
        console.error("Microphone access denied or not supported.", err);
    }
}
