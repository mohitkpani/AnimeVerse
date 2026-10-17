
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
    BookOpen,
    ChevronRight,
    Search,
    Heart,
    Sparkles,
} from "lucide-react";

const API_BASE = "https://api.tenrai.org/v1";
const MANGA_KEY = "animeverse-manga-favorites";

function readMangaFavorites() {
    try {
        return JSON.parse(localStorage.getItem(MANGA_KEY) || "[]");
    } catch {
        return [];
    }
}

function Comics() {
    const [search, setSearch] = useState("");
    const [mangaList, setMangaList] = useState([]);
    const [favorites, setFavorites] = useState(readMangaFavorites);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError("");

                const endpoint = search.trim()
                    ? `${API_BASE}/manga?q=${encodeURIComponent(search.trim())}&limit=24`
                    : `${API_BASE}/top/manga?limit=24`;

                const response = await fetch(endpoint, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed (${response.status})`);
                }

                const result = await response.json();

                setMangaList(
                    (result.data || []).map((item) => ({
                        id: item.mal_id,
                        title: item.title_english || item.title,
                        image:
                            item.images?.jpg?.large_image_url ||
                            item.images?.jpg?.image_url ||
                            "",
                        score: item.score,
                        description:
                            item.synopsis || "Discover this manga adventure.",
                        type: item.type || "Manga",
                    }))
                );
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Couldn't load manga. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, 350);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search, retry]);

    const toggleFavorite = (manga) => {
        setFavorites((current) => {
            const exists = current.some((item) => item.id === manga.id);

            const updated = exists
                ? current.filter((item) => item.id !== manga.id)
                : [...current, manga];

            localStorage.setItem(MANGA_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <main className="section comics-page">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">BEYOND THE SCREEN</span>
                    <h1>
                        Manga <span>Universe</span>
                    </h1>
                </div>

                <span className="section-note">
                    <BookOpen size={17} /> TOP MANGA
                </span>
            </div>

            <p className="comics-intro">
                Discover manga stories, legendary heroes, and new worlds.
            </p>

            <label className="search-box anime-search">
                <Search size={18} />
                <input
                    type="search"
                    placeholder="Search manga..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </label>

            {/* Saved manga count and Watchlist link */}
            <div className="manga-wishlist-shortcut">
                <div className="manga-saved-count">
                    <Heart size={19} />
                    <span>
                        Saved manga: <strong>{favorites.length}</strong>
                    </span>
                </div>

                <Link to="/watchlist">View Watchlist</Link>
            </div>

            {loading && (
                <p className="empty-state">Loading manga library...</p>
            )}

            {error && (
                <div className="empty-state">
                    <p>{error}</p>
                    <button
                        className="primary-button"
                        onClick={() => setRetry((value) => value + 1)}
                    >
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && mangaList.length === 0 && (
                <p className="empty-state">
                    No manga found. Try another title.
                </p>
            )}

            {!loading && !error && (
                <div className="anime-grid">
                    {mangaList.map((manga, index) => {
                        const isFavorite = favorites.some(
                            (item) => item.id === manga.id
                        );

                        return (
                            <motion.article
                                className="anime-card"
                                key={manga.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: Math.min(index * 0.04, 0.4),
                                }}
                                whileHover={{ y: -7 }}
                            >
                                <div className="anime-image">
                                    {manga.image && (
                                        <img
                                            src={manga.image}
                                            alt={manga.title}
                                            loading="lazy"
                                        />
                                    )}

                                    <span className="card-genre">
                                        {manga.type}
                                    </span>

                                    <button
                                        className={`favorite-button ${isFavorite ? "favorited" : ""
                                            }`}
                                        onClick={() => toggleFavorite(manga)}
                                        aria-label={
                                            isFavorite
                                                ? `Remove ${manga.title} from wishlist`
                                                : `Add ${manga.title} to wishlist`
                                        }
                                        title={
                                            isFavorite
                                                ? "Remove from wishlist"
                                                : "Add to wishlist"
                                        }
                                    >
                                        <Heart
                                            size={19}
                                            fill={
                                                isFavorite
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />
                                    </button>
                                </div>

                                <div className="anime-info">
                                    <h3>{manga.title}</h3>

                                    {manga.score != null && (
                                        <p>⭐ {manga.score} / 10</p>
                                    )}

                                    <p>{manga.description}</p>

                                    <a
                                        href={`https://myanimelist.net/manga/${manga.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View manga <ChevronRight size={15} />
                                    </a>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            )}

            <div className="comics-reader-note">
                <Sparkles size={20} />
                <div>
                    <strong>Your manga collection</strong>
                    <p>
                        Tap the heart on any manga cover to save it to your
                        combined Watchlist.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Comics;
