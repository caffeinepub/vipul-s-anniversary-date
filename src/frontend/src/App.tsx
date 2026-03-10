import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────
interface NoButtonPos {
  top: string;
  left: string;
}

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: string;
  duration: string;
  size: string;
  shape: "circle" | "rect" | "star";
}

// ── Helpers ────────────────────────────────────────────────────────────────
function randomPos(): NoButtonPos {
  return {
    top: `${Math.floor(Math.random() * 65) + 10}%`,
    left: `${Math.floor(Math.random() * 65) + 5}%`,
  };
}

function generateConfetti(count: number): ConfettiPiece[] {
  const colors = [
    "oklch(70% 0.25 15)",
    "oklch(75% 0.28 45)",
    "oklch(70% 0.22 145)",
    "oklch(65% 0.25 260)",
    "oklch(80% 0.20 300)",
    "oklch(85% 0.18 90)",
    "oklch(75% 0.30 200)",
  ];
  const shapes: Array<"circle" | "rect" | "star"> = ["circle", "rect", "star"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 3}s`,
    size: `${8 + Math.random() * 14}px`,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }));
}

// ── Static decoration data (no index keys) ─────────────────────────────────────
const STAR_DATA = [
  {
    id: "s01",
    top: "0.0%",
    left: "0.0%",
    delay: "0.0s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✦",
  },
  {
    id: "s02",
    top: "3.7%",
    left: "3.3%",
    delay: "0.3s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(85% 0.15 45)",
    glyph: "★",
  },
  {
    id: "s03",
    top: "7.4%",
    left: "6.6%",
    delay: "0.6s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✧",
  },
  {
    id: "s04",
    top: "11.1%",
    left: "9.9%",
    delay: "0.9s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✦",
  },
  {
    id: "s05",
    top: "14.8%",
    left: "13.2%",
    delay: "1.2s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(90% 0.05 260)",
    glyph: "★",
  },
  {
    id: "s06",
    top: "18.5%",
    left: "16.5%",
    delay: "1.5s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✧",
  },
  {
    id: "s07",
    top: "22.2%",
    left: "19.8%",
    delay: "1.8s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✦",
  },
  {
    id: "s08",
    top: "25.9%",
    left: "23.1%",
    delay: "2.1s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(85% 0.15 45)",
    glyph: "★",
  },
  {
    id: "s09",
    top: "29.6%",
    left: "26.4%",
    delay: "2.4s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✧",
  },
  {
    id: "s10",
    top: "33.3%",
    left: "29.7%",
    delay: "2.7s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✦",
  },
  {
    id: "s11",
    top: "37.0%",
    left: "33.0%",
    delay: "3.0s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(90% 0.05 260)",
    glyph: "★",
  },
  {
    id: "s12",
    top: "40.7%",
    left: "36.3%",
    delay: "3.3s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✧",
  },
  {
    id: "s13",
    top: "44.4%",
    left: "39.6%",
    delay: "3.6s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✦",
  },
  {
    id: "s14",
    top: "48.1%",
    left: "42.9%",
    delay: "3.9s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(85% 0.15 45)",
    glyph: "★",
  },
  {
    id: "s15",
    top: "51.8%",
    left: "46.2%",
    delay: "0.2s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✧",
  },
  {
    id: "s16",
    top: "55.5%",
    left: "49.5%",
    delay: "0.5s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✦",
  },
  {
    id: "s17",
    top: "59.2%",
    left: "52.8%",
    delay: "0.8s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(90% 0.05 260)",
    glyph: "★",
  },
  {
    id: "s18",
    top: "62.9%",
    left: "56.1%",
    delay: "1.1s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✧",
  },
  {
    id: "s19",
    top: "66.6%",
    left: "59.4%",
    delay: "1.4s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✦",
  },
  {
    id: "s20",
    top: "70.3%",
    left: "62.7%",
    delay: "1.7s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(85% 0.15 45)",
    glyph: "★",
  },
  {
    id: "s21",
    top: "74.0%",
    left: "66.0%",
    delay: "2.0s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✧",
  },
  {
    id: "s22",
    top: "77.7%",
    left: "69.3%",
    delay: "2.3s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✦",
  },
  {
    id: "s23",
    top: "81.4%",
    left: "72.6%",
    delay: "2.6s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(90% 0.05 260)",
    glyph: "★",
  },
  {
    id: "s24",
    top: "85.1%",
    left: "75.9%",
    delay: "2.9s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✧",
  },
  {
    id: "s25",
    top: "88.8%",
    left: "79.2%",
    delay: "3.2s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✦",
  },
  {
    id: "s26",
    top: "9.0%",
    left: "82.5%",
    delay: "3.5s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(85% 0.15 45)",
    glyph: "★",
  },
  {
    id: "s27",
    top: "20.0%",
    left: "85.8%",
    delay: "0.4s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(90% 0.05 260)",
    glyph: "✧",
  },
  {
    id: "s28",
    top: "45.0%",
    left: "89.1%",
    delay: "1.3s",
    dur: "1.5s",
    size: "0.6rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✦",
  },
  {
    id: "s29",
    top: "65.0%",
    left: "92.4%",
    delay: "2.2s",
    dur: "2.5s",
    size: "0.9rem",
    color: "oklch(90% 0.05 260)",
    glyph: "★",
  },
  {
    id: "s30",
    top: "92.0%",
    left: "95.7%",
    delay: "3.1s",
    dur: "3.5s",
    size: "1.2rem",
    color: "oklch(85% 0.15 45)",
    glyph: "✧",
  },
];

const HEARTS_DATA = [
  {
    id: "ht1",
    emoji: "💕",
    top: "21%",
    left: "10%",
    size: "1.2rem",
    delay: "0.0s",
    dur: "3s",
  },
  {
    id: "ht2",
    emoji: "💖",
    top: "32%",
    left: "23%",
    size: "1.6rem",
    delay: "0.5s",
    dur: "4s",
  },
  {
    id: "ht3",
    emoji: "💗",
    top: "43%",
    left: "36%",
    size: "2.0rem",
    delay: "1.0s",
    dur: "5s",
  },
  {
    id: "ht4",
    emoji: "💓",
    top: "54%",
    left: "49%",
    size: "1.2rem",
    delay: "1.5s",
    dur: "3s",
  },
  {
    id: "ht5",
    emoji: "💞",
    top: "65%",
    left: "62%",
    size: "1.6rem",
    delay: "2.0s",
    dur: "4s",
  },
  {
    id: "ht6",
    emoji: "🌸",
    top: "76%",
    left: "75%",
    size: "2.0rem",
    delay: "2.5s",
    dur: "5s",
  },
  {
    id: "ht7",
    emoji: "💕",
    top: "87%",
    left: "8%",
    size: "1.2rem",
    delay: "1.2s",
    dur: "3s",
  },
  {
    id: "ht8",
    emoji: "💝",
    top: "10%",
    left: "88%",
    size: "1.6rem",
    delay: "0.7s",
    dur: "4s",
  },
];

const SPARKLES_DATA = [
  {
    id: "sp1",
    emoji: "✨",
    top: "5%",
    left: "0%",
    size: "1.0rem",
    delay: "0.0s",
    dur: "1.5s",
  },
  {
    id: "sp2",
    emoji: "💫",
    top: "14%",
    left: "11%",
    size: "1.5rem",
    delay: "0.4s",
    dur: "2.0s",
  },
  {
    id: "sp3",
    emoji: "⭐",
    top: "23%",
    left: "22%",
    size: "1.0rem",
    delay: "0.8s",
    dur: "2.5s",
  },
  {
    id: "sp4",
    emoji: "🌟",
    top: "32%",
    left: "33%",
    size: "1.5rem",
    delay: "1.2s",
    dur: "3.0s",
  },
  {
    id: "sp5",
    emoji: "✨",
    top: "41%",
    left: "44%",
    size: "1.0rem",
    delay: "1.6s",
    dur: "1.5s",
  },
  {
    id: "sp6",
    emoji: "💫",
    top: "50%",
    left: "55%",
    size: "1.5rem",
    delay: "2.0s",
    dur: "2.0s",
  },
  {
    id: "sp7",
    emoji: "✨",
    top: "59%",
    left: "66%",
    size: "1.0rem",
    delay: "2.4s",
    dur: "2.5s",
  },
  {
    id: "sp8",
    emoji: "⭐",
    top: "68%",
    left: "77%",
    size: "1.5rem",
    delay: "2.8s",
    dur: "3.0s",
  },
  {
    id: "sp9",
    emoji: "🌟",
    top: "77%",
    left: "88%",
    size: "1.0rem",
    delay: "0.3s",
    dur: "1.5s",
  },
  {
    id: "sp10",
    emoji: "💫",
    top: "86%",
    left: "22%",
    size: "1.5rem",
    delay: "1.0s",
    dur: "2.0s",
  },
];

const BOKEH_DATA = [
  {
    id: "bk01",
    top: "0%",
    left: "0%",
    size: "30px",
    bg: "oklch(55% 0.20 15 / 0.2)",
    delay: "0.0s",
    dur: "3s",
  },
  {
    id: "bk02",
    top: "8%",
    left: "9%",
    size: "50px",
    bg: "oklch(60% 0.20 25 / 0.2)",
    delay: "0.4s",
    dur: "4s",
  },
  {
    id: "bk03",
    top: "16%",
    left: "18%",
    size: "70px",
    bg: "oklch(65% 0.20 35 / 0.2)",
    delay: "0.8s",
    dur: "5s",
  },
  {
    id: "bk04",
    top: "24%",
    left: "27%",
    size: "90px",
    bg: "oklch(70% 0.20 45 / 0.2)",
    delay: "1.2s",
    dur: "6s",
  },
  {
    id: "bk05",
    top: "32%",
    left: "36%",
    size: "110px",
    bg: "oklch(55% 0.20 15 / 0.2)",
    delay: "1.6s",
    dur: "3s",
  },
  {
    id: "bk06",
    top: "40%",
    left: "45%",
    size: "30px",
    bg: "oklch(60% 0.20 25 / 0.2)",
    delay: "2.0s",
    dur: "4s",
  },
  {
    id: "bk07",
    top: "48%",
    left: "54%",
    size: "50px",
    bg: "oklch(65% 0.20 35 / 0.2)",
    delay: "2.4s",
    dur: "5s",
  },
  {
    id: "bk08",
    top: "56%",
    left: "63%",
    size: "70px",
    bg: "oklch(70% 0.20 45 / 0.2)",
    delay: "2.8s",
    dur: "6s",
  },
  {
    id: "bk09",
    top: "64%",
    left: "72%",
    size: "90px",
    bg: "oklch(55% 0.20 15 / 0.2)",
    delay: "1.2s",
    dur: "3s",
  },
  {
    id: "bk10",
    top: "72%",
    left: "81%",
    size: "110px",
    bg: "oklch(60% 0.20 25 / 0.2)",
    delay: "0.8s",
    dur: "4s",
  },
  {
    id: "bk11",
    top: "80%",
    left: "9%",
    size: "30px",
    bg: "oklch(65% 0.20 35 / 0.2)",
    delay: "0.4s",
    dur: "5s",
  },
  {
    id: "bk12",
    top: "88%",
    left: "45%",
    size: "50px",
    bg: "oklch(70% 0.20 45 / 0.2)",
    delay: "0.0s",
    dur: "6s",
  },
];

// ── Decorative Background Elements ───────────────────────────────────────────────
function FloatingStars() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {STAR_DATA.map((s) => (
        <div
          key={s.id}
          className="absolute animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.dur,
            fontSize: s.size,
            color: s.color,
          }}
        >
          {s.glyph}
        </div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {HEARTS_DATA.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-heart"
          style={{
            top: h.top,
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.dur,
            opacity: 0.55,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}

function FloatingSparkles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {SPARKLES_DATA.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  );
}

function BokehLights() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {BOKEH_DATA.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full animate-bokeh"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.bg,
            filter: "blur(10px)",
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  );
}

function ConfettiRain() {
  const [pieces] = useState<ConfettiPiece[]>(() => generateConfetti(60));
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <div
          key={`confetti-${p.id}`}
          className={p.id % 2 === 0 ? "animate-confetti" : "animate-confetti-2"}
          style={{
            position: "absolute",
            top: "-20px",
            left: p.left,
            width:
              p.shape === "rect"
                ? `${Number.parseInt(p.size) * 1.5}px`
                : p.size,
            height: p.size,
            background: p.color,
            borderRadius:
              p.shape === "circle" ? "50%" : p.shape === "rect" ? "2px" : "0",
            clipPath:
              p.shape === "star"
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                : undefined,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// ── Shared Wrong Answer Hook ───────────────────────────────────────────────
function useWrongAnswer() {
  const [shakingIdx, setShakingIdx] = useState<number | null>(null);
  const [wrongMsg, setWrongMsg] = useState<{ idx: number; msg: string } | null>(
    null,
  );

  const triggerWrong = (idx: number, msg: string) => {
    setShakingIdx(idx);
    setWrongMsg({ idx, msg });
    setTimeout(() => setShakingIdx(null), 650);
    setTimeout(() => setWrongMsg(null), 2500);
  };

  return { shakingIdx, wrongMsg, triggerWrong };
}

// ── Page 1: Intro — Dark Space Theme ──────────────────────────────────────
const INTRO_SPARKLES = [
  { id: "is1", e: "💫", d: "0s" },
  { id: "is2", e: "⭐", d: "0.3s" },
  { id: "is3", e: "✨", d: "0.6s" },
  { id: "is4", e: "🌟", d: "0.9s" },
  { id: "is5", e: "💫", d: "1.2s" },
];

function PageIntro({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, oklch(22% 0.10 280) 0%, oklch(10% 0.05 260) 50%, oklch(5% 0.02 250) 100%)",
      }}
    >
      <FloatingStars />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div
          className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold tracking-widest uppercase"
          style={{
            background: "oklch(72% 0.22 45 / 0.15)",
            border: "1px solid oklch(72% 0.22 45 / 0.5)",
            color: "oklch(88% 0.18 50)",
            fontFamily: "Cabinet Grotesk, sans-serif",
            letterSpacing: "0.15em",
          }}
        >
          ✦ 1 Month Anniversary ✦
        </div>

        <h1
          className="mb-4 leading-tight"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(3rem, 10vw, 5.5rem)",
            fontWeight: 900,
            color: "white",
            textShadow:
              "0 0 40px oklch(72% 0.22 45 / 0.6), 0 0 80px oklch(72% 0.22 45 / 0.3)",
          }}
        >
          Hey Vipul... 👀
        </h1>

        <p
          className="mb-3 animate-glitch"
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "clamp(1rem, 3vw, 1.4rem)",
            color: "white",
            fontWeight: 700,
          }}
        >
          Your wife has a VERY important question for you...
        </p>
        <p
          className="mb-10"
          style={{
            fontFamily: "Figtree, sans-serif",
            fontSize: "1rem",
            color: "oklch(70% 0.06 260)",
          }}
        >
          (No, it&apos;s not about the dishes. Well... maybe a little.)
        </p>

        <div
          className="mb-6 text-4xl flex justify-center gap-3"
          aria-hidden="true"
        >
          {INTRO_SPARKLES.map(({ id, e, d }) => (
            <span
              key={id}
              className="animate-sparkle"
              style={{ animationDelay: d }}
            >
              {e}
            </span>
          ))}
        </div>

        <h2
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            fontWeight: 900,
            color: "white",
            marginBottom: "0.5rem",
            textShadow: "0 0 30px oklch(80% 0.20 280 / 0.5)",
          }}
        >
          Are you ready, Vipul? 🚀
        </h2>
        <p
          style={{
            color: "oklch(70% 0.08 280)",
            marginBottom: "2.5rem",
            fontFamily: "Figtree, sans-serif",
          }}
        >
          (Brace yourself)
        </p>

        <button
          type="button"
          data-ocid="intro.primary_button"
          onClick={onNext}
          className="animate-bounce-btn"
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "1.3rem",
            fontWeight: 800,
            padding: "1rem 2.8rem",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, oklch(72% 0.22 45), oklch(68% 0.28 55))",
            color: "oklch(12% 0.02 260)",
            boxShadow:
              "0 0 30px oklch(72% 0.22 45 / 0.5), 0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          YES I&apos;M READY! 💥
        </button>
      </div>
    </div>
  );
}

// ── Page 2: Quiz — Galaxy Purple Theme ────────────────────────────────────
const DATE_OPTIONS = [
  {
    id: "do1",
    label: "Nah! I don't know 😅",
    wrong: true,
    wrongMsg: "Really?? Think again! 🤔",
    badge: "A",
  },
  {
    id: "do2",
    label: "CISF Raising Day 🎖️",
    wrong: true,
    wrongMsg: "Nice try... but no 😂",
    badge: "B",
  },
  {
    id: "do3",
    label: "Our 1 Month Anniversary! 🎉",
    wrong: false,
    wrongMsg: "",
    badge: "C",
  },
];

function PageQuizDate({ onNext }: { onNext: () => void }) {
  const { shakingIdx, wrongMsg, triggerWrong } = useWrongAnswer();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, oklch(32% 0.22 285) 0%, oklch(20% 0.18 270) 40%, oklch(10% 0.12 255) 100%)",
      }}
    >
      <FloatingSparkles />

      <div className="relative z-10 text-center max-w-xl mx-auto w-full">
        <div
          className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: "oklch(65% 0.25 300 / 0.2)",
            border: "1px solid oklch(65% 0.25 300 / 0.5)",
            color: "oklch(88% 0.12 300)",
            fontFamily: "Cabinet Grotesk, sans-serif",
          }}
        >
          Question 1 of 3
        </div>

        <h1
          className="mb-8"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            fontWeight: 900,
            color: "white",
            lineHeight: 1.2,
            textShadow: "0 0 30px oklch(70% 0.28 300 / 0.6)",
          }}
        >
          Do you know what day it is? 🤔
        </h1>

        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          {DATE_OPTIONS.map((opt, i) => (
            <div key={opt.id} className="relative">
              <button
                type="button"
                data-ocid={`quiz_date.button.${i + 1}`}
                className={shakingIdx === i ? "animate-shake" : ""}
                onClick={() => {
                  if (opt.wrong) {
                    triggerWrong(i, opt.wrongMsg);
                  } else {
                    onNext();
                  }
                }}
                style={{
                  width: "100%",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  padding: "1.1rem 1.5rem",
                  borderRadius: "16px",
                  border: opt.wrong
                    ? "2px solid oklch(55% 0.22 300 / 0.5)"
                    : "2px solid oklch(65% 0.25 300 / 0.7)",
                  cursor: "pointer",
                  background: opt.wrong
                    ? "oklch(22% 0.15 285 / 0.7)"
                    : "linear-gradient(135deg, oklch(45% 0.28 285), oklch(55% 0.25 310))",
                  color: "white",
                  backdropFilter: "blur(8px)",
                  boxShadow: opt.wrong
                    ? "0 4px 16px rgba(0,0,0,0.3)"
                    : "0 0 25px oklch(60% 0.28 295 / 0.4), 0 4px 16px rgba(0,0,0,0.3)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "oklch(65% 0.25 300 / 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    flexShrink: 0,
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {opt.badge}
                </span>
                {opt.label}
              </button>
              {wrongMsg?.idx === i && (
                <div
                  className="animate-float-up"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "oklch(35% 0.22 15)",
                    color: "white",
                    padding: "0.4rem 1rem",
                    borderRadius: "100px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "Figtree, sans-serif",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  ❌ {wrongMsg.msg}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page 3: Quiz — Cute Pastel / Colorful Theme ────────────────────────────
const LOVE_OPTIONS = [
  {
    id: "lo1",
    label: "Golgappe 🫧",
    emoji: "🫧",
    wrong: false,
    wrongMsg: "",
    green: true,
  },
  {
    id: "lo2",
    label: "You 💕",
    emoji: "💕",
    wrong: true,
    wrongMsg: "Aww wrong! She actually loves golgappe MORE 😂",
    green: false,
  },
];

function PageQuizLove({ onNext }: { onNext: () => void }) {
  const { shakingIdx, wrongMsg, triggerWrong } = useWrongAnswer();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(92% 0.06 15) 0%, oklch(90% 0.08 350) 30%, oklch(88% 0.10 300) 60%, oklch(90% 0.07 260) 100%)",
      }}
    >
      <FloatingHearts />

      <div className="relative z-10 text-center max-w-xl mx-auto w-full">
        <div
          className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: "oklch(70% 0.22 350 / 0.15)",
            border: "1px solid oklch(70% 0.22 350 / 0.5)",
            color: "oklch(35% 0.18 350)",
            fontFamily: "Cabinet Grotesk, sans-serif",
          }}
        >
          Question 2 of 3
        </div>

        <div
          className="mb-6"
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "2rem 1.5rem",
            boxShadow:
              "0 20px 60px oklch(65% 0.18 350 / 0.2), 0 4px 20px oklch(65% 0.18 350 / 0.1)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>😏</div>
          <h1
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(1.5rem, 5vw, 2.4rem)",
              fontWeight: 900,
              color: "oklch(35% 0.18 350)",
              lineHeight: 1.3,
            }}
          >
            Did you know your wife loves more than you... 👀
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "Figtree, sans-serif",
              fontSize: "1rem",
              color: "oklch(45% 0.12 350)",
              fontStyle: "italic",
            }}
          >
            Pick what she loves the MOST:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          {LOVE_OPTIONS.map((opt, i) => (
            <div key={opt.id} className="relative flex-1">
              <button
                type="button"
                data-ocid={`quiz_love.button.${i + 1}`}
                className={shakingIdx === i ? "animate-shake" : ""}
                onClick={() => {
                  if (opt.wrong) {
                    triggerWrong(i, opt.wrongMsg);
                  } else {
                    onNext();
                  }
                }}
                style={{
                  width: "100%",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontWeight: 800,
                  padding: "1.5rem 1rem",
                  borderRadius: "20px",
                  border: "3px solid",
                  borderColor: opt.green
                    ? "oklch(55% 0.22 155)"
                    : "oklch(65% 0.22 350)",
                  cursor: "pointer",
                  background: opt.green
                    ? "linear-gradient(135deg, oklch(88% 0.10 155), oklch(84% 0.14 145))"
                    : "linear-gradient(135deg, oklch(92% 0.08 350), oklch(88% 0.12 340))",
                  color: opt.green
                    ? "oklch(25% 0.15 155)"
                    : "oklch(28% 0.18 350)",
                  boxShadow: opt.green
                    ? "0 8px 24px oklch(55% 0.22 155 / 0.25)"
                    : "0 8px 24px oklch(65% 0.22 350 / 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>{opt.emoji}</span>
                <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {opt.label}
                </span>
              </button>
              {wrongMsg?.idx === i && (
                <div
                  className="animate-float-up"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "oklch(40% 0.22 15)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "Figtree, sans-serif",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    maxWidth: "220px",
                    textAlign: "center",
                  }}
                >
                  ❌ {wrongMsg.msg}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page 4: Quiz — Luxury Emerald + Gold Theme ─────────────────────────────
const GOLD_PARTICLES = [
  {
    key: "gp1",
    top: "7%",
    left: "6%",
    size: "0.8rem",
    delay: "0s",
    dur: "1.5s",
    shape: "✦",
  },
  {
    key: "gp2",
    top: "14%",
    left: "13%",
    size: "1.2rem",
    delay: "0.3s",
    dur: "2s",
    shape: "◆",
  },
  {
    key: "gp3",
    top: "25%",
    left: "82%",
    size: "0.9rem",
    delay: "0.6s",
    dur: "1.8s",
    shape: "✦",
  },
  {
    key: "gp4",
    top: "60%",
    left: "5%",
    size: "1rem",
    delay: "0.9s",
    dur: "2s",
    shape: "◆",
  },
  {
    key: "gp5",
    top: "75%",
    left: "90%",
    size: "0.8rem",
    delay: "1.2s",
    dur: "2.5s",
    shape: "✦",
  },
  {
    key: "gp6",
    top: "85%",
    left: "15%",
    size: "1.2rem",
    delay: "0.5s",
    dur: "1.5s",
    shape: "◆",
  },
  {
    key: "gp7",
    top: "40%",
    left: "95%",
    size: "0.8rem",
    delay: "1.8s",
    dur: "2s",
    shape: "✦",
  },
  {
    key: "gp8",
    top: "50%",
    left: "88%",
    size: "1rem",
    delay: "2.1s",
    dur: "1.5s",
    shape: "◆",
  },
];

const LUCKY_OPTIONS = [
  {
    id: "lu1",
    label: "That's not possible 🚫",
    wrong: true,
    wrongMsg: "Wrong! She insists she is! 😤",
  },
  {
    id: "lu2",
    label: "No! I am more lucky than her! 🍀",
    wrong: false,
    wrongMsg: "",
  },
];

function PageQuizLucky({ onNext }: { onNext: () => void }) {
  const { shakingIdx, wrongMsg, triggerWrong } = useWrongAnswer();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, oklch(28% 0.14 155) 0%, oklch(18% 0.10 145) 50%, oklch(10% 0.06 140) 100%)",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {GOLD_PARTICLES.map(({ key, top, left, size, delay, dur, shape }) => (
          <div
            key={key}
            className="absolute animate-twinkle"
            style={{
              top,
              left,
              fontSize: size,
              color: "oklch(82% 0.20 85)",
              animationDelay: delay,
              animationDuration: dur,
            }}
          >
            {shape}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-xl mx-auto w-full">
        <div
          className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: "oklch(78% 0.18 85 / 0.15)",
            border: "1px solid oklch(78% 0.18 85 / 0.5)",
            color: "oklch(88% 0.15 85)",
            fontFamily: "Cabinet Grotesk, sans-serif",
          }}
        >
          Question 3 of 3
        </div>

        <div
          className="mb-8"
          style={{
            background: "oklch(22% 0.12 150 / 0.7)",
            borderRadius: "24px",
            border: "2px solid oklch(78% 0.18 85 / 0.4)",
            padding: "2rem 1.5rem",
            backdropFilter: "blur(8px)",
            boxShadow:
              "inset 0 1px 0 oklch(78% 0.18 85 / 0.25), 0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>💍</div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.5rem, 5vw, 2.4rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.3,
            }}
          >
            She thinks she&apos;s the luckiest person alive to have you...{" "}
            <span style={{ color: "oklch(85% 0.18 85)" }}>
              what do you think? 🤷
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          {LUCKY_OPTIONS.map((opt, i) => (
            <div key={opt.id} className="relative">
              <button
                type="button"
                data-ocid={`quiz_lucky.button.${i + 1}`}
                className={shakingIdx === i ? "animate-shake" : ""}
                onClick={() => {
                  if (opt.wrong) {
                    triggerWrong(i, opt.wrongMsg);
                  } else {
                    onNext();
                  }
                }}
                style={{
                  width: "100%",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  padding: "1.1rem 1.5rem",
                  borderRadius: "16px",
                  border: "2px solid",
                  borderColor:
                    i === 0
                      ? "oklch(45% 0.15 145 / 0.5)"
                      : "oklch(78% 0.18 85 / 0.6)",
                  cursor: "pointer",
                  background:
                    i === 0
                      ? "oklch(22% 0.10 145 / 0.6)"
                      : "linear-gradient(135deg, oklch(35% 0.18 145), oklch(28% 0.14 150))",
                  color: "white",
                  backdropFilter: "blur(8px)",
                  boxShadow:
                    i === 1
                      ? "0 0 20px oklch(78% 0.18 85 / 0.3), 0 4px 16px rgba(0,0,0,0.3)"
                      : "0 4px 16px rgba(0,0,0,0.2)",
                  textAlign: "left",
                }}
              >
                {opt.label}
              </button>
              {wrongMsg?.idx === i && (
                <div
                  className="animate-float-up"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "oklch(40% 0.22 15)",
                    color: "white",
                    padding: "0.4rem 1rem",
                    borderRadius: "100px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "Figtree, sans-serif",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  ❌ {wrongMsg.msg}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page 5: Big Question — Romantic Red Theme ─────────────────────────────
function PageBigQuestion({ onNext }: { onNext: () => void }) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPos, setNoPos] = useState<NoButtonPos>({
    top: "auto",
    left: "auto",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNo = () => {
    setNoClickCount((prev) => prev + 1);
    setNoPos(randomPos());
    toast.error("Mana kese kar diya? Pit dunga. 😤", {
      duration: 3000,
      style: {
        fontFamily: "Bricolage Grotesque, sans-serif",
        fontWeight: 700,
        fontSize: "1rem",
        background: "oklch(20% 0.10 15)",
        color: "white",
        border: "2px solid oklch(60% 0.22 15)",
        borderRadius: "16px",
      },
    });
  };

  const handleNoHover = () => setNoPos(randomPos());

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 40% 50%, oklch(28% 0.22 15) 0%, oklch(18% 0.18 10) 40%, oklch(8% 0.08 5) 100%)",
      }}
    >
      <BokehLights />

      <div
        ref={containerRef}
        className="relative z-10 text-center max-w-lg mx-auto w-full"
      >
        <div
          className="mb-8"
          style={{
            background: "oklch(16% 0.14 10 / 0.7)",
            borderRadius: "28px",
            border: "2px solid oklch(55% 0.22 15 / 0.4)",
            padding: "2.5rem 2rem",
            backdropFilter: "blur(8px)",
            boxShadow:
              "0 0 60px oklch(50% 0.22 15 / 0.2), 0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "0.75rem" }}>🍷🕯️</div>
          <h1
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(1.6rem, 5.5vw, 2.8rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.3,
              textShadow: "0 0 30px oklch(60% 0.22 15 / 0.5)",
            }}
          >
            So... will you go on a dinner date with her tonight at 8pm? 🍷🕯️
          </h1>
          <p
            className="mt-3"
            style={{
              fontFamily: "Figtree, sans-serif",
              fontSize: "1rem",
              color: "oklch(75% 0.12 15)",
              fontStyle: "italic",
            }}
          >
            Think very carefully, Vipul. Very carefully. 😏
          </p>
        </div>

        <div className="relative" style={{ minHeight: "180px" }}>
          <button
            type="button"
            data-ocid="question.primary_button"
            onClick={onNext}
            className="animate-pulse-glow-rose"
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              padding: "1.1rem 3.5rem",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, oklch(72% 0.22 85), oklch(68% 0.28 65))",
              color: "oklch(12% 0.04 260)",
              boxShadow:
                "0 0 40px oklch(72% 0.22 85 / 0.6), 0 4px 20px rgba(0,0,0,0.3)",
              display: "block",
              margin: "0 auto 1.5rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            YES!! 💍✨
          </button>

          <button
            type="button"
            data-ocid="question.secondary_button"
            onClick={handleNo}
            onMouseEnter={handleNoHover}
            style={{
              fontFamily: "Figtree, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              padding: "0.5rem 1.2rem",
              borderRadius: "100px",
              border: "1px solid oklch(35% 0.05 260)",
              cursor: "pointer",
              background: "oklch(22% 0.04 260)",
              color: "oklch(50% 0.05 260)",
              position: noClickCount === 0 ? "relative" : "absolute",
              top: noClickCount === 0 ? "auto" : noPos.top,
              left: noClickCount === 0 ? "50%" : noPos.left,
              transform:
                noClickCount === 0
                  ? "translateX(-50%)"
                  : "translate(-50%, -50%)",
              transition: "top 0.25s ease, left 0.25s ease",
              zIndex: 1,
            }}
          >
            no... 😶
          </button>

          {noClickCount > 0 && (
            <p
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "0.85rem",
                color: "oklch(65% 0.12 15)",
                marginTop: "5rem",
                fontStyle: "italic",
              }}
            >
              {noClickCount === 1
                ? "Did that button just... run away? 😂"
                : noClickCount === 2
                  ? "It's hiding from you. Take the hint. 😂"
                  : "The button knows. The button is wise. 😅"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page 6: Celebration ────────────────────────────────────────────────────
const DATE_HEARTS_DATA = [
  { id: "dh1", e: "💖", d: "0s" },
  { id: "dh2", e: "💕", d: "0.3s" },
  { id: "dh3", e: "💗", d: "0.6s" },
  { id: "dh4", e: "💓", d: "0.9s" },
  { id: "dh5", e: "💞", d: "1.2s" },
  { id: "dh6", e: "💝", d: "1.5s" },
  { id: "dh7", e: "❤️", d: "1.8s" },
  { id: "dh8", e: "🥂", d: "2.1s" },
];

function PageItsADate() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(12% 0.04 260) 0%, oklch(16% 0.06 290) 50%, oklch(10% 0.04 260) 100%)",
      }}
    >
      <ConfettiRain />

      <div
        className="relative z-10 text-center max-w-lg mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.8)",
          transition:
            "opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          style={{
            fontSize: "5rem",
            marginBottom: "0.5rem",
            animation:
              "celebration-pop 0.8s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          🎊
        </div>

        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(3rem, 12vw, 6rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "0.3rem",
          }}
        >
          <span className="shimmer-text">IT&apos;S A DATE!</span>
        </h1>

        <h2
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          <span className="shimmer-text">8PM TONIGHT! 🕗</span>
        </h2>

        <div
          className="text-4xl mb-6 animate-bounce-btn"
          style={{ animationDuration: "1s" }}
        >
          🎊🎉🥂🎊
        </div>

        <div
          style={{
            background: "oklch(18% 0.08 290 / 0.7)",
            borderRadius: "24px",
            border: "2px solid oklch(72% 0.22 45 / 0.4)",
            padding: "2rem",
            marginBottom: "1.5rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.3rem, 4vw, 1.9rem)",
              color: "white",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Tonight at 8PM 🕗🍽️
          </p>
          <p
            style={{
              fontFamily: "Figtree, sans-serif",
              fontSize: "1.1rem",
              color: "oklch(82% 0.14 45)",
              marginBottom: "0.5rem",
            }}
          >
            Your wife is SO happy right now 🥺❤️
          </p>
          <p
            style={{
              fontFamily: "Figtree, sans-serif",
              fontSize: "0.95rem",
              color: "oklch(68% 0.06 260)",
              fontStyle: "italic",
            }}
          >
            (She may or may not have been planning this for a week 😅)
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, oklch(30% 0.15 15 / 0.6), oklch(30% 0.15 320 / 0.6))",
            borderRadius: "20px",
            border: "1px solid oklch(60% 0.18 15 / 0.4)",
            padding: "1.5rem 2rem",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.1rem",
              color: "white",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            See you tonight, Vipul. 💌
            <br />
            <span style={{ color: "oklch(82% 0.20 15)" }}>
              She loves you endlessly ❤️
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap" aria-hidden="true">
          {DATE_HEARTS_DATA.map(({ id, e, d }) => (
            <span
              key={id}
              className="animate-float-heart"
              style={{ fontSize: "1.8rem", animationDelay: d }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
const PAGES = [
  PageIntro,
  PageQuizDate,
  PageQuizLove,
  PageQuizLucky,
  PageBigQuestion,
  PageItsADate,
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayPage, setDisplayPage] = useState(0);

  const goToNext = () => {
    if (animating || currentPage >= PAGES.length - 1) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
      setAnimating(false);
    }, 400);
  };

  const PageComponent = PAGES[displayPage];

  return (
    <>
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? "translateY(-20px) scale(0.98)"
            : "translateY(0) scale(1)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          minHeight: "100vh",
        }}
      >
        <PageComponent onNext={goToNext} />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(20% 0.08 15)",
            color: "white",
            border: "2px solid oklch(60% 0.22 15)",
            borderRadius: "16px",
            fontSize: "1rem",
          },
        }}
      />
    </>
  );
}
