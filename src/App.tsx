import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Volume2, VolumeX } from "lucide-react";

/**
 * Premium Engagement Invitation Theme
 * Names: Kaveesha & Sithum
 * Theme: Indian
 * Background: White
 * Accents: Gold
 */

const mandalaImage = "/images/mandala_gold.png";
const brideGroomImage = "/images/10.png";
const heroBgImage = "/Gemini_Generated_Image_99ig0899ig0899ig.jpg";
const bgMusic = "/music/kudmayi.mp3";
const introVideo = "/gemini_generated_video_ef8d7504.mp4";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="mandala-frame pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      <div className="mandala-corner mandala-corner-tr">
        <InviteImage src={mandalaImage} alt="" className="mandala-art" eager />
      </div>
      {!minimal && (
        <>
          <div className="mandala-corner mandala-corner-bl mandala-mobile-hidden">
            <InviteImage src={mandalaImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-tl is-soft mandala-mobile-hidden">
            <InviteImage src={mandalaImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-br is-soft mandala-mobile-hidden">
            <InviteImage src={mandalaImage} alt="" className="mandala-art" />
          </div>
        </>
      )}
    </div>
  );
}

function FloatingPetals({ disabled = false }: { disabled?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#f3d98b", "#e6b84f", "#f0a830", "#fff6dc"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(212,160,23,0.45)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function HeroDivider() {
  return (
    <span className="inline-flex items-center justify-center gap-2 w-[150px]" aria-hidden="true">
      <span className="h-1 w-1 shrink-0 rounded-full bg-theme-500" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-500" />
      <span className="relative grid h-3 w-3 shrink-0 rotate-45 place-items-center border border-theme-600">
        <span className="h-1 w-1 -rotate-45 rounded-full bg-theme-700" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-theme-500 to-transparent" />
      <span className="h-1 w-1 shrink-0 rounded-full bg-theme-500" />
    </span>
  );
}

const heroSparkles = [
  { left: "22%", top: "14%", size: 9, delay: 0 },
  { left: "74%", top: "12%", size: 11, delay: 1.2 },
  { left: "30%", top: "30%", size: 7, delay: 2.1 },
  { left: "68%", top: "34%", size: 9, delay: 0.6 },
  { left: "50%", top: "9%", size: 7, delay: 1.8 },
  { left: "80%", top: "26%", size: 7, delay: 2.7 },
];

function HeroSparkles() {
  return (
    <>
      {heroSparkles.map((s, i) => (
        <motion.svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 10 10"
          width={s.size}
          height={s.size}
          className="absolute z-[1] pointer-events-none"
          style={{ left: s.left, top: s.top }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1, 0.4], rotate: [0, 45, 90] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" fill="#c9a24a" />
        </motion.svg>
      ))}
    </>
  );
}

const collagePhotos = [
  { src: "/images/couple/collage-left.jpeg", alt: "Kaveesha and Sithum beneath white arches", rotate: -7 },
  { src: "/images/couple/collage-center.jpeg", alt: "Kaveesha and Sithum on the palace steps", rotate: 0 },
  { src: "/images/couple/collage-right.jpeg", alt: "Kaveesha and Sithum walking hand in hand", rotate: 7 },
];

const momentPhotos = [
  { src: "/images/couple/moment-selfie.jpeg", alt: "Kaveesha and Sithum smiling together", position: "60% 50%" },
  { src: "/images/couple/moment-golden-hour.jpeg", alt: "Kaveesha and Sithum in golden hour light", position: "50% 35%" },
  { src: "/images/couple/moment-dance.jpeg", alt: "Kaveesha and Sithum dancing by candlelight", position: "50% 60%" },
  { src: "/images/couple/moment-city-night.jpeg", alt: "Kaveesha and Sithum at the twin towers at night", position: "50% 72%" },
];

function CoupleCollage() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto mb-10 md:mb-14 px-2">
      <div className="absolute inset-x-6 inset-y-8 rounded-full bg-theme-200/40 blur-3xl" />
      <div className="relative flex items-center justify-center">
        {collagePhotos.map((photo, i) => {
          const isCenter = i === 1;
          return (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: isCenter ? 0 : 0.25, ease: "easeOut" }}
              className={`relative shrink-0 bg-white shadow-[0_25px_50px_-18px_rgba(110,81,12,0.45)] border border-theme-200 ${isCenter
                ? "z-20 w-[46%] p-2 md:p-2.5 rounded-t-full rounded-b-2xl"
                : `z-10 w-[36%] p-1.5 md:p-2 rounded-2xl mt-16 md:mt-20 ${i === 0 ? "-mr-[6%]" : "-ml-[6%]"}`
                }`}
            >
              <div className={`absolute inset-1 md:inset-1.5 border border-theme-300/60 pointer-events-none ${isCenter ? "rounded-t-full rounded-b-xl" : "rounded-xl"}`} />
              <InviteImage
                src={photo.src}
                alt={photo.alt}
                className={`w-full aspect-[3/4] object-cover ${isCenter ? "rounded-t-full rounded-b-xl" : "rounded-xl"}`}
              />
            </motion.div>
          );
        })}
      </div>
      <InviteImage
        src={mandalaImage}
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 -bottom-8 md:-bottom-10 -translate-x-1/2 w-16 md:w-20 opacity-70 mix-blend-multiply z-30"
      />
    </div>
  );
}

