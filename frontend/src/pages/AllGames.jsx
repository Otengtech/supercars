import { useEffect, useState } from "react";
import axios from "axios";
import { useScrollReveal } from "../hooks/useIntersectionObserver";

const PAGE_SIZE = 12;

export default function AllGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);

  const headerRef = useScrollReveal();
  const filterRef = useScrollReveal();
  const gamesRef = useScrollReveal();
  const paginationRef = useScrollReveal();

  const [filters, setFilters] = useState({
    sort: "-rating",
    search: "",
    genre: "",
    platform: ""
  });

  const fetchGames = async (pageNum = 1) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "https://supercars-g0du.onrender.com/api/all-games",
        {
          params: {
            page: pageNum,
            page_size: PAGE_SIZE,
            ordering: filters.sort,
            search: filters.search || undefined,
            genres: filters.genre || undefined,
            platforms: filters.platform || undefined
          }
        }
      );

      if (data?.success) {
        setGames(data.games || []);
        setTotalPages(Math.ceil(data.count / PAGE_SIZE));
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Failed to fetch games:", err);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGameDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `https://supercars-g0du.onrender.com/api/game/${id}`
      );
      if (data?.success) {
        setSelectedGame(data.game);
      }
    } catch (err) {
      console.error("Failed to fetch game details:", err);
    }
  };

  useEffect(() => {
    fetchGames(1);
  }, [filters.sort]);

  const GameModal = ({ game, onClose }) => {
  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* Glassy Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <span className="text-white text-2xl">×</span>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Game Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {game.name}
              </h2>
              
              {/* Rating Badge */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white font-bold">
                    {game.rating?.toFixed(1) || "N/A"}
                  </span>
                  <span className="text-gray-400">/5.0</span>
                </div>
                
                {/* Metacritic Score */}
                {game.metacritic && (
                  <div className="px-3 py-1 bg-green-600/40 backdrop-blur-sm rounded-full border border-green-500/40">
                    <span className="text-white font-bold text-sm">
                      {game.metacritic} Metacritic
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">About This Game</h3>
              <p className="text-gray-300 leading-relaxed">
                {game.description || "No description available."}
              </p>
            </div>

            {/* Game Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              {/* Release Date */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-gray-400 text-sm mb-1">Release Date</p>
                <p className="text-white font-medium">
                  {game.released ? new Date(game.released).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "Coming Soon"}
                </p>
              </div>

              {/* Genres */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-gray-400 text-sm mb-1">Genres</p>
                <div className="flex flex-wrap gap-2">
                  {game.genres?.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm rounded-full text-sm text-blue-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-gray-400 text-sm mb-1">Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {game.platforms?.map((platform, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 backdrop-blur-sm rounded-full text-sm text-purple-300"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Playtime */}
              {game.playtime && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Average Playtime</p>
                  <p className="text-white font-medium">{game.playtime} hours</p>
                </div>
              )}
            </div>

            {/* Additional Details */}
            {(game.developers?.length > 0 || game.publishers?.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Developers */}
                {game.developers?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Developers</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.developers.map((dev, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-600/20 backdrop-blur-sm rounded-full text-sm text-emerald-300"
                        >
                          {dev}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publishers */}
                {game.publishers?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Publishers</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.publishers.map((pub, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-600/20 backdrop-blur-sm rounded-full text-sm text-amber-300"
                        >
                          {pub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Store Links */}
            {game.stores?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Available On</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {game.stores.map((store, index) => (
                    <a
                      key={index}
                      href={store.url_en || `https://${store.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-xl border border-white/20 hover:from-blue-600/50 hover:to-purple-600/50 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                          {store.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
  <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#1a1f2d] py-12">
    {/* Modern Header */}
    <div ref={headerRef} className="text-center mb-12">
      <div className="inline-block mb-4">
        <div className="px-5 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
          <span className="text-blue-400 text-sm font-bold">GAMES COLLECTION</span>
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400">
          All Games
        </span>
      </h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto">
        Browse thousands of amazing gaming experiences
      </p>
    </div>

    {/* Glassy Filter Section */}
    <div ref={filterRef} className="container mx-auto px-4 mb-12">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              placeholder="Search games..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((f) => ({ ...f, sort: e.target.value }))
              }
              className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:border-blue-500/50 transition-all duration-300"
            >
              <option value="-rating">⭐ Top Rated</option>
              <option value="-released">🚀 Newest</option>
              <option value="-added">🆕 Recently Added</option>
            </select>
          </div>

          <button
            onClick={() => fetchGames(1)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    {/* Glassy Games Grid */}
    <div ref={gamesRef} className="container mx-auto px-4">
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-4">Loading amazing games...</p>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-gray-400 text-lg">No games found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02]"
              onClick={() => fetchGameDetails(game.id)}
            >
              {/* Game Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white font-bold text-sm">
                      {game.rating?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                </div>
                
                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-2 truncate group-hover:text-blue-300 transition-colors duration-300">
                  {game.name}
                </h3>
                
                {/* Release Year */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">
                    {game.released ? new Date(game.released).getFullYear() : "TBA"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Glassy Pagination */}
      {totalPages > 1 && (
        <div ref={paginationRef} className="flex justify-center gap-4 mt-12">
          <button
            disabled={page === 1}
            onClick={() => fetchGames(page - 1)}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            <span>←</span> Previous
          </button>

          <div className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-white/20">
            <span className="text-white font-medium">
              Page <span className="font-bold">{page}</span> of {totalPages}
            </span>
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => fetchGames(page + 1)}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            Next <span>→</span>
          </button>
        </div>
      )}
    </div>

    {selectedGame && (
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    )}
  </div>
);
}
