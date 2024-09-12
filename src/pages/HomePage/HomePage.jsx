import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/apiService";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const results = await fetchTrendingMovies();
        setMovies(results);
        setError(null);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Error fetching movies. Please try again.");
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <div className={styles.divider}></div>
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
          <p>No trending movies found</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
