import { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import Cabecera from "../components/Cabecera";

function Home({ favoritos, setFavoritos }) {
  //Estado para almacenar la lista de animes, el estado de carga, el error y la búsqueda
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Estado para almacenar el valor de búsqueda
  const [busqueda, setBusqueda] = useState("");

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
  console.log(animeList);

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
      <Cabecera>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar anime..."
            onChange={handleBusqueda}
            className="search-input"
            value={busqueda}
          />
          <img
            src="borrar.png"
            alt="Clear search"
            className="search-delete"
            onClick={() => setBusqueda("")}
          />
        </div>
      </Cabecera>
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

export default Home;
