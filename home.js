/**
 * ROYAL INDIAN WEDDING INVITATION - HOME SCREEN JAVASCRIPT
 * Handles Floating Rose Petals Canvas & Robust Audio Play/Pause System
 */

document.addEventListener("DOMContentLoaded", () => {
  initPetalsCanvas();
  initHomeAudioSystem();
  initHomeCountdownTimer();
  initHomeScrollStory();
  initHomeLanguageSystem();
  initHomeMediaModal();
});

/* ==========================================================================
   SCROLL-DRIVEN STORYTELLING UNVEIL ENGINE
   0.00 - 0.15: Sharp Pristine Background
   0.15 - 0.40: Background blurs + Ganpati fades in
   0.40 - 0.65: Groom name & details reveal
   0.65 - 0.85: Bride name & details reveal
   0.85 - 1.00: Sacred Knot home_center.png blooms in center
   ========================================================================== */
function initHomeScrollStory() {
  const bgBackdrop = document.querySelector(".home-bg-backdrop");
  const bgVignette = document.querySelector(".home-bg-glow-vignette");
  const ganpatiSection = document.querySelector(".sacred-home-left");
  const sacredRight = document.querySelector(".sacred-home-right");
  const groomSection = document.querySelector(".groom-details-top");
  const brideSection = document.querySelector(".bride-details-bottom");
  const knotWrapper = document.querySelector(".home-center-wrapper");
  const scrollHint = document.getElementById("scroll-unveil-hint");
  const countdownBanner = document.getElementById("home-countdown-banner");

  if (!bgBackdrop || !groomSection || !brideSection || !knotWrapper) return;

  let targetProgress = 0;
  let currentProgress = 0;
  const maxScroll = 1400; // ample virtual scroll units for multi-phase unveil
  let accumulatedScroll = 0;

  // Wheel listener
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    accumulatedScroll += e.deltaY * 0.9;
    accumulatedScroll = Math.max(0, Math.min(maxScroll, accumulatedScroll));
    targetProgress = accumulatedScroll / maxScroll;
  }, { passive: false });

  // Touch listener for mobile & tablets
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchCurrentY) * 1.6;
      touchStartY = touchCurrentY;
      accumulatedScroll += deltaY;
      accumulatedScroll = Math.max(0, Math.min(maxScroll, accumulatedScroll));
      targetProgress = accumulatedScroll / maxScroll;
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " "].includes(e.key)) {
      accumulatedScroll = Math.min(maxScroll, accumulatedScroll + 250);
      targetProgress = accumulatedScroll / maxScroll;
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      accumulatedScroll = Math.max(0, accumulatedScroll - 250);
      targetProgress = accumulatedScroll / maxScroll;
    }
  });

  // Clicking on hint instantly reveals the celebration smoothly
  if (scrollHint) {
    scrollHint.addEventListener("click", () => {
      accumulatedScroll = maxScroll;
      targetProgress = 1;
    });
  }

  function mapRange(val, inMin, inMax, outMin, outMax) {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  }

  function renderFrame() {
    currentProgress += (targetProgress - currentProgress) * 0.12;
    const isMobile = window.innerWidth <= 768;

    // 1. Background Blur & Vignette (0.04 to 0.30)
    const blurPx = mapRange(currentProgress, 0.04, 0.30, 0, 4.5);
    const brightness = mapRange(currentProgress, 0.04, 0.30, 0.94, 0.64);
    const vignetteOpacity = mapRange(currentProgress, 0.04, 0.30, 0.15, 1);

    bgBackdrop.style.filter = `blur(${blurPx.toFixed(2)}px) brightness(${brightness.toFixed(3)}) saturate(1.25) contrast(1.08)`;
    if (bgVignette) {
      bgVignette.style.opacity = vignetteOpacity.toFixed(3);
    }

    // 2. Scroll Hint (fades out from 0.0 to 0.12)
    if (scrollHint) {
      const hintOpacity = mapRange(currentProgress, 0.0, 0.12, 1, 0);
      scrollHint.style.opacity = hintOpacity.toFixed(3);
      scrollHint.style.pointerEvents = hintOpacity < 0.05 ? "none" : "auto";
    }

    if (!isMobile) {
      /* ================================================================
         DESKTOP / WEB VIEW PROGRESSION:
         0.10 - 0.35: Ganpati fades in
         0.30 - 0.50: Groom details reveal
         0.48 - 0.68: Bride details reveal
         0.65 - 0.84: Sacred Knot blooms in center
         0.86 - 1.00: THEN countdown timer reveals at bottom center
         ================================================================ */
      // 3. Ganpati Image Reveal (0.10 to 0.35)
      if (ganpatiSection) {
        const ganpatiOpacity = mapRange(currentProgress, 0.10, 0.35, 0, 1);
        const ganpatiScale = mapRange(currentProgress, 0.10, 0.35, 0.92, 1.0);
        const ganpatiTranslateX = mapRange(currentProgress, 0.10, 0.35, -35, 0);
        ganpatiSection.style.opacity = ganpatiOpacity.toFixed(3);
        ganpatiSection.style.filter = "none";
        ganpatiSection.style.transform = `translateX(${ganpatiTranslateX.toFixed(1)}px) scale(${ganpatiScale.toFixed(3)})`;
      }

      // 4. Groom Details Reveal (0.30 to 0.50)
      const groomOpacity = mapRange(currentProgress, 0.30, 0.50, 0, 1);
      const groomTranslateY = mapRange(currentProgress, 0.30, 0.50, -25, 0);
      groomSection.style.opacity = groomOpacity.toFixed(3);
      groomSection.style.filter = "none";
      groomSection.style.transform = `translateY(${groomTranslateY.toFixed(1)}px)`;

      // 5. Bride Details Reveal (0.48 to 0.68)
      const brideOpacity = mapRange(currentProgress, 0.48, 0.68, 0, 1);
      const brideTranslateY = mapRange(currentProgress, 0.48, 0.68, 25, 0);
      brideSection.style.opacity = brideOpacity.toFixed(3);
      brideSection.style.filter = "none";
      brideSection.style.transform = `translateY(${brideTranslateY.toFixed(1)}px)`;

      // 6. Sacred Knot home_center.png Bloom (0.65 to 0.84)
      const knotOpacity = mapRange(currentProgress, 0.65, 0.84, 0, 1);
      const knotScale = mapRange(currentProgress, 0.65, 0.84, 0.85, 1.0);
      knotWrapper.style.opacity = knotOpacity.toFixed(3);
      knotWrapper.style.filter = "none";
      knotWrapper.style.transform = `scale(${knotScale.toFixed(3)})`;

      if (sacredRight) {
        sacredRight.style.opacity = "1";
        sacredRight.style.filter = "none";
      }

      // 7. Countdown Timer (Comes at LAST after home_center arrives, 0.86 to 1.00)
      if (countdownBanner) {
        const cdOpacity = mapRange(currentProgress, 0.86, 1.00, 0, 1);
        const cdTranslateY = mapRange(currentProgress, 0.86, 1.00, 18, 0);
        countdownBanner.style.opacity = cdOpacity.toFixed(3);
        countdownBanner.style.transform = `translateX(-50%) translateY(${cdTranslateY.toFixed(1)}px)`;
        countdownBanner.style.pointerEvents = cdOpacity < 0.1 ? "none" : "auto";
      }
    } else {
      /* ================================================================
         MOBILE DEVICE PROGRESSION:
         Phase 1 (0.08 - 0.56):
           - Ganpati initial appear
           - Groom & Bride appear
           - home_center.png appears
         Phase 2 (0.58 - 1.00):
           - home_center + Groom + Bride names blur & disappear into background
           - Ganpati image gets BIGGER, centers and gains divine aura
           - Countdown timer reveals at bottom center!
         ================================================================ */
      // 1. Groom details appear (0.14 - 0.30), then blur & disappear (0.58 - 0.78)
      let groomOpacity = mapRange(currentProgress, 0.14, 0.30, 0, 1);
      if (currentProgress > 0.58) {
        groomOpacity = mapRange(currentProgress, 0.58, 0.78, 1, 0);
      }
      const groomBlur = mapRange(currentProgress, 0.58, 0.78, 0, 10);
      const groomTranslateY = currentProgress <= 0.58 
        ? mapRange(currentProgress, 0.14, 0.30, -15, 0)
        : mapRange(currentProgress, 0.58, 0.78, 0, 20);
      groomSection.style.opacity = groomOpacity.toFixed(3);
      groomSection.style.filter = `blur(${groomBlur.toFixed(1)}px)`;
      groomSection.style.transform = `translateY(${groomTranslateY.toFixed(1)}px)`;

      // 2. Bride details appear (0.26 - 0.42), then blur & disappear (0.58 - 0.78)
      let brideOpacity = mapRange(currentProgress, 0.26, 0.42, 0, 1);
      if (currentProgress > 0.58) {
        brideOpacity = mapRange(currentProgress, 0.58, 0.78, 1, 0);
      }
      const brideBlur = mapRange(currentProgress, 0.58, 0.78, 0, 10);
      const brideTranslateY = currentProgress <= 0.58
        ? mapRange(currentProgress, 0.26, 0.42, 15, 0)
        : mapRange(currentProgress, 0.58, 0.78, 0, 25);
      brideSection.style.opacity = brideOpacity.toFixed(3);
      brideSection.style.filter = `blur(${brideBlur.toFixed(1)}px)`;
      brideSection.style.transform = `translateY(${brideTranslateY.toFixed(1)}px)`;

      // 3. Sacred knot home_center appears (0.38 - 0.56), then blurs & disappears (0.58 - 0.80)
      let knotOpacity = mapRange(currentProgress, 0.38, 0.56, 0, 1);
      let knotScale = mapRange(currentProgress, 0.38, 0.56, 0.88, 1.0);
      if (currentProgress > 0.58) {
        knotOpacity = mapRange(currentProgress, 0.58, 0.80, 1, 0);
        knotScale = mapRange(currentProgress, 0.58, 0.80, 1.0, 0.88);
      }
      const knotBlur = mapRange(currentProgress, 0.58, 0.80, 0, 12);
      knotWrapper.style.opacity = knotOpacity.toFixed(3);
      knotWrapper.style.filter = `blur(${knotBlur.toFixed(1)}px)`;
      knotWrapper.style.transform = `scale(${knotScale.toFixed(3)})`;

      // 4. Ganpati: Initial fade-in (0.08 - 0.24), then gets BIGGER & centers (0.58 - 1.00)
      if (ganpatiSection) {
        let ganpatiOpacity = mapRange(currentProgress, 0.08, 0.24, 0, 1);
        let ganpatiScale = mapRange(currentProgress, 0.08, 0.24, 0.92, 1.0);
        let ganpatiTranslateY = mapRange(currentProgress, 0.08, 0.24, -15, 0);

        if (currentProgress > 0.58) {
          // Ganpati grows bigger and shifts toward center of screen
          const growScale = mapRange(currentProgress, 0.58, 1.00, 1.0, 1.85);
          const centerShiftY = mapRange(currentProgress, 0.58, 1.00, 0, window.innerHeight * 0.17);
          ganpatiScale = growScale;
          ganpatiTranslateY = centerShiftY;
        }

        ganpatiSection.style.opacity = ganpatiOpacity.toFixed(3);
        ganpatiSection.style.transform = `translateY(${ganpatiTranslateY.toFixed(1)}px) scale(${ganpatiScale.toFixed(3)})`;
        ganpatiSection.style.filter = currentProgress > 0.65 
          ? `drop-shadow(0 15px 35px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(249, 228, 150, ${mapRange(currentProgress, 0.65, 1.00, 0.35, 0.8).toFixed(2)}))`
          : "none";
      }

      // 5. Countdown Timer on Mobile (Reveals at bottom center after knot blur & Ganpati grows, 0.78 - 1.00)
      if (countdownBanner) {
        const cdOpacity = mapRange(currentProgress, 0.78, 1.00, 0, 1);
        const cdTranslateY = mapRange(currentProgress, 0.78, 1.00, 16, 0);
        countdownBanner.style.opacity = cdOpacity.toFixed(3);
        countdownBanner.style.transform = `translateX(-50%) translateY(${cdTranslateY.toFixed(1)}px)`;
        countdownBanner.style.pointerEvents = cdOpacity < 0.1 ? "none" : "auto";
      }
    }

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
}

