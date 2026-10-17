
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Search, Heart, ChevronRight, Flame } from "lucide-react";

const API_BASE = "https://api.tenrai.org/v1";
const STORAGE_KEY = "animeverse-favorites";

function readFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function WatchAnime() {
    const [search, setSearch] = useState("");
    const [animeList, setAnimeList] = useState([]);
    const [favorites, setFavorites] = useState(readFavorites);
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
                    ? `${API_BASE}/anime?q=${encodeURIComponent(search.trim())}&limit=24`
                    : `${API_BASE}/top/anime?limit=24`;

                const response = await fetch(endpoint, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed (${response.status})`);
                }

                const result = await response.json();

                setAnimeList(
                    (result.data || []).map((item) => ({
                        id: item.mal_id,
                        title: item.title_english || item.title,
                        genre: item.genres?.[0]?.name || "Anime",
                        description:
                            item.synopsis || "An epic anime adventure awaits.",
                        image:
                            item.images?.jpg?.large_image_url ||
                            item.images?.jpg?.image_url ||
                            "",
                        score: item.score,
                        trailerUrl: item.trailer?.url || "",
                    }))
                );
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Couldn't load anime. Check your connection and retry.");
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

    const toggleFavorite = (anime) => {
        setFavorites((current) => {
            const exists = current.some((item) => item.id === anime.id);

            const updated = exists
                ? current.filter((item) => item.id !== anime.id)
                : [...current, anime];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <main className="section watch-anime-page">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">YOUR NEXT ADVENTURE</span>
                    <h1>
                        Watch <span>Anime</span>
                    </h1>
                </div>
                <span className="section-note">
                    <Flame size={17} /> FAN FAVORITES
                </span>
            </div>

            <label className="search-box anime-search">
                <Search size={18} />
                <input
                    type="search"
                    placeholder="Search Naruto, One Piece..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </label>

            {loading && <p className="empty-state">Loading anime...</p>}

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

            {!loading && !error && animeList.length === 0 && (
                <p className="empty-state">No anime found. Try another title.</p>
            )}

            {!loading && !error && (
                <div className="anime-grid">
                    {animeList.map((anime, index) => {
                        const isFavorite = favorites.some(
                            (item) => item.id === anime.id
                        );

                        return (
                            <motion.article
                                className="anime-card"
                                key={anime.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.04, 0.4) }}
                                whileHover={{ y: -7 }}
                            >
                                <div className="anime-image">
                                    {anime.image && (
                                        <img
                                            src={anime.image}
                                            alt={anime.title}
                                            loading="lazy"
                                        />
                                    )}

                                    <span className="card-genre">{anime.genre}</span>

                                    <button
                                        className={`favorite-button ${isFavorite ? "favorited" : ""
                                            }`}
                                        onClick={() => toggleFavorite(anime)}
                                        aria-label={`Favorite ${anime.title}`}
                                    >
                                        <Heart
                                            size={19}
                                            fill={isFavorite ? "currentColor" : "none"}
                                        />
                                    </button>
                                </div>

                                <div className="anime-info">
                                    <h3>{anime.title}</h3>
                                    {anime.score != null && <p>⭐ {anime.score} / 10</p>}
                                    <p>{anime.description}</p>

                                    <a
                                        href={
                                            anime.trailerUrl ||
                                            `https://myanimelist.net/anime/${anime.id}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {anime.trailerUrl ? "Watch trailer" : "View details"}
                                        <ChevronRight size={15} />
                                    </a>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            )}

            <p className="watchlist-hint">
                <Heart size={16} /> Your saved titles appear in your{" "}
                <Link to="/watchlist">Watchlist</Link>.
            </p>
        </main>
    );
}

export default WatchAnime;
