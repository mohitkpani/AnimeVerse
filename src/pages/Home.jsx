
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
    Play,
    Sparkles,
    Flame,
    ChevronRight,
    BookOpen,
} from "lucide-react";

function Home() {
    return (
        <>
            <section className="hero" id="home">
                <div className="hero-glow" />

                <div className="hero-content">
                    <span className="eyebrow">
                        <Flame size={17} /> YOUR NEXT OBSESSION
                    </span>

                    <h1>
                        ENTER THE
                        <br />
                        <span>ANIME</span> UNIVERSE
                    </h1>

                    <p>
                        Legendary heroes. Limitless worlds.
                        Your next adventure starts here.
                    </p>

                    <div className="hero-buttons">
                        <Link className="primary-button" to="/watch-anime">
                            <Play size={18} fill="currentColor" />
                            Discover Anime
                        </Link>

                        <Link className="secondary-button" to="/comics">
                            Explore Comics <ChevronRight size={18} />
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <strong>ANIME</strong>
                            <span>Discover worlds</span>
                        </div>
                        <div>
                            <strong>MANGA</strong>
                            <span>Explore stories</span>
                        </div>
                        <div>
                            <strong>YOUR LIST</strong>
                            <span>Save favorites</span>
                        </div>
                    </div>
                </div>

                <div className="comic-stamp">
                    UNLEASH
                    <br />
                    YOUR POWER!
                </div>

                <div className="hero-caption">
                    VOL. 01 — THE ADVENTURE BEGINS
                </div>
            </section>

            <section className="section">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">CHOOSE YOUR ADVENTURE</span>
                        <h2>
                            Enter the <span>Universe</span>
                        </h2>
                    </div>
                </div>

                <div className="comic-panels">
                    <motion.div
                        className="comic-panel panel-one"
                        whileHover={{ scale: 1.03 }}
                    >
                        <span>DISCOVER</span>
                        <strong>WATCH ANIME</strong>
                        <Play size={32} />
                        <Link to="/watch-anime" aria-label="Explore anime">
                            Explore anime <ChevronRight size={16} />
                        </Link>
                    </motion.div>

                    <motion.div
                        className="comic-panel panel-two"
                        whileHover={{ scale: 1.03 }}
                    >
                        <span>TURN THE PAGE</span>
                        <strong>EXPLORE MANGA!</strong>
                        <BookOpen size={32} />
                        <Link to="/comics" aria-label="Explore manga">
                            Explore manga <ChevronRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                <div className="home-watchlist-link">
                    <Sparkles size={20} />
                    <p>Build your personal anime collection.</p>
                    <Link to="/watchlist">Open my watchlist</Link>
                </div>
            </section>
        </>
    );
}

export default Home;
