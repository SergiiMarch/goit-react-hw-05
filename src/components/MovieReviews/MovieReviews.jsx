import React, { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/apiService";
import styles from "./MovieReviews.module.css";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.reviewAuthor}>{review.author}</h3>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
