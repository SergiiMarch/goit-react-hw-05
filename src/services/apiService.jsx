import axios from "axios";

const API_KEY = "4a426ee75bada2fcc6c99565be1e4865";
const BASE_URL = "https://api.themoviedb.org/3";

// Отримання популярних фільмів
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

// Отримання деталей фільму
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return response.data;
};

// Пошук фільмів за ключовим словом
export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      include_adult: false,
      language: "en-US",
    },
  });
  return response.data.results;
};

// Отримання акторського складу фільму
export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

// Отримання оглядів фільму
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  return response.data;
};
