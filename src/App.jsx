import { useState, useEffect } from "react";
import AnimeCard from "./components/AnimeCard";
import "./App.css";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const handleFavoritos = (anime) => {
    const isFavorite = favoritos.some((fav) => fav.mal_id === anime.mal_id);
    if (isFavorite) {
      setFavoritos((prev) => prev.filter((fav) => fav.mal_id !== anime.mal_id));
    } else {
      setFavoritos((prev) => [...prev, anime]);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    const obtenerAnime = async () => {
      try {
        setLoading(true);

        const respuesta = await fetch("https://api.jikan.moe/v4/top/anime");
        // Si la respuesta no es exitosa, lanza un error
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el anime");
        }

        const datos = await respuesta.json();

        setAnimeList(datos.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerAnime();
  }, []);
  //console.log(animeList);

  if (loading) {
    return (
      <div className="loading">
        <img src="cargando.gif" />
        <h1>Cargando monit@s...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <img src="error.gif" />
        <h1>Huh? algo no salió bien...</h1>
      </div>
    );
  }

  const listaFiltrada = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <div className="anime-header">
        <input
          placeholder="Buscar anime..."
          onChange={handleBusqueda}
          className="search-input"
          value={busqueda}
        />
        <h1>Tu Appnime</h1>
      </div>
      <section>
        {listaFiltrada.length === 0 && <p>No se encontraron resultados</p>}
        {listaFiltrada.map((anime) => (
          //Ya que necesito mapear otro obvjeto dentro del anime, le paso el anime completo como prop al componente AnimeCard
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onToggleFavorite={handleFavoritos}
            favoritos={favoritos}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
