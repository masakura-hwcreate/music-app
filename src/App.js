import { useEffect, useState } from "react";
import { SongList } from "./components/SongList";
import spotify, { getToken } from "./lib/spotify";
import { SearchInput } from "./components/SearchInput";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchedSongs, setSearchedSongs] = useState();
  const isSearchedResult = searchedSongs != null;
  // const isSearchedResult = Array.isArray(searchedSongs) && searchedSongs.length > 0;
  
  useEffect(() => {
    fetchPopularSongs();
  }, []);

  const fetchPopularSongs = async () => {
    setIsLoading(true);
    const result = await spotify.getPopularSongs();
    const popularSongs = result.items.map((item) => {
      return item.track;
    });
    setPopularSongs(popularSongs)
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const searchSongs = async () => {
    setIsLoading(true);
    const result = await spotify.searchSongs(keyword);
    setSearchedSongs(result);
    console.log(searchSongs);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList 
            isLoading={isLoading}
            songs={ isSearchedResult ? searchedSongs : popularSongs }
            // songs={popularSongs}
          />
        </section>
      </main>
    </div>
  );
}