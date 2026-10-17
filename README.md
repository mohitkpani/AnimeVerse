# 🎌 AnimeVerse — Modern Anime Universe

**Discover anime, explore manga, and build your personal watchlist — all in one place!**

AnimeVerse is a responsive anime-themed web application built with React. It features an immersive anime-inspired interface, manga discovery, favorites, animated UI elements, and background audio for a more engaging experience.

🔗 **Live Demo:** [AnimeVerse — Modern Anime Universe](https://mohit-animeverse.netlify.app/)

📂 **GitHub Repository:** [mohitkpani/AnimeVerse](https://github.com/mohitkpani/AnimeVerse)

---

## ✨ Features

- 🎨 **Anime-Inspired UI** — Bold colors, immersive backgrounds, and a modern anime aesthetic.
- 🏠 **Home Page** — Explore the AnimeVerse universe through an engaging landing page.
- 🎬 **Watch Anime** — Dedicated page for exploring anime content.
- 📚 **Manga Discovery** — Browse popular manga and search for titles.
- ❤️ **Favorites System** — Save your favorite manga using the heart button.
- 📋 **Personal Watchlist** — Access your saved collection.
- 🔍 **Manga Search** — Search for manga by title.
- 🎵 **Background Music** — Intro music, looping background audio, and click sound effects.
- ✨ **Animations** — Smooth UI animations using Framer Motion.
- 📱 **Responsive Design** — Designed to work on desktop and mobile screens.
- 🧭 **Client-Side Routing** — Navigate between pages using React Router.

## 🛠️ Tech Stack

| Technology    | Purpose                                    |
| ------------- | ------------------------------------------ |
| React         | Component-based user interface             |
| Vite          | Development server and production build    |
| JavaScript    | Application logic and interactivity        |
| HTML5         | Application structure                      |
| CSS3          | Styling and responsive layouts             |
| React Router  | Client-side navigation                     |
| Framer Motion | UI animations                              |
| Lucide React  | Icons                                      |
| Manga API     | Manga search and discovery                 |
| Local Storage | Persist manga favorites in the browser     |
| Netlify       | Deployment and hosting                     |
| Git & GitHub  | Version control and source code management |

## 📸 Application Pages

### 🏠 Home

Discover the AnimeVerse universe with an immersive hero section and navigation to the main features.

### 🎬 Watch Anime

Explore the anime section through a dedicated page.

### 📚 Comics

Discover popular manga, search for titles, view ratings and descriptions, and save favorites.

### ❤️ Watchlist

Access your saved collection of anime and manga.

## 🚀 Run Locally

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/mohitkpani/AnimeVerse.git
```

**2. Navigate to the project directory**

```bash
cd AnimeVerse
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

## 🏗️ Production Build

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The generated production files are stored in the `dist` directory.

## 📁 Project Structure

```text
AnimeVerse/
├── public/
│   └── sounds/
│       ├── background.mp3
│       ├── click.mp3
│       └── entry.mp3
├── src/
│   ├── components/
│   │   ├── AnimeIntro.jsx
│   │   ├── AnimeIntro.css
│   │   ├── GlobalClickSound.jsx
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── WatchAnime.jsx
│   │   ├── comics.jsx
│   │   └── Watchlist.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🌐 Deployment

AnimeVerse is deployed using Netlify and connected to GitHub for source control.

**Live Website:** https://mohit-animeverse.netlify.app/

Updates pushed to the connected GitHub branch can trigger a new Netlify deployment.

## 🎯 Project Goals

- Build a visually engaging anime-themed web application.
- Practice React components, hooks, state management, and routing.
- Work with an external API to retrieve manga information.
- Implement browser-based favorites using Local Storage.
- Improve responsive design and frontend development skills.
- Learn the workflow of deploying and maintaining a live web application.

## 🔮 Future Improvements

- Improve manga API reliability and loading states.
- Add more detailed anime discovery features.
- Improve mobile navigation and layout.
- Enhance the shared anime and manga watchlist.
- Add more personalization options.
- Improve mobile audio playback behavior.

## 👨‍💻 Author

**Mohit Kumar Pani**

- GitHub: [@mohitkpani](https://github.com/mohitkpani)
- Project: [AnimeVerse](https://github.com/mohitkpani/AnimeVerse)
- Live Demo: [mohit-animeverse.netlify.app](https://mohit-animeverse.netlify.app/)

---

⭐ If you like this project, consider giving the repository a star!

_Made with ❤️ for anime and manga lovers._
