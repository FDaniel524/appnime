import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cabecera from "../components/Cabecera";

function AnimeDetalle() {
  const [anime, setAnime] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const obtenerAnime = async () => {
      const respuesta = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

      const datos = await respuesta.json();
      setAnime(datos.data);
    };
    obtenerAnime();
  }, [id]);

  if (!anime) {
    return <h1>Cargando detalle...</h1>;
  }

  return (
    <div className="anime-detalle">
      <Cabecera />
      <div
        className="hero"
        style={{
          backgroundImage: `url(${anime.images.jpg.large_image_url})`,
        }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <div className="poster">
            <img src={anime.images.webp.large_image_url} alt={anime.title} />
          </div>

          <div className="hero-info">
            <h1>{anime.title}</h1>
            <p>⭐ {anime.score}</p>
            <p>{anime.genres?.map((genre) => genre.name).join(" • ")}</p>
            <p>{anime.status}</p>
            <p>Episodios: {anime.episodes}</p>
            <p>{anime.year}</p>
          </div>
        </div>
        <div className="sinopsis">
          <p>{anime.synopsis}</p>
        </div>

        <div className="extra-info">
          <p>Score: {anime.score}</p>
          <p>Estado: {anime.status}</p>
          <p>Año: {anime.year}</p>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetalle;
