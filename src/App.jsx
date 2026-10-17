
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Link } from "react-router";

import Navbar from "./components/Navbar";
import AnimeIntro from "./components/AnimeIntro";
import GlobalClickSound from "./components/GlobalClickSound";

import Home from "./pages/Home";
import WatchAnime from "./pages/WatchAnime";
import Comics from "./pages/comics";
import Watchlist from "./pages/Watchlist";

import "./App.css";

function shouldShowIntro() {
  try {
    return sessionStorage.getItem("animeverse-intro-seen") !== "true";
  } catch {
    return true;
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  const backgroundAudio = useRef(null);
  const introFinished = useRef(false);
  const entryFinished = useRef(false);
  const musicStarted = useRef(false);

  // Create the background audio player once.
  useEffect(() => {
    const audio = new Audio("/sounds/background.mp3");

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.22;

    backgroundAudio.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      backgroundAudio.current = null;
    };
  }, []);

  // Start background music only after the intro/entry sequence.
  const startMusic = useCallback(async () => {
    const audio = backgroundAudio.current;

    if (!audio || musicStarted.current) return;

    musicStarted.current = true;

    try {
      await audio.play();
    } catch (error) {
      musicStarted.current = false;
      console.info(
        "The browser blocked background music. It will retry after interaction."
      );
    }
  }, []);

  // Entry song has ended naturally.
  const handleEntryComplete = useCallback(() => {
    entryFinished.current = true;
    startMusic();
  }, [startMusic]);

  // Skip Intro or finish the intro animation.
  const finishIntro = useCallback(() => {
    if (introFinished.current) return;

    introFinished.current = true;

    try {
      sessionStorage.setItem("animeverse-intro-seen", "true");
    } catch { }

    // If the entry song has not finished, skipping means move to background music.
    entryFinished.current = true;
    setShowIntro(false);
    startMusic();
  }, [startMusic]);

  // Retry background music on user interaction if autoplay was blocked.
  useEffect(() => {
    const retryMusic = () => {
      if (!introFinished.current || musicStarted.current) return;
      startMusic();
    };

    document.addEventListener("pointerdown", retryMusic);
    document.addEventListener("keydown", retryMusic);

    return () => {
      document.removeEventListener("pointerdown", retryMusic);
      document.removeEventListener("keydown", retryMusic);
    };
  }, [startMusic]);

  return (
    <div className="app">
      <GlobalClickSound />

      <AnimatePresence>
        {showIntro && (
          <AnimeIntro
            onFinish={finishIntro}
            onEntryComplete={handleEntryComplete}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch-anime" element={<WatchAnime />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/watchlist" element={<Watchlist />} />

        <Route
          path="*"
          element={
            <main className="section not-found">
              <h1>Page not found</h1>
              <Link to="/" className="primary-button">
                Return Home
              </Link>
            </main>
          }
        />
      </Routes>

      <footer className="site-footer">
        <Link to="/" className="logo">
          ANIME<span>VERSE</span>
        </Link>
        <p>Made for the love of anime.</p>
      </footer>
    </div>
  );
}

export default App;
