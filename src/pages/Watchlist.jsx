
import { useState } from "react";
import { Link } from "react-router";
import {
    Heart,
    Trash2,
    ChevronRight,
    PlayCircle,
    BookOpen,
} from "lucide-react";

const ANIME_KEY = "animeverse-favorites";
const MANGA_KEY = "animeverse-manga-favorites";

function readStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
        return [];
    }
}

function Watchlist() {
    const [animeFavorites, setAnimeFavorites] = useState(() =>
        readStorage(ANIME_KEY)
    );

    const [mangaFavorites, setMangaFavorites] = useState(() =>
        readStorage(MANGA_KEY)
    );

    const removeAnime = (id) => {
        const updated = animeFavorites.filter((item) => item.id !== id);
        localStorage.setItem(ANIME_KEY, JSON.stringify(updated));
        setAnimeFavorites(updated);
    };

    const removeManga = (id) => {
        const updated = mangaFavorites.filter((item) => item.id !== id);
        localStorage.setItem(MANGA_KEY, JSON.stringify(updated));
        setMangaFavorites(updated);
    };

    const renderCards = (items, type, removeItem) => (
        <div className="anime-grid">
            {items.map((item) => (
                <article className="anime-card" key={item.id}>
                    <div className="anime-image">
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                            />
                        )}

                        <span className="card-genre">
                            {type === "anime" ? item.genre || "Anime" : item.type || "Manga"}
                        </span>
                    </div>

                    <div className="anime-info">
                        <h3>{item.title}</h3>

                        {item.score != null && <p>⭐ {item.score} / 10</p>}

                        <div className="watchlist-actions">
                            <a
                                href={
                                    type === "anime"
                                        ? item.trailerUrl ||
                                        `https://myanimelist.net/anime/${item.id}`
                                        : `https://myanimelist.net/manga/${item.id}`
                                }
                                target="_blank"
                                rel="noreferrer"
                            >
                                {type === "anime" ? "View anime" : "View manga"}
                                <ChevronRight size={15} />
                            </a>

                            <button
                                className="remove-favorite"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.title}`}
                            >
                                <Trash2 size={16} /> Remove
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );

    const totalFavorites = animeFavorites.length + mangaFavorites.length;

    return (
        <main className="section watchlist-page">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">SAVED BY YOU</span>
                    <h1>
                        My <span>Watchlist</span>
                    </h1>
                </div>

                <span className="section-note">
                    <Heart size={17} /> {totalFavorites} SAVED
                </span>
            </div>

            {totalFavorites === 0 ? (
                <div className="watchlist-empty">
                    <Heart size={42} />
                    <h2>Your Watchlist is empty</h2>
                    <p>
                        Save anime and manga by tapping the heart on their cards.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/watch-anime" className="primary-button">
                            <PlayCircle size={18} /> Discover Anime
                        </Link>

                        <Link to="/comics" className="secondary-button">
                            <BookOpen size={18} /> Explore Manga
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <section className="watchlist-section">
                        <div className="section-heading">
                            <div>
                                <span className="eyebrow">YOUR FAVORITES</span>
                                <h2>
                                    Anime <span>Wishlist</span>
                                </h2>
                            </div>
                            <span className="section-note">
                                {animeFavorites.length} SAVED
                            </span>
                        </div>

                        {animeFavorites.length > 0 ? (
                            renderCards(animeFavorites, "anime", removeAnime)
                        ) : (
                            <p className="empty-state">
                                No anime saved yet.{" "}
                                <Link to="/watch-anime">Discover anime</Link>
                            </p>
                        )}
                    </section>

                    <section className="watchlist-section">
                        <div className="section-heading">
                            <div>
                                <span className="eyebrow">YOUR READING LIST</span>
                                <h2>
                                    Manga <span>Wishlist</span>
                                </h2>
                            </div>
                            <span className="section-note">
                                {mangaFavorites.length} SAVED
                            </span>
                        </div>

                        {mangaFavorites.length > 0 ? (
                            renderCards(mangaFavorites, "manga", removeManga)
                        ) : (
                            <p className="empty-state">
                                No manga saved yet.{" "}
                                <Link to="/comics">Explore manga</Link>
                            </p>
                        )}
                    </section>
                </>
            )}
        </main>
    );
}

export default Watchlist;
