
"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Flag,
  Heart,
  Moon,
  Pause,
  Play,
  Sparkles,
  X,
  Orbit,
  WandSparkles,
} from "lucide-react";

const characters = [
  {
    name: "Jinx",
    universe: "ARCANE / ZAUN",
    hint: "beautifully unpredictable",
    color: "lilac",
    symbol: "✦",
    note: "A little chaos can still make something unforgettable.",
    image:
      "https://img.goodfon.com/original/2224x1668/8/51/arcane-league-of-legends-tv-series-animated-television-serie.jpg",
    position: "20% 28%",
  },
  {
    name: "Vi",
    universe: "ARCANE / ZAUN",
    hint: "a heart in armor",
    color: "rose",
    symbol: "✧",
    note: "Softness can survive even when the world asks you to be tough.",
    image:
      "https://img.goodfon.com/original/2224x1668/8/51/arcane-league-of-legends-tv-series-animated-television-serie.jpg",
    position: "40% 28%",
  },
  {
    name: "Caitlyn Kiramman",
    universe: "ARCANE / PILTOVER",
    hint: "quiet precision",
    color: "blue",
    symbol: "⌖",
    note: "Curiosity, conviction, and the courage to look closer.",
    image:
      "https://img.goodfon.com/original/2224x1668/8/51/arcane-league-of-legends-tv-series-animated-television-serie.jpg",
    position: "60% 25%",
  },
  {
    name: "Mel Medarda",
    universe: "ARCANE / PILTOVER",
    hint: "art in every detail",
    color: "gold",
    symbol: "☼",
    note: "Grace can be strategic, and beauty can be a kind of power.",
    image:
      "https://img.goodfon.com/original/2224x1668/8/51/arcane-league-of-legends-tv-series-animated-television-serie.jpg",
    position: "76% 28%",
  },
  {
    name: "Ambessa Medarda",
    universe: "ARCANE / NOXUS",
    hint: "unyielding force",
    color: "rose",
    symbol: "♜",
    note: "A reminder of the strength it takes to stand your ground.",
    image:
      "https://img.goodfon.com/original/2224x1668/8/51/arcane-league-of-legends-tv-series-animated-television-serie.jpg",
    position: "90% 25%",
  },
  {
    name: "Sevika",
    universe: "ARCANE / ZAUN",
    hint: "made of resolve",
    color: "plum",
    symbol: "⚡",
    note: "Never easy to define, never easy to break.",
    image:
      "https://img.goodfon.com/original/2224x1668/8/51/arcane-league-of-legends-tv-series-animated-television-serie.jpg",
    position: "50% 55%",
  },
  {
    name: "Atom Eve",
    universe: "INVINCIBLE",
    hint: "a bright kind of strength",
    color: "rose",
    symbol: "✧",
    note: "Power, heart, and choosing what kind of person to be.",
    image: "https://wallpapercave.com/wp/wp9420779.png",
    position: "center 20%",
  },
  {
    name: "Hermione Granger",
    universe: "HARRY POTTER",
    hint: "curiosity is a superpower",
    color: "gold",
    symbol: "⌘",
    note: "Knowledge, courage, and a little bit of magic.",
    image:
      "https://4.bp.blogspot.com/-tBgqUyUkC88/TmgS2kxHieI/AAAAAAAAALs/7jEAm3S6kN4/s1600/Hermione_Granger_%2528HBP_promo%2529_4.jpg",
    position: "center 22%",
  },
  {
    name: "SZA",
    universe: "MUSIC / CTRL",
    hint: "feel everything, honestly",
    color: "plum",
    symbol: "♫",
    note: "For feelings too big to fit into ordinary words.",
    image:
      "https://media.losandes.com.ar/adjuntos/368/migration/resizer/v2/7NMWY4436ZADHEUIITFLBTJ7JA.jpg?auth=d104742465de3b766b5077ad5f7d5afa07a1ba1dad70d0765586c15e2c4bce99&height=1067&width=1600",
    position: "center 22%",
  },
  {
    name: "Pam Beesly",
    universe: "THE OFFICE",
    hint: "quietly unforgettable",
    color: "blue",
    symbol: "☼",
    note: "Warmth in ordinary days, and the courage to want more.",
    image:
      "https://cloudfront-us-east-1.images.arcpublishing.com/thedailybeast/DDOKNBJC5ZBKJATZ3UI4BLUYUI.jpg",
    position: "center 22%",
  },
  {
    name: "Wednesday Addams",
    universe: "WEDNESDAY",
    hint: "beautifully unconventional",
    color: "plum",
    symbol: "☾",
    note: "Never be afraid to be a little different.",
    image: "/images/characters/wednesday.jpg",
    position: "center 20%",
  },
  {
    name: "Yor Forger",
    universe: "SPY × FAMILY",
    hint: "gentle, dangerous, unforgettable",
    color: "rose",
    symbol: "✦",
    note: "There is strength in protecting the people you love.",
    image: "/images/characters/yor.jpg",
    position: "center 20%",
  },
  {
    name: "Makima",
    universe: "CHAINSAW MAN",
    hint: "mysterious composure",
    color: "gold",
    symbol: "⌖",
    note: "Some mysteries are best left intriguing.",
    image: "/images/characters/makima.jpg",
    position: "center 20%",
  },
  {
    name: "Lara Croft",
    universe: "TOMB RAIDER",
    hint: "fearless explorer",
    color: "blue",
    symbol: "✧",
    note: "The best discoveries begin with curiosity.",
    image: "/images/characters/lara.jpg",
    position: "center 20%",
  },
  {
    name: "Misa Amane",
    universe: "DEATH NOTE",
    hint: "gothic charm",
    color: "lilac",
    symbol: "♡",
    note: "Make your presence impossible to forget.",
    image: "/images/characters/misa.jpg",
    position: "center 20%",
  },
];
const novemberPeople = [
  {
    name: "Emma Stone",
    date: "NOV 06",
    detail: "ACTRESS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-4V1X6YcLvUo1w6LCOmicn0aLbmf9ecIhtbX1iDZjg&s=10",
    symbol: "✦",
  },
  {
    name: "Leonardo DiCaprio",
    date: "NOV 11",
    detail: "ACTOR",
    image: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    symbol: "✧",
  },
  {
    name: "Anne Hathaway",
    date: "NOV 12",
    detail: "ACTRESS",
    image: "https://image.tmdb.org/t/p/w500/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg",
    symbol: "☾",
  },
  {
    name: "SZA",
    date: "NOV 08",
    detail: "MUSICIAN",
    image:
      "https://media.losandes.com.ar/adjuntos/368/migration/resizer/v2/7NMWY4436ZADHEUIITFLBTJ7JA.jpg?auth=d104742465de3b766b5077ad5f7d5afa07a1ba1dad70d0765586c15e2c4bce99&height=1067&width=1600",
    symbol: "♫",
  },
  {
    name: "Miley Cyrus",
    date: "NOV 23",
    detail: "MUSICIAN",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRe3wYJ6qzbRGlDdGU34KlSO0P56NDJkHW2bmvtLckw&s=10",
    symbol: "♡",
  },
  {
    name: "Billie Eilish",
    date: "DEC 18",
    detail: "MUSICIAN",
    image: "",
    symbol: "✧",
  },
];

