import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos";
import AnimeDetalle from "./pages/AnimeDetalle";

function App() {
  const [favoritos, setFavoritos] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home favoritos={favoritos} setFavoritos={setFavoritos} />}
      />

      <Route
        path="/favoritos"
        element={
          <Favoritos favoritos={favoritos} setFavoritos={setFavoritos} />
        }
      />

      <Route
        path="/anime/:id"
        element={<AnimeDetalle />}
        favoritos={favoritos}
        setFavoritos={setFavoritos}
      />
    </Routes>
  );
}

export default App;
