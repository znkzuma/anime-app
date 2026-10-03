export default function AnimeCard({ anime }) {
  const title = anime.title.english || anime.title.romaji;

  return (
    <div className="card">
      <img src={anime.coverImage.large} alt={title} />
      <h3>{title}</h3>
      <p>
        ⭐ {anime.averageScore ?? "N/A"} · {anime.episodes ?? "?"} eps ·{" "}
        {anime.seasonYear ?? ""}
      </p>
      <small>{anime.genres.slice(0, 3).join(", ")}</small>
    </div>
  );
}