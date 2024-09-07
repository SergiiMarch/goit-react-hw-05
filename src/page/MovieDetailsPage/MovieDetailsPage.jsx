import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { fetchMovieDetails } from "../../services/apiService";
import styles from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const from = location.state?.from ?? "/movies";

  return (
    <div className={styles.container}>
      <Link to={from} className={styles.goBack}>
        Go back
      </Link>
      {movie && (
        <div className={styles.movieDetails}>
          <h1 className={styles.movieTitle}>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
          <p className={styles.movieOverview}>{movie.overview}</p>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <MovieCast movieId={movieId} />
        <MovieReviews movieId={movieId} />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
