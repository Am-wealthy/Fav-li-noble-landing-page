// Web Audio API Synthesizer for Fav Li$ Noble Tech
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let droneOsc: OscillatorNode | null = null;
let droneGain: GainNode | null = null;
let analyser: AnalyserNode | null = null;

export function initAudio() {
  if (audioCtx) return audioCtx;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 64;
  
  masterGain.connect(analyser);
  analyser.connect(audioCtx.destination);

  return audioCtx;
}

export function playHoverSound() {
  if (!audioCtx || audioCtx.state !== 'running') return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(masterGain!);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.error(e);
  }
}

export function playClickSound() {
  if (!audioCtx || audioCtx.state !== 'running') return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(masterGain!);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch (e) {
    console.error(e);
  }
}

export function playShockwaveSound() {
  if (!audioCtx || audioCtx.state !== 'running') return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(masterGain!);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {
    console.error(e);
  }
}

export function playChargePulse(progress: number) {
  const ctx = initAudio();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    const baseFreq = 120 + (progress / 100) * 600; // Pitch rises from 120Hz to 720Hz
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    
    const gainVal = 0.02 + (progress / 100) * 0.12;
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(masterGain!);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.error(e);
  }
}

export function toggleAmbientDrone(enable: boolean) {
  const ctx = initAudio();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  if (enable) {
    if (droneOsc) return;
    droneOsc = ctx.createOscillator();
    droneGain = ctx.createGain();
    
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low A drone
    
    droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
    
    droneOsc.connect(droneGain);
    droneGain.connect(masterGain!);
    
    droneOsc.start();
  } else {
    if (droneGain && droneOsc) {
      droneGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      setTimeout(() => {
        droneOsc?.stop();
        droneOsc?.disconnect();
        droneOsc = null;
        droneGain = null;
      }, 500);
    }
  }
}

export function getAudioData(): Uint8Array {
  if (!analyser) return new Uint8Array(0);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
}
