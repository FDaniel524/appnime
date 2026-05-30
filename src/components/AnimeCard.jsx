function AnimeCard({ anime, onToggleFavorite, favoritos }) {
  const isFavorite = favoritos.some((fav) => fav.mal_id === anime.mal_id);

  return (
    <div className="anime-item">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="anime-image"
      />
      <p className="anime-title">{anime.title}</p>
      <p className="anime-genre">
        {anime.genres?.map((genre) => genre.name).join(", ")}
      </p>
      <p className="anime-score">Score: {anime.score}</p>
      <img
        src={isFavorite ? "favorite-on.png" : "favorite-off.png"}
        alt="Add favorite"
        className="favorite-icon"
        onClick={() => onToggleFavorite(anime)}
      />
    </div>
  );
}

export default AnimeCard;
