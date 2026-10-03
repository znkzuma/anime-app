import { useEffect, useState } from "react";
import { getTrending, searchAnime } from "./api/anilist";
import AnimeCard from "./components/AnimeCard";
import "./App.css";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    load(getTrending);
  }, []);

  async function load(fetcher, arg) {
    setLoading(true);
    setError("");
    try {
      setAnimeList(await fetcher(arg));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim()) load(searchAnime, search);
    else load(getTrending);
  }

  return (
    <div className="app">
      <h1>Anime Finder</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anime..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {animeList.map((a) => (
          <AnimeCard key={a.id} anime={a} />
        ))}
      </div>
    </div>
  );
}