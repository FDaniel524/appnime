import { useState, useEffect } from "react";
import Cabecera from "../components/Cabecera";
import AnimeCard from "../components/AnimeCard";

function Favoritos({ favoritos, setFavoritos }) {
  const [localFavoritos, setLocalFavoritos] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleFavoritos = (anime) => {
    const isFavorite = favoritos.some((fav) => fav.mal_id === anime.mal_id);
    if (isFavorite) {
      setFavoritos((prev) => prev.filter((fav) => fav.mal_id !== anime.mal_id));
    } else {
      setFavoritos((prev) => [...prev, anime]);
    }
  };

  return (
    <div>
      <Cabecera />
      <section>
        {favoritos.length === 0 ? (
          <p>
            No tienes animes favoritos aún. ¡Agrega algunos desde la página de
            inicio!
          </p>
        ) : (
          favoritos.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              favoritos={favoritos}
              onToggleFavorite={handleFavoritos}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default Favoritos;