function OurMoments() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % momentPhotos.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? i : (i - 1 + momentPhotos.length) % momentPhotos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <section className="cv-auto py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px] mb-4">Our Story</span>
          <h2 className="font-playball text-[3.2rem] sm:text-[4rem] md:text-[5rem] text-theme-900 leading-none drop-shadow-sm">Our Moments</h2>
          <div className="mt-6"><HeroDivider /></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {momentPhotos.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
              className="group relative block w-full overflow-hidden rounded-2xl bg-white p-1.5 md:p-2 border border-theme-200 shadow-[0_18px_40px_-20px_rgba(110,81,12,0.4)] cursor-zoom-in"
              aria-label={`View photo: ${photo.alt}`}
            >
              <div className="overflow-hidden rounded-xl aspect-[3/4]">
                <InviteImage
                  src={photo.src}
                  alt={photo.alt}
                  style={{ objectPosition: photo.position }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-1.5 md:inset-2 rounded-xl border border-white/0 group-hover:border-theme-300/80 transition-colors pointer-events-none" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#1a1408]/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveIndex(null)}
          >
            <motion.img
              key={momentPhotos[activeIndex].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={momentPhotos[activeIndex].src}
              alt={momentPhotos[activeIndex].alt}
              className="max-h-[85vh] max-w-full rounded-xl border-4 border-white shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/10 border border-theme-300/50 text-theme-100 text-[10px] uppercase tracking-[0.3em] font-bold"
            >
              Close
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex - 1 + momentPhotos.length) % momentPhotos.length); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-theme-300/50 text-theme-100 text-xl"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex + 1) % momentPhotos.length); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-theme-300/50 text-theme-100 text-xl"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CountdownTimer() {
  const targetDate = new Date("November 14, 2026 18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);

  // Started from the button tap so mobile browsers allow playback.
  const startMusic = () => {
    const music = musicRef.current;
    if (!music) return;
    music.volume = 0.6;
    music.play().then(() => setIsMusicOn(true)).catch(() => setIsMusicOn(false));
  };

  // Try to autoplay on load; if the browser blocks it, start on the first interaction.
  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;
    music.volume = 0.6;

    const events = ["pointerdown", "touchstart", "keydown", "wheel"] as const;
    const removeListeners = () => events.forEach((e) => window.removeEventListener(e, unlock));
    function unlock() {
      removeListeners();
      if (music!.paused) startMusic();
    }

    music.play()
      .then(() => setIsMusicOn(true))
      .catch(() => events.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true })));

    return removeListeners;
  }, []);

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;
    if (music.paused) {
      startMusic();
    } else {
      music.pause();
      setIsMusicOn(false);
    }
  };

  const playIntro = () => {
    const video = introVideoRef.current;
    if (!video) {
      setIsOpened(true);
      return;
    }
    if (musicRef.current?.paused) startMusic();
    setIsIntroPlaying(true);
    video.currentTime = 0;
    video.play().catch(() => setIsOpened(true));
  };

  useEffect(() => {
    if (!isOpened) setIsIntroPlaying(false);
  }, [isOpened]);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full bg-white transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <audio ref={musicRef} src={bgMusic} loop preload="auto" />

      {(
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          aria-label={isMusicOn ? "Pause music" : "Play music"}
          className="fixed bottom-6 left-6 z-[80] w-11 h-11 rounded-full bg-white/85 backdrop-blur-md border border-theme-300 shadow-lg text-theme-700 flex items-center justify-center hover:bg-theme-50 transition-colors"
        >
          {isMusicOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          {isMusicOn && <span className="absolute inset-0 rounded-full border border-theme-400 animate-ping opacity-40" />}
        </motion.button>
      )}

      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals disabled={isLowPerformanceMode} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="intro-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={introVideoRef}
              src={introVideo}
              className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-1000 ${isIntroPlaying ? "blur-0 scale-100" : "blur-md scale-110"
                }`}
              playsInline
              muted
              preload="auto"
              onEnded={() => setIsOpened(true)}
            />

            <AnimatePresence>
              {!isIntroPlaying && (
                <motion.div
                  key="intro-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.6 } }}
                  className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full h-full bg-black/35"
                >
                  <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm text-[10px] uppercase tracking-[0.5em] text-white font-bold mb-6">
                    Engagement Invitation
                  </span>
                  <h1 className="font-cinzel text-4xl md:text-5xl text-white mb-4 tracking-tight drop-shadow-lg">
                    Kaveesha & Sithum
                  </h1>
                  <p className="text-white/80 text-sm tracking-[0.2em] font-light mb-10">NOVEMBER 14, 2026</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playIntro}
                    className="px-8 py-4 rounded-full bg-white/90 backdrop-blur-md text-stone-800 text-xs uppercase tracking-[0.4em] font-bold shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] border border-theme-200 hover:bg-white transition-colors"
                  >
                    View Invitation
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {isIntroPlaying && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setIsOpened(true)}
                className="absolute bottom-6 right-6 z-10 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                Skip
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section className="relative w-full min-h-[100svh] overflow-hidden bg-[#f7efdc]">
              {/* Soft fill behind the portrait artwork on wide screens */}
              <InviteImage
                src={heroBgImage}
                alt=""
                aria-hidden="true"
                eager
                className="absolute inset-0 hidden sm:block w-full h-full object-cover scale-110 blur-md opacity-60 select-none"
              />
              <div className="absolute inset-0 hidden sm:block bg-[#fbf6ea]/40" />

              {/* Artwork frame keeps the arch and text aligned at any size */}
              <div className="relative mx-auto h-[100svh] w-full sm:w-auto sm:aspect-[1536/2768] sm:shadow-[0_0_80px_-10px_rgba(110,81,12,0.35)]">
                <InviteImage
                  src={heroBgImage}
                  alt=""
                  aria-hidden="true"
                  eager
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(60% 30% at 50% 36%, rgba(255,253,246,0.75), transparent 75%)" }}
                />

                <HeroSparkles />

                <div className="absolute inset-x-[18%] top-[19%] z-[2]">
                  <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2 text-center"
                    style={{ textShadow: "0 1px 14px rgba(255,253,246,0.95)" }}
                  >
                    <p className="font-serif italic text-theme-800" style={{ fontSize: "clamp(0.95rem,3.8vw,1.2rem)", lineHeight: 1.35, letterSpacing: "0.02em" }}>
                      Together<br />with their Families
                    </p>

                    <HeroDivider />

                    <h1
                      className="flex flex-col items-center"
                      style={{ fontFamily: '"Cinzel Decorative", "Cinzel", Georgia, serif', lineHeight: 1.15, fontSize: "clamp(1.6rem,7vw,2.5rem)", letterSpacing: "0.04em" }}
                    >
                      <span className="hero-gold-text">Kaveesha</span>
                      <span className="font-script text-theme-600 leading-none" style={{ fontSize: "0.75em", letterSpacing: 0, textShadow: "none" }}>&amp;</span>
                      <span className="hero-gold-text">Sithum</span>
                    </h1>

                    <HeroDivider />

                    <p className="font-serif italic text-theme-800" style={{ fontSize: "clamp(0.95rem,3.8vw,1.2rem)", lineHeight: 1.35, letterSpacing: "0.02em" }}>
                      Request the Honor of Your Presence<br />at their Engagement
                    </p>

                    <p className="mt-2 font-serif italic font-semibold text-theme-700" style={{ fontSize: "clamp(1.2rem,5vw,1.6rem)", letterSpacing: "0.02em" }}>
                      14<sup className="text-[0.62em]">th</sup> November 2026
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Scroll cue */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[64px] left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-1.5 pointer-events-none"
                aria-hidden="true"
              >
                <span className="h-8 w-px bg-gradient-to-b from-transparent to-theme-600" />
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path d="M1 1 L7 7 L13 1" stroke="#8f6a0f" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Marquee ribbon */}
              <div className="absolute bottom-0 inset-x-0 z-[3] overflow-hidden py-3 border-y border-theme-400/50 bg-[#fffbf0]/75 backdrop-blur-[2px]">
                <motion.div
                  className="flex w-max whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="px-8 font-cinzel text-[0.72rem] uppercase tracking-[0.34em] text-theme-800">
                      Kaveesha &amp; Sithum&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;Engagement&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;14 . 11 . 26&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;6.00 PM&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;Swarna Banquet Hall, Ganemulla&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;Dress Code · Indian
                    </span>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                {/* Top-left: left.png on mobile, mandala on desktop */}
                <InviteImage src="/images/left.png" className="block md:hidden absolute -left-4 -top-4 w-[200px] h-auto opacity-80 object-contain" alt="" loading="eager" />
                <InviteImage src={mandalaImage} className="hidden md:block absolute -left-10 top-8 w-[460px] h-auto mix-blend-multiply opacity-55 -rotate-[8deg]" alt="" />
                {/* Top-right: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -right-10 top-2 w-[430px] h-auto mix-blend-multiply opacity-50 rotate-[12deg]" alt="" />
                {/* Bottom-left: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -left-6 bottom-8 w-[420px] h-auto mix-blend-multiply opacity-40 rotate-[180deg]" alt="" />
                {/* Bottom-right: right.png on mobile, mandala on desktop */}
                <InviteImage src="/images/right.png" className="block md:hidden absolute -right-4 bottom-0 w-[200px] h-auto opacity-80 object-contain" alt="" loading="eager" />
                <InviteImage src={mandalaImage} className="hidden md:block absolute -right-8 bottom-14 w-[470px] h-auto mix-blend-multiply opacity-45 -rotate-[170deg]" alt="" />
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-theme-400 mb-6 md:mb-10" />
                  <p className="text-theme-700 text-[9px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-center leading-loose">
                    You are cordially invited to<br className="hidden md:block" /> celebrate the engagement of
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mb-10 md:mb-14"
                >
                  <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-theme-200/35 blur-xl" />
                  <div className="relative bg-white/90 p-2.5 md:p-3 rounded-[2rem] border border-theme-200 shadow-[0_20px_50px_-20px_rgba(161,120,25,0.4)]">
                    <InviteImage
                      src={brideGroomImage}
                      alt="Kaveesha and Sithum illustration"
                      loading="eager"
                      className="w-[200px] h-[240px] md:w-[270px] md:h-[320px] object-cover rounded-[1.6rem] border border-theme-100"
                    />
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Kaveesha's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Beloved daughter of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. & Mrs. Perera</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Kaveesha</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-500 to-theme-700 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/20 border-4 border-[#fdfaf5]"
                    >
                      <span className="text-3xl md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Sithum's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Beloved son of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. & Mrs. Fernando</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Sithum</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Couple Photo Collage */}
                <CoupleCollage />

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Date</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">SATURDAY, 14 NOVEMBER</p>
                      <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">2026</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Time</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">6:00 PM</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">Onwards</p>
                    </div>
                  </div>

                  <div className="pt-8 w-full px-4">
                    <div className="relative inline-flex items-center justify-center w-full max-w-md mx-auto group">
                      <div className="absolute inset-0 bg-theme-100 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                      <p className="relative text-theme-800 bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] text-[9px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase px-6 lg:px-10 py-4 lg:py-5 rounded-full border border-theme-200 flex items-center justify-center gap-4 w-full md:w-auto">
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                        <span className="whitespace-nowrap">Dress Code · Indian</span>
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#fffbf0] relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    Wait for the <span className="font-playball text-theme-700 italic lowercase tracking-normal text-4xl md:text-7xl ml-2">magic</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Our Moments Gallery */}
            <OurMoments />

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-white relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-theme-400" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                      </div>
                      <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Swarna Banquet Hall
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          Ganemulla,<br /> Sri Lanka.
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                        We look forward to welcoming you to an evening of colour, music and celebration as we begin our journey together.
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Swarna+Banquet+Hall+Ganemulla', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Swarna%20Banquet%20Hall,%20Ganemulla,%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#241c0f] text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-800 blur-[150px] rounded-full opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-900 blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-theme-300 font-bold mb-6">Will You Join Us?</p>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-white mb-6 drop-shadow-md">RSVP</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-stone-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-16 tracking-wide font-light">
                    We would be absolutely thrilled to celebrate with you.
                  </p>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Full Name</label>
                        <input
                          type="text"
                          placeholder="John & Jane Doe"
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Guests</label>
                        <div className="relative">
                          <select
                            defaultValue="1"
                            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-[#241c0f] text-white">1 Guest (Just Me)</option>
                            <option value="2" className="bg-[#241c0f] text-white">2 Guests</option>
                            <option value="3" className="bg-[#241c0f] text-white">3 Guests</option>
                            <option value="4" className="bg-[#241c0f] text-white">4 Guests</option>
                            <option value="0" className="bg-[#241c0f] text-theme-300">Regretfully Decline</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Dietary Notes</label>
                        <input
                          type="text"
                          placeholder="Allergies, Vegan, etc."
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="pt-10">
                        <button
                          className="w-full bg-theme-200 text-stone-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 group inline-flex justify-center items-center gap-4"
                        >
                          <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                          Send RSVP
                          <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-white">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">
                <InviteImage src={mandalaImage} alt="" className="absolute top-0 right-0 w-[40vw] max-w-[500px] opacity-[0.04] mix-blend-multiply translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <InviteImage src={mandalaImage} alt="" className="absolute bottom-16 left-1/2 w-[38vw] max-w-[360px] opacity-[0.08] mix-blend-multiply -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-100/50 mb-8 mt-4 shadow-sm border border-theme-200/50">
                      <Sparkles className="w-8 h-8 text-theme-500" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-800 mb-6 drop-shadow-sm leading-none">Best Wishes</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-theme-400 to-transparent mb-8" />

                    <p className="text-stone-500 text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-wide px-4">
                      Your presence at our engagement is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!
                    </p>

                    {/* Premium Wishing Form */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-theme-100/50 rounded-tr-[4rem] rounded-bl-[4rem] relative group">
                      {/* Decorative internal lines */}
                      <div className="absolute inset-2 md:inset-4 border-[0.5px] border-theme-200/50 rounded-tr-[3.5rem] rounded-bl-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/80" />

                      <form className="space-y-8 text-left relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide rounded-t-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Message</label>
                          <textarea
                            rows={4}
                            placeholder="Wishing you a lifetime of happiness..."
                            className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide resize-none rounded-t-lg"
                          />
                        </div>
                        <div className="pt-6 flex justify-center">
                          <button className="bg-theme-800 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group/btn inline-flex items-center gap-4">
                            <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover/btn:scale-150 transition-transform" />
                            Send Wishes
                            <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover/btn:scale-150 transition-transform" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="mt-32 md:mt-48 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[22vw] md:text-[220px] text-theme-100/40 whitespace-nowrap pointer-events-none z-0 select-none">
                        Thank You
                      </div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-white px-6 py-2 rounded-full border border-theme-100/50 shadow-sm">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Kaveesha & Sithum</h3>

                      <motion.img
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        src={mandalaImage}
                        alt=""
                        className="relative z-10 mt-8 w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-multiply drop-shadow-[0_12px_24px_rgba(212,160,23,0.25)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-12 border-t border-theme-200/30 text-center relative z-10 space-y-3">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                  © 2026 Kaveesha & Sithum. <span className="hidden md:inline">|</span><br className="md:hidden block mt-2" /> All rights reserved.
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
          background: #d4a017;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