const stars = Array.from({ length: 110 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 61 + 7) % 100}%`,
  delay: (i % 9) * 0.32,
  duration: 2.5 + (i % 5) * 0.8,
  size: i % 7 === 0 ? 3 : 1.5,
}));

export default function Home() {
  const [answerGate, setAnswerGate] = useState(true);
  const [noMessage, setNoMessage] = useState(false);
  const [entered, setEntered] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicMissing, setMusicMissing] = useState(false);
  const [secretFound, setSecretFound] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setMusicMissing(false);
    } catch {
      setMusicMissing(true);
    }
  };

  const enterUniverse = async () => {
    setEntered(true);
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.42;
      await audio.play();
      setPlaying(true);
      setMusicMissing(false);
    } catch {
      setMusicMissing(true);
    }
  };

  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <main>
      {/* Opening question */}
      <AnimatePresence mode="wait">
        {answerGate && (
          <motion.div
            key="answer-gate"
            className="answer-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            <motion.div
              className="answer-gate-card"
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="gate-star">✦</span>
              <p className="gate-eyebrow">ANSWER AND YOU CAN MOVE ON</p>

              <h2>
                <span>Barcelona</span> is better than Madrid
                <br />
                Max is better than Lewis
                <br />
                وأنا أفضل إنسان عرفتيه في حياتك
              </h2>

              <p className="gate-description">Shall we open it?</p>

              {noMessage ? (
                <motion.p
                  className="gate-no-message"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Nuh Uh, dummy. Try that again. ✨
                </motion.p>
              ) : (
                <div className="gate-buttons">
                  <button
                    className="gate-yes"
                    onClick={() => setAnswerGate(false)}
                  >
                    YES ✨
                  </button>

                  <button
                    className="gate-no"
                    onClick={() => {
                      setNoMessage(true);
                      window.setTimeout(() => setNoMessage(false), 2200);
                    }}
                  >
                    No
                  </button>
                </div>
              )}

              <p className="gate-footer">✧ choose wisely ✧</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="scroll-progress"
        aria-hidden="true"
        style={{ scaleX: smoothScrollProgress }}
      />

      <audio
        ref={audioRef}
        src="/music/to-build-a-home.mp3"
        loop
        preload="auto"
        onError={() => setMusicMissing(true)}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div className="ambient" aria-hidden="true">
        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />

        {stars.map((s, i) => (
          <motion.i
            key={i}
            className="star-dot"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
            }}
            animate={
              reduceMotion
                ? {}
                : { opacity: [0.2, 1, 0.25], scale: [0.8, 1.5, 0.8] }
            }
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="cosmic-dust dust-one" />
        <div className="cosmic-dust dust-two" />
        <div className="cosmic-halo" />

        <motion.div
          className="shooting-star"
          animate={
            reduceMotion
              ? {}
              : {
                  x: ["-12vw", "112vw"],
                  y: ["0vh", "32vh"],
                  opacity: [0, 1, 0],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />
      </div>

      <header className="topbar">
        <a
          className="brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("home");
          }}
        >
          <span className="brand-mark">✳</span> S / ARCHIVE
        </a>

        <span className="topbar-note">
          A VERY SMALL UNIVERSE <span className="live-dot" />
        </span>

        <button
          className={`music-toggle ${playing ? "is-playing" : ""}`}
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
          <span>{playing ? "PAUSE" : "SOUND ON"}</span>
        </button>
      </header>

      <AnimatePresence>
        {!entered && (
          <motion.section
            className="intro-screen"
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            transition={{ duration: 1.1 }}
            id="home"
          >
            <div className="intro-orbit orbit-a" />
            <div className="intro-orbit orbit-b" />

            <motion.div
              className="intro-core"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span>✳</span>
            </motion.div>

            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A NOTE FROM SOMEWHERE IN THE COSMOS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.9, duration: 1.2 }}
            >
              To <em>Seraphic.</em>
            </motion.h1>

            <motion.p
              className="intro-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Some things are better discovered slowly.
            </motion.p>

            <motion.button
              className="enter-button"
              onClick={enterUniverse}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 }}
            >
              <span>ENTER THE UNIVERSE</span>
              <ArrowUpRight size={16} />
            </motion.button>

            <p className="intro-foot">BEST EXPERIENCED WITH THE LIGHTS LOW</p>
          </motion.section>
        )}
      </AnimatePresence>

      {entered && (
        <>
          {/* Hero and orbital character planet */}
          <section className="hero section-shell" id="home">
            <div className="hero-portrait-cloud" aria-hidden="true">
              <motion.img
                className="portrait-float portrait-one"
                src={characters[0].image}
                alt=""
                animate={reduceMotion ? {} : { y: [0, -16, 0], rotate: [-5, -2, -5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <motion.img
                className="portrait-float portrait-two"
                src={characters[6].image}
                alt=""
                animate={reduceMotion ? {} : { y: [0, 14, 0], rotate: [5, 2, 5] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <motion.img
                className="portrait-float portrait-three"
                src={characters[7].image}
                alt=""
                animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [3, 6, 3] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.1,
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <motion.span
                className="floating-rune rune-one"
                animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
              >
                ✧
              </motion.span>

              <motion.span
                className="floating-rune rune-two"
                animate={reduceMotion ? {} : { y: [0, 10, 0], rotate: [0, -18, 0] }}
                transition={{ duration: 9, repeat: Infinity }}
              >
                ☾
              </motion.span>
            </div>

            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="eyebrow">
                <Sparkles size={13} /> AN UNOFFICIAL ARCHIVE OF YOU
              </p>

              <h1>
                A universe
                <br />
                in <em>your</em> name.
              </h1>

              <p className="hero-lede">
                A few things you love. A few things worth keeping. And one
                tiny reminder that the world is more interesting with you in it.
              </p>

              <button className="text-link" onClick={() => scrollTo("planet-gallery")}>
                DISCOVER YOUR LITTLE UNIVERSE <ArrowDown size={15} />
              </button>
            </motion.div>

            <motion.div
              className="planet-scene"
              id="planet-gallery"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.2 }}
            >
              <div className="planet-ring ring-one" />
              <div className="planet-ring ring-two" />

              {/* Orbital path rings */}


              {/* Planet */}
              <motion.div
                className="planet"
                animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [0, 3, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="planet-shine" />
                <div className="planet-crater crater-one" />
                <div className="planet-crater crater-two" />
                <div className="planet-crater crater-three" />
              </motion.div>

              <motion.div
                className="planet-moon"
                animate={reduceMotion ? {} : { rotate: -360 }}
                transition={{
                  duration: 36,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span>✦</span>
              </motion.div>

              {/* Every character is placed at a different orbital angle */}
              {/* Smaller character portraits orbiting the planet */}


              <span className="planet-label label-top">
                FIG. 001 — HER LITTLE WORLD
              </span>
              <span className="planet-label label-bottom">
                DISTANCE: NOT VERY FAR
              </span>
            </motion.div>

            <div className="hero-index">
              <span>SCROLL TO EXPLORE</span>
              <span className="index-line" />
              <span>01 — 04</span>
            </div>
          </section>

          {/* Racing section */}
          <section className="racing-strip">
            <div className="racing-grid" />
            <div className="racing-content">
              <span className="eyebrow">
                <Flag size={13} /> A THOUGHT ABOUT SPEED
              </span>
              <p>
                Some people collect moments.
                <br />
                <em>Some chase the perfect line.</em>
              </p>
              <span className="racing-caption">
                PRECISION / INSTINCT / A LITTLE BIT OF CHAOS
              </span>
            </div>
            <motion.div
              className="speed-lines"
              animate={reduceMotion ? {} : { x: ["-8%", "8%", "-8%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span /><span /><span /><span /><span />
            </motion.div>
          </section>

          {/* Mechanical engineering section */}
          <section
            className="blueprint-scene section-shell"
            aria-label="Mechanical engineering constellation"
          >

{/* November birthdays */}
<section className="november-section section-shell" id="november">
  <div className="november-heading">
    <span className="eyebrow">
      <Sparkles size={13} /> THE ELEVENTH MONTH / A SPECIAL COLLECTION
    </span>

    <h2>
      People born in
      <br />
      <em>November.</em>
    </h2>

    <p>
      A little collection of people who arrived in this world
      during the month of autumn skies, deep thoughts, and
      beautiful contradictions.
    </p>
  </div>

  <div className="november-grid">
    {novemberPeople
      .filter((person) => person.date.startsWith("NOV"))
      .map((person, index) => (
        <motion.article
          key={person.name}
          className="november-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            delay: index * 0.1,
          }}
        >
          <div className="november-image-wrap">
            {person.image ? (
              <img
                src={person.image}
                alt={person.name}
                className="november-image"
                loading="lazy"
              />
            ) : (
              <div className="november-image-placeholder">
                {person.symbol}
              </div>
            )}

            <span className="november-date">{person.date}</span>
          </div>

          <div className="november-card-info">
            <span className="november-symbol">{person.symbol}</span>
            <h3>{person.name}</h3>
            <span className="november-detail">{person.detail}</span>
          </div>
        </motion.article>
      ))}
  </div>

  <div className="november-footer">
    <span>11 / 12</span>
    <span>AN ODE TO NOVEMBER SOULS</span>
    <span>✦</span>
  </div>
</section>

            <div className="blueprint-art" aria-hidden="true">
              <div className="blueprint-orbit orbit-large" />
              <div className="blueprint-orbit orbit-small" />
              <div className="blueprint-gear gear-one">✳</div>
              <div className="blueprint-gear gear-two">✧</div>

              <svg viewBox="0 0 360 250" role="presentation">
                <path d="M35 126 H105 L130 92 H220 L245 126 H325 M180 36 V214 M72 65 L125 95 M288 65 L235 95 M72 187 L125 157 M288 187 L235 157" />
                <circle cx="180" cy="126" r="54" />
                <circle cx="180" cy="126" r="30" />
                <circle cx="180" cy="126" r="8" />
              </svg>

              <span className="blueprint-label label-a">CURIOSITY / 001</span>
              <span className="blueprint-label label-b">
                EVERY PART HAS A PURPOSE
              </span>
            </div>

            <div className="blueprint-copy">
              <span className="eyebrow">
                <Orbit size={13} /> A SMALL STUDY IN HOW THINGS WORK
              </span>
              <h2>
                Wonder is a
                <br />
                <em>kind of engineering.</em>
              </h2>
              <p className="muted-copy">
                For the mind that wants to know what is inside the machine —
                and what else it could become. Even the universe has moving parts.
              </p>
              <div className="blueprint-microcopy">
                <span>MECHANISM</span>
                <i />
                <span>IMAGINATION</span>
                <i />
                <span>DISCOVERY</span>
              </div>
            </div>
          </section>

          {/* Birthday letter */}
          <section className="letter-section section-shell" id="letter">
            <div className="letter-stars" aria-hidden="true">
              ✦　·　✧　　·　✦　　·　✧
            </div>

            <span className="eyebrow">04 / SOMETHING TO KEEP</span>
            <h2>
              One last
              <br />
              <em>little thing.</em>
            </h2>
            <p className="letter-teaser">
              No grand speech. Just a small note, tucked somewhere in the stars.
            </p>

            <motion.button
              className="envelope"
              onClick={() => setLetterOpen(true)}
              whileHover={{ y: -6, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open the birthday letter"
            >
              <span className="envelope-seal">✳</span>
              <span className="envelope-label">To HADIL, ON HER DAY</span>
              <span className="envelope-open">
                OPEN LETTER <ArrowUpRight size={14} />
              </span>
            </motion.button>

            <p className="letter-foot">
              MADE WITH CARE, FROM ONE HUMAN TO ANOTHER.
            </p>
          </section>

          {/* Finale */}
          <section className="final-scene section-shell" id="finale">
            <div className="final-constellation" aria-hidden="true">
              <svg viewBox="0 0 600 360">
                <path d="M65 212 L145 94 L245 145 L315 52 L407 126 L500 82 L536 214 L420 270 L315 220 L205 282 L145 94 M245 145 L205 282 M407 126 L420 270 M315 52 L315 220" />
                <circle cx="65" cy="212" r="3" />
                <circle cx="145" cy="94" r="4" />
                <circle cx="245" cy="145" r="3" />
                <circle cx="315" cy="52" r="5" />
                <circle cx="407" cy="126" r="4" />
                <circle cx="500" cy="82" r="3" />
                <circle cx="536" cy="214" r="4" />
                <circle cx="420" cy="270" r="3" />
                <circle cx="315" cy="220" r="4" />
                <circle cx="205" cy="282" r="3" />
              </svg>
            </div>

            <motion.div
              className="final-copy"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1 }}
            >
              <span className="eyebrow">
                <WandSparkles size={13} /> END OF TRANSMISSION / BEGINNING OF EVERYTHING
              </span>

              <h2>
                May your next orbit
                <br />
                be <em>beautiful.</em>
              </h2>

              <p>
                More pages to fill. More things to understand. More songs that
                feel like home. More reasons to look up.
              </p>

              <strong>Happy birthday, Hadil.</strong>

              <button
                className="secret-star"
                onClick={() => setSecretFound((v) => !v)}
                aria-expanded={secretFound}
              >
                <Sparkles size={15} />
                {secretFound
                  ? "YOU FOUND THE LITTLE SECRET"
                  : "ONE LAST LITTLE SECRET"}
              </button>

              {secretFound && (
                <motion.p
                  className="secret-message"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Somewhere in all the possible universes, this one got a little
                  brighter because you exist. ✦
                </motion.p>
              )}
            </motion.div>
          </section>

          <footer className="footer">
            <a
              className="brand"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
            >
              <span className="brand-mark">✳</span> S / ARCHIVE
            </a>

            <span>THE UNIVERSE IS BIGGER WITH YOU IN IT.</span>
            <button onClick={() => scrollTo("home")}>
              BACK TO THE STARS ↑
            </button>
          </footer>
        </>
      )}

      {/* Birthday letter modal */}
      <AnimatePresence>
        {letterOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLetterOpen(false)}
          >
            <motion.div
              className="letter-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="letter-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ type: "spring", damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setLetterOpen(false)}
                aria-label="Close letter"
              >
                <X size={18} />
              </button>

              <span className="eyebrow">A NOTE, JUST FOR YOU</span>
              <div className="modal-star">✳</div>

              <h2 id="letter-title">
                Happy birthday,
                <br />
                <em>Hadil.</em>
              </h2>

              <div className="letter-body">
                <p>
                  I hope this next trip around the sun brings you more of the
                  things that make you feel like yourself: stories worth getting
                  lost in, ideas worth chasing, little mysteries that finally
                  make sense, and moments that make time slow down for a second.
                </p>
                <p>
                  Keep being curious about how things work, keep making room
                  for the worlds in your head, and keep finding your own line
                  through all the noise.
                </p>
                <p>
                  You&apos;re a genuinely lovely person to have in this world.
                  I hope today reminds you of that, in ways big and small.
                </p>
                <p className="letter-signoff">Have a beautiful birthday. ✦</p>
              </div>

              <button
                className="modal-done"
                onClick={() => setLetterOpen(false)}
              >
                KEEP THIS LITTLE NOTE <Heart size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="corner-note">
        <Moon size={12} /> MADE OF STARDUST & SMALL DETAILS
      </div>

      {musicMissing && (
        <span className="music-error" role="status">
          Music could not be loaded. Check public/music/to-build-a-home.mp3.
        </span>
      )}
    </main>
  );
}