/* ==========================================================================
   COUNTDOWN TIMER FOR WEB VIEW PRESENTATION CARD
   ========================================================================== */
function initHomeCountdownTimer() {
  const daysEl = document.getElementById("home-cd-days");
  const hoursEl = document.getElementById("home-cd-hours");
  const minsEl = document.getElementById("home-cd-mins");
  const secsEl = document.getElementById("home-cd-secs");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDateStr = (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.weddingDate?.targetIso) 
    ? WEDDING_CONFIG.weddingDate.targetIso 
    : "2026-11-25T19:00:00+05:30";
  const targetTime = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

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
   2. ROYAL AUDIO SYSTEM (PLAY/PAUSE TOGGLE & STATUS SYNC)
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

function initHomeAudioSystem() {
  const musicBtn = document.getElementById("floating-music-btn");
  bgAudio = document.getElementById("bg-audio");

  if (!bgAudio) {
    bgAudio = new Audio("assets/audio/jai_jai_ram.mp3");
    bgAudio.loop = true;
  }

  bgAudio.volume = 0.8;
  bgAudio.addEventListener("ended", () => {
    if (!bgAudio.loop) {
      pauseMusic();
    }
  });

  updateMusicButtonUI(false);

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

  // Check autoplay flag from URL or SessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const shouldAutoPlay = urlParams.get("play") === "1" || sessionStorage.getItem("wedding_music_autoplay") === "true";

  if (shouldAutoPlay) {
    startMusic();
  }

  // Also enable playback on first user tap anywhere if browser blocked initial autoplay
  const handleFirstInteraction = () => {
    if (!isMusicPlaying && shouldAutoPlay) {
      startMusic();
    }
    document.removeEventListener("click", handleFirstInteraction);
    document.removeEventListener("touchstart", handleFirstInteraction);
  };

  document.addEventListener("click", handleFirstInteraction, { once: true });
  document.addEventListener("touchstart", handleFirstInteraction, { once: true });
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
        .catch((err) => {
          console.warn("Audio element play error, trying synthesized Shehnai:", err);
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
  } catch (err) {
    console.warn("Shehnai synthesizer error:", err);
  }
}

function playRaagYamanLoop() {
  if (!audioCtx || !isMusicPlaying) return;

  const scale = [293.66, 329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 587.33];
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

/* ==========================================================================
   LANGUAGE TOGGLE SYSTEM (HINDI / ENGLISH)
   Reads all data dynamically from WEDDING_CONFIG.translations
   ========================================================================== */
function initHomeLanguageSystem() {
  const langBtn = document.getElementById("floating-lang-btn");
  const langBtnText = document.getElementById("lang-btn-text");

  if (!langBtn || !langBtnText) return;

  function getTranslationData(lang) {
    if (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.translations && WEDDING_CONFIG.translations[lang]) {
      return WEDDING_CONFIG.translations[lang];
    }
    // Fallback if config is missing
    return {
      btnLabel: lang === "en" ? "अ" : "EN",
      btnTitle: lang === "en" ? "हिंदी में देखें / View in Hindi" : "View in English / अंग्रेजी में देखें",
      scrollHint: lang === "en" ? "Scroll to Unveil" : "दर्शन हेतु स्क्रॉल करें",
      groom: {
        name: lang === "en" ? "Krishna Kumar" : "कृष्ण कुमार",
        kinship: lang === "en" ? "Son of" : "सुपुत्र",
        parents: lang === "en" ? "Smt. Sunita & Shri Rajendra Singhania" : "श्रीमती सुनीता एवं श्री राजेन्द्र सिंघानिया"
      },
      bride: {
        name: lang === "en" ? "Kumari Muskan" : "कुमारी मुस्कान",
        kinship: lang === "en" ? "Daughter of" : "सुपुत्री",
        parents: lang === "en" ? "Smt. Annu Prasad & Shri Uday Shankar Prasad" : "श्रीमती अन्नू प्रसाद एवं श्री उदय शंकर प्रसाद"
      },
      countdown: {
        days: lang === "en" ? "Days" : "दिन",
        hours: lang === "en" ? "Hours" : "घंटे",
        mins: lang === "en" ? "Mins" : "मिनट",
        secs: lang === "en" ? "Secs" : "सेकंड"
      }
    };
  }

  let currentLang = localStorage.getItem("wedding_site_lang") || "en";

  function applyLanguage(lang) {
    const t = getTranslationData(lang);
    currentLang = lang;
    localStorage.setItem("wedding_site_lang", lang);

    // Update Button Icon & Label
    langBtnText.textContent = t.btnLabel || (lang === "en" ? "अ" : "EN");
    langBtn.setAttribute("title", t.btnTitle || "");
    langBtn.setAttribute("aria-label", t.btnTitle || "");

    // Toggle body class for Devanagari typography
    if (lang === "hi") {
      document.body.classList.add("lang-hindi");
    } else {
      document.body.classList.remove("lang-hindi");
    }

    // Update Text Elements Dynamically
    const groomNameEl = document.getElementById("groom-name-text");
    const groomKinshipEl = document.getElementById("groom-kinship-text");
    const groomParentsEl = document.getElementById("groom-parents-text");
    const brideNameEl = document.getElementById("bride-name-text");
    const brideKinshipEl = document.getElementById("bride-kinship-text");
    const brideParentsEl = document.getElementById("bride-parents-text");
    const scrollHintEl = document.getElementById("scroll-hint-text");
    const cdDaysEl = document.getElementById("cd-label-days");
    const cdHoursEl = document.getElementById("cd-label-hours");
    const cdMinsEl = document.getElementById("cd-label-mins");
    const cdSecsEl = document.getElementById("cd-label-secs");

    if (groomNameEl && t.groom) groomNameEl.textContent = t.groom.name;
    if (groomKinshipEl && t.groom) groomKinshipEl.textContent = t.groom.kinship;
    if (groomParentsEl && t.groom) groomParentsEl.textContent = t.groom.parents;
    if (brideNameEl && t.bride) brideNameEl.textContent = t.bride.name;
    if (brideKinshipEl && t.bride) brideKinshipEl.textContent = t.bride.kinship;
    if (brideParentsEl && t.bride) brideParentsEl.textContent = t.bride.parents;
    if (scrollHintEl) scrollHintEl.textContent = t.scrollHint;
    if (cdDaysEl && t.countdown) cdDaysEl.textContent = t.countdown.days;
    if (cdHoursEl && t.countdown) cdHoursEl.textContent = t.countdown.hours;
    if (cdMinsEl && t.countdown) cdMinsEl.textContent = t.countdown.mins;
    if (cdSecsEl && t.countdown) cdSecsEl.textContent = t.countdown.secs;

    // Update Media Button Tooltip & Modal Title
    const mediaBtnEl = document.getElementById("floating-media-btn");
    const mediaHeadingEl = document.getElementById("media-modal-heading");
    if (mediaBtnEl) {
      mediaBtnEl.setAttribute("title", lang === "hi" ? "फोटो गैलरी एवं यादें" : "Photo Gallery & Moments");
      mediaBtnEl.setAttribute("aria-label", lang === "hi" ? "फोटो गैलरी एवं यादें" : "Photo Gallery & Moments");
    }
    if (mediaHeadingEl) {
      mediaHeadingEl.textContent = lang === "hi" ? "शाही यादें एवं फोटो गैलरी" : "Royal Moments & Gallery";
    }
  }

  langBtn.addEventListener("click", () => {
    const nextLang = currentLang === "en" ? "hi" : "en";
    applyLanguage(nextLang);
  });

  // Initialize with current preference
  applyLanguage(currentLang);
}

/* ==========================================================================
   ROYAL MEDIA / MOMENTS GALLERY SYSTEM
   ========================================================================== */
function initHomeMediaModal() {
  const mediaBtn = document.getElementById("floating-media-btn");
  const modal = document.getElementById("royal-media-modal");
  const backdrop = document.getElementById("media-modal-backdrop");
  const closeBtn = document.getElementById("media-modal-close-btn");
  const container = document.getElementById("media-gallery-container");

  if (!modal || !mediaBtn) return;

  const defaultGallery = [
    { src: "assets/images/couple_hero.jpg", caption: "Royal Pre-Wedding Portrait", category: "Pre-Wedding" },
    { src: "assets/images/gallery_prewedding.jpg", caption: "Palace Walk & Sunset Moments", category: "Moments" },
    { src: "assets/images/groom_portrait.jpg", caption: "Groom Royal Portrait", category: "Groom" },
    { src: "assets/images/bride_portrait.jpg", caption: "Bride Royal Portrait", category: "Bridal" },
    { src: "assets/images/gallery_mehendi.jpg", caption: "Joyous Festive Mehendi Celebrations", category: "Festivities" },
    { src: "assets/images/gallery_mandap.jpg", caption: "Lakeside Floral Mandap", category: "Decor" }
  ];

  const galleryItems = (typeof WEDDING_CONFIG !== "undefined" && Array.isArray(WEDDING_CONFIG.gallery) && WEDDING_CONFIG.gallery.length > 0)
    ? WEDDING_CONFIG.gallery
    : defaultGallery;

  // Populate gallery
  if (container) {
    container.innerHTML = galleryItems.map((item, idx) => `
      <div class="media-gallery-item" data-idx="${idx}">
        <img src="${item.src}" alt="${item.caption || 'Wedding Photo'}" loading="lazy" />
        <div class="media-gallery-item-overlay">
          ${item.category ? `<span class="media-gallery-item-tag">${item.category}</span>` : ''}
          <span class="media-gallery-item-caption">${item.caption || ''}</span>
        </div>
      </div>
    `).join("");
  }

  function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  mediaBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
