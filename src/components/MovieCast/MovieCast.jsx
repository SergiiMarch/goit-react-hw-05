import React, { useEffect, useState } from "react";
import { fetchMovieCast } from "../../services/apiService";
import styles from "./MovieCast.module.css";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImage}
            />
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.actorCharacter}>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
