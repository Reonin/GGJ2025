export default async function handleMicrophoneInput(scene, bubble) {
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
                        bubble.position.z -= .02;
                        console.log(`The bubble is growing! Its position is ${bubble.position.z}`);
                    } else if (currentScale < previousScale) {
                        if(bubble.position.z <= 3 && currentScale < 7){
                            bubble.position.z += .02;
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
