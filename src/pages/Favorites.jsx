import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Favorites.css";
import "../css/Home.css";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {favorites.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

export default Favorites;
