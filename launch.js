/**
 * ROYAL INDIAN WEDDING INVITATION - LAUNCH & TRANSITION JAVASCRIPT
 * Handles 3D Palace Double Doors Opening, Sound, and Smooth Home Screen Unveiling
 */

document.addEventListener("DOMContentLoaded", () => {
  initPetalsCanvas();
  initRoyalDoorsTransition();
  initMusicSystem();
});

/* ==========================================================================
   1. FLOATING ROSE PETALS & GOLDEN PARTICLES CANVAS
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const maxPetals = window.innerWidth < 768 ? 20 : 35;

  const petalTypes = [
    { type: "rose", color: "rgba(190, 20, 55, ", size: 12 },
    { type: "marigold", color: "rgba(235, 165, 30, ", size: 10 },
    { type: "sparkle", color: "rgba(249, 228, 150, ", size: 4.5 }
  ];

  for (let i = 0; i < maxPetals; i++) {
    petals.push(createPetal(true));
  }

  function createPetal(randomY = false) {
    const template = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: template.size + Math.random() * 5,
      speedY: 0.7 + Math.random() * 1.2,
      speedX: -0.4 + Math.random() * 0.8,
      rotation: Math.random() * 360,
      rotSpeed: -1.2 + Math.random() * 2.4,
      opacity: 0.35 + Math.random() * 0.45,
      type: template.type,
      color: template.color,
      sway: Math.random() * 0.03,
      swayCounter: Math.random() * Math.PI * 2
    };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.swayCounter += p.sway;
      p.x += Math.sin(p.swayCounter) * 1.1 + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.type === "rose") {
        ctx.beginPath();
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.ellipse(0, 0, p.size * 0.7, p.size * 1.1, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "marigold") {
        ctx.beginPath();
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.shadowColor = "rgba(255, 230, 120, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.restore();

      if (p.y > height + 25 || p.x < -25 || p.x > width + 25) {
        petals[i] = createPetal(false);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. ROYAL AUDIO SYSTEM (PLAY / PAUSE & SYNCHRONIZATION)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let synthTimer = null;
let bgAudio = null;

function updateMusicButtonUI(playing) {
  const musicBtn = document.getElementById("floating-music-btn");
  const musicIcon = document.getElementById("music-play-pause-icon");

  if (musicBtn) {
    if (playing) {
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("title", "Pause Music");
      musicBtn.setAttribute("aria-label", "Pause Music");
    } else {
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("title", "Play Music");
      musicBtn.setAttribute("aria-label", "Play Music");
    }
  }

  if (musicIcon) {
    if (playing) {
      musicIcon.className = "fa-solid fa-pause";
    } else {
      musicIcon.className = "fa-solid fa-play";
    }
  }
}

function initMusicSystem() {
  const musicBtn = document.getElementById("floating-music-btn");
  bgAudio = document.getElementById("bg-audio");

  if (!bgAudio) {
    bgAudio = new Audio("assets/audio/jai_jai_ram.mp3");
    bgAudio.loop = true;
  }

  bgAudio.volume = 0.85;
  bgAudio.addEventListener("ended", () => {
    if (!bgAudio.loop) pauseMusic();
  });

  if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isMusicPlaying) {
        pauseMusic();
      } else {
        startMusic();
      }
    });
  }
}

function startMusic() {
  if (isMusicPlaying) return;

  if (bgAudio) {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isMusicPlaying = true;
          updateMusicButtonUI(true);
        })
        .catch(() => {
          playSynthesizedShehnai();
        });
      return;
    } else {
      isMusicPlaying = true;
      updateMusicButtonUI(true);
      return;
    }
  }

  playSynthesizedShehnai();
}

function pauseMusic() {
  isMusicPlaying = false;
  if (bgAudio) {
    try {
      bgAudio.pause();
    } catch (e) {}
  }
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
  if (audioCtx && audioCtx.state === "running") {
    try {
      audioCtx.suspend();
    } catch (e) {}
  }
  updateMusicButtonUI(false);
}

function playSynthesizedShehnai() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isMusicPlaying = true;
    updateMusicButtonUI(true);

    playRaagYamanLoop();
  } catch (err) {}
}

function playRaagYamanLoop() {
  if (!audioCtx || !isMusicPlaying) return;

  const scale = [293.66, 329.63, 369.99, 415.3, 440.0, 493.88, 554.37, 587.33];
  const pattern = [
    { note: 0, dur: 1.4, amp: 0.08 },
    { note: 2, dur: 0.9, amp: 0.09 },
    { note: 1, dur: 1.2, amp: 0.08 },
    { note: 3, dur: 1.8, amp: 0.11 },
    { note: 4, dur: 1.5, amp: 0.1 },
    { note: 6, dur: 1.2, amp: 0.09 },
    { note: 7, dur: 2.2, amp: 0.12 }
  ];

  let curTime = audioCtx.currentTime + 0.05;

  pattern.forEach((step) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const freq = scale[step.note];

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, curTime);

    gain.gain.setValueAtTime(0.001, curTime);
    gain.gain.exponentialRampToValueAtTime(step.amp, curTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, curTime + step.dur);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(curTime);
    osc.stop(curTime + step.dur);

    curTime += step.dur;
  });

  const totalDurationMs = (curTime - audioCtx.currentTime) * 1000;
  synthTimer = setTimeout(() => {
    if (isMusicPlaying) {
      playRaagYamanLoop();
    }
  }, totalDurationMs);
}

function playRoyalChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const chimeCtx = new AudioContext();
    if (chimeCtx.state === "suspended") chimeCtx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = chimeCtx.createOscillator();
      const gain = chimeCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, chimeCtx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.2, chimeCtx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, chimeCtx.currentTime + idx * 0.12 + 0.9);
      osc.connect(gain);
      gain.connect(chimeCtx.destination);
      osc.start(chimeCtx.currentTime + idx * 0.12);
      osc.stop(chimeCtx.currentTime + idx * 0.12 + 0.9);
    });
  } catch (e) {}
}

/* ==========================================================================
   3. ROYAL PALACE DOORS OPENING & SMOOTH HOME SCREEN SWITCHING
   ========================================================================== */
