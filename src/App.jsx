import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import MoviesPage from "./page/MoviesPage/MoviesPage";
import MovieDetailsPage from "./page/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
