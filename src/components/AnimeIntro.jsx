
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import "./AnimeIntro.css";

function AnimeIntro({ onFinish, onEntryComplete }) {
    const reduceMotion = useReducedMotion();
    const finishRef = useRef(onFinish);
    const entryCompleteRef = useRef(onEntryComplete);
    const finishedRef = useRef(false);

    useEffect(() => {
        finishRef.current = onFinish;
        entryCompleteRef.current = onEntryComplete;
    }, [onFinish, onEntryComplete]);

    useEffect(() => {
        const audio = new Audio("/sounds/entry.mp3");
        audio.preload = "auto";
        audio.volume = 0.6;

        let disposed = false;
        let started = false;

        const removeListeners = () => {
            document.removeEventListener("pointerdown", playEntry);
            document.removeEventListener("keydown", playEntry);
        };

        const handleEnded = () => {
            if (disposed) return;

            removeListeners();
            entryCompleteRef.current?.();
            finishRef.current?.();
        };

        async function playEntry() {
            if (disposed || started) return;

            try {
                await audio.play();

                if (disposed) {
                    audio.pause();
                    return;
                }

                started = true;
                removeListeners();
            } catch (error) {
                console.log("Entry audio could not start yet:", error);
            }
        }

        audio.addEventListener("ended", handleEnded);

        document.addEventListener("pointerdown", playEntry);
        document.addEventListener("keydown", playEntry);

        // Try autoplay; if blocked, retry after a user gesture.
        playEntry();

        return () => {
            disposed = true;
            removeListeners();
            audio.removeEventListener("ended", handleEnded);
            audio.pause();
            audio.src = "";
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!finishedRef.current) {
                finishedRef.current = true;
                finishRef.current?.();
            }
        }, reduceMotion ? 1800 : 6500);

        return () => clearTimeout(timer);
    }, [reduceMotion]);

    const skipIntro = () => {
        if (finishedRef.current) return;

        finishedRef.current = true;
        finishRef.current?.();
    };

    return (
        <motion.div
            className="anime-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.6 }}
        >
            <button className="intro-skip" onClick={skipIntro}>
                Skip Intro <span>→</span>
            </button>

            <div className="intro-stars" />
            <div className="intro-energy energy-one" />
            <div className="intro-energy energy-two" />

            <motion.div
                className="intro-logo"
                initial={{ opacity: 0, scale: 0.5, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Sparkles size={25} />
                <h1>ANIME<span>VERSE</span></h1>
                <p>YOUR NEXT ADVENTURE STARTS HERE</p>
            </motion.div>

            <motion.div
                className="intro-mascot"
                initial={reduceMotion ? { opacity: 1 } : { y: 450, opacity: 0, rotate: -12 }}
                animate={
                    reduceMotion
                        ? { opacity: 1 }
                        : {
                            y: [450, -25, 0, -8, 0, 0, -15, -450],
                            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                            rotate: [-12, 5, 0, -3, 0, 0, 8, 18],
                        }
                }
                transition={{
                    duration: 6.1,
                    times: [0, 0.18, 0.25, 0.31, 0.37, 0.7, 0.82, 1],
                    ease: "easeInOut",
                }}
            >
                <div className="mascot-aura" />
                <img
                    className="mascot-image"
                    src="/AnimeVerse_%20Neon%20Portal%20Awakening.png"
                    alt="AnimeVerse mascot"
                />
                <motion.div
                    className="mascot-gesture"
                    animate={reduceMotion ? {} : { rotate: [0, -18, 18, 0] }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                >
                    ✌️
                </motion.div>
                <div className="mascot-name">VERSE</div>
            </motion.div>

            <motion.div
                className="intro-speech"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 2.1, duration: 0.4 }}
            >
                <Zap size={18} /> HEY, ANIME LOVER!
                <span>Ready to enter my world?</span>
            </motion.div>

            <motion.div
                className="intro-bottom"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <span className="intro-dot" />
                POWERING UP YOUR UNIVERSE...
            </motion.div>
        </motion.div>
    );
}

export default AnimeIntro;