function initRoyalDoorsTransition() {
  const doorsScreen = document.getElementById("royal-doors-screen");
  const doorsContainer = document.getElementById("doors-container");
  const mainApp = document.getElementById("main-scroll-app");

  if (!doorsScreen) return;

  let isOpening = false;

  function handleOpenDoors(e) {
    if (e) e.preventDefault();
    if (isOpening) return;
    isOpening = true;

    // 1. Trigger Temple Chime sound
    playRoyalChime();

    // 2. Start Royal Background Wedding Music
    startMusic();

    // 3. Trigger 3D Door Swing & Opening Animation
    doorsScreen.classList.add("opening");

    // 4. Trigger Smooth Home Screen Unveil Bloom Effect
    if (mainApp) {
      mainApp.classList.add("unveiling");
    }

    // 5. Store session flag
    try {
      sessionStorage.setItem("wedding_music_autoplay", "true");
    } catch (err) {}

    // 6. After the smooth 3D swing and bloom completes, hide door overlay completely
    setTimeout(() => {
      doorsScreen.classList.add("opened");
      doorsScreen.style.display = "none";
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState({ screen: "home" }, "", "home.html");
        }
      } catch (err) {}
    }, 1300);
  }

  if (doorsContainer) {
    doorsContainer.addEventListener("click", handleOpenDoors);
    doorsContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleOpenDoors(e);
      }
    });
  }

  doorsScreen.addEventListener("click", (e) => {
    // Prevent triggering if clicked on music button
    if (e.target.closest("#floating-music-btn")) return;
    handleOpenDoors(e);
  });
}
