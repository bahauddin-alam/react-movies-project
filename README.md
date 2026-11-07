# 🎬 React Movie App

A movie discovery application built with **React and Vite**, powered by The Movie Database (TMDB) API. Browse popular movies, search for your favourite titles, and save movies to your personal favorites collection.

## ✨ Features

- **Discover Movies** – Browse popular movies using the TMDB API.
- **Search Movies** – Find movies by title.
- **Favorites** – Add and remove movies from your favorites.
- **Persistent Storage** – Favorites remain saved after refreshing the browser using Local Storage.
- **React Context API** – Share and manage favorites state across components.
- **Client-side Routing** – Navigate between Home and Favorites pages without reloading.
- **Responsive UI** – A movie browsing interface built with custom CSS.

## 🛠️ Tech Stack

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| React            | UI development                    |
| Vite             | Development server and build tool |
| JavaScript       | Application logic                 |
| React Router DOM | Client-side routing               |
| Context API      | Global state management           |
| Local Storage    | Persistent favorites              |
| CSS              | Styling                           |
| TMDB API         | Movie data and posters            |

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

### 2. Navigate to the project

```bash
cd REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Get your API key from [TMDB](https://www.themoviedb.org/settings/api).

**Note:** Never commit your actual `.env` file. It is excluded through `.gitignore`. Vite exposes `VITE_` variables in frontend code, so use a backend proxy if you need to keep an API key genuinely private.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 📁 Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   └── NavBar.jsx
│   ├── contexts/
│   │   └── MovieContext.jsx
│   ├── css/
│   │   ├── App.css
│   │   ├── Favorites.css
│   │   ├── Home.css
│   │   ├── MovieCard.css
│   │   ├── Navbar.css
│   │   └── index.css
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   └── Home.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
└── vite.config.js
```

## 📡 API

Movie information is fetched from the [TMDB API](https://developer.themoviedb.org/docs).

Endpoints used:

- Popular Movies: `/movie/popular`
- Search Movies: `/search/movie`

Movie poster images are served by TMDB's image service.

## 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## 🎯 Learning Goals

This project is part of my journey into frontend development. Through this project, I am practising:

- React components and props
- State management with useState
- Side effects with useEffect
- React Context API
- React Router
- Working with REST APIs and fetch
- Async/await and error handling
- Browser Local Storage
- Environment variables
- Git and GitHub

## 🙌 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for movie data and images.
- [React](https://react.dev/) for the UI library.
- [Vite](https://vite.dev/) for the development tooling.

---

**Built with ❤️ while learning React.**
