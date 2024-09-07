import { useState } from "react";
import { searchMovies } from "../../services/apiService";
import { Link } from "react-router-dom";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Error fetching movies. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <div className={styles.divider}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.movieList}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li className={styles.movieItem} key={movie.id}>
              <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
                <h2 className={styles.movieTitle}>{movie.title}</h2>
              </Link>
            </li>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </div>
  );
};

export default MoviesPage;
