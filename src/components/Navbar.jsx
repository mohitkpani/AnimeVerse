import { NavLink } from "react-router";
import { Sparkles, House, PlayCircle, BookOpen, Heart } from "lucide-react";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <NavLink to="/" className="logo" end>
                <span className="logo-anime">ANIME</span>
                <span className="logo-verse">VERSE</span>
                <img
                    src="/image.svg"
                    alt=""
                    className="logo-symbol"
                />
            </NavLink>

            <nav className="nav-links">
                <NavLink to="/" end>
                    <House size={16} /> Home
                </NavLink>
                <NavLink to="/watch-anime">
                    <PlayCircle size={16} /> Watch Anime
                </NavLink>
                <NavLink to="/comics">
                    <BookOpen size={16} /> Comics
                </NavLink>
                <NavLink to="/watchlist">
                    <Heart size={16} /> Watchlist
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
