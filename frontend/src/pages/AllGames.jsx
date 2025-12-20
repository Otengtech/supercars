import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useScrollReveal } from '../hooks/useIntersectionObserver';

const AllGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    platform: '',
    sort: '-rating'
  });

  const headerRef = useScrollReveal();
  const filterRef = useScrollReveal();
  const gamesRef = useScrollReveal();
  const paginationRef = useScrollReveal();

  // Filter options
  const genreOptions = [
    { value: '', label: 'All Genres' },
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'rpg', label: 'RPG' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'shooter', label: 'Shooter' },
    { value: 'sports', label: 'Sports' }
  ];

  const platformOptions = [
    { value: '', label: 'All Platforms' },
    { value: '4', label: 'PC' },
    { value: '187', label: 'PlayStation 5' },
    { value: '18', label: 'PlayStation 4' },
    { value: '1', label: 'Xbox One' },
    { value: '186', label: 'Xbox Series S/X' },
    { value: '7', label: 'Nintendo Switch' }
  ];

  const sortOptions = [
    { value: '-rating', label: 'Highest Rated' },
    { value: '-released', label: 'Newest' },
    { value: 'name', label: 'A to Z' },
    { value: '-added', label: 'Recently Added' },
    { value: '-metacritic', label: 'Metacritic Score' }
  ];

  // Fetch games
  const fetchGames = async (pageNum = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum,
        page_size: 12,
        ordering: filters.sort
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.genre) params.append('genres', filters.genre);
      if (filters.platform) params.append('platforms', filters.platform);

      const response = await axios.get(`https://supercars-g0du.onrender.com/api/all-games?${params}`);
      
      if (response.data.success) {
        setGames(response.data.games);
        const total = Math.ceil(response.data.count / 12);
        setTotalPages(total > 50 ? 50 : total); // Limit to 50 pages
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch game details
  const fetchGameDetails = async (id) => {
    try {
      const response = await axios.get(`https://supercars-g0du.onrender.com/api/game/${id}`);
      if (response.data.success) {
        setSelectedGame(response.data.game);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
      }
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchGames();
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setPage(1);
    fetchGames(1);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: '',
      platform: '',
      sort: '-rating'
    });
    setPage(1);
    fetchGames(1);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
    document.body.style.overflow = 'auto';
  };

  // Glassy Modal Component
  const GameModal = ({ game, onClose }) => {
    const [showVideo, setShowVideo] = useState(false);

    if (!game) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        {/* Glassy Modal */}
        <div className="relative w-full max-w-6xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-white text-2xl">×</span>
          </button>

          {/* Modal Content */}
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Game Media */}
            <div className="relative h-full">
              <div className="relative h-64 lg:h-full">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Play Video Button */}
                {game.video_url && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 backdrop-blur-sm rounded-full border border-white/30 text-white font-bold hover:scale-105 transition-all duration-300"
                  >
                    {showVideo ? 'Hide Video' : 'Watch Trailer'}
                  </button>
                )}
              </div>

              {/* Video Player */}
              {showVideo && game.video_url && (
                <div className="absolute inset-0 bg-black p-4">
                  <div className="relative h-full">
                    <ReactPlayer
                      url={game.video_url}
                      controls
                      playing={true}
                      muted={true}
                      width="100%"
                      height="100%"
                      className="absolute top-0 left-0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Game Details */}
            <div className="p-8 bg-gradient-to-b from-gray-900/80 to-gray-900/60">
              <h2 className="text-3xl font-bold text-white mb-4">{game.name}</h2>
              
              {/* Rating & Details */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl mr-2">★</span>
                  <span className="text-white text-xl font-bold">{game.rating?.toFixed(1) || 'N/A'}</span>
                  <span className="text-gray-400 ml-1">/5.0</span>
                </div>
                {game.metacritic && (
                  <div className="px-3 py-1 bg-green-600/30 rounded-full border border-green-500/30">
                    <span className="text-white font-bold">{game.metacritic}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-300 line-clamp-6">
                  {game.description || 'No description available.'}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Released</p>
                  <p className="text-white font-medium">
                    {game.released ? new Date(game.released).toLocaleDateString() : 'TBA'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Playtime</p>
                  <p className="text-white font-medium">{game.playtime || 'N/A'} hours</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Genres</p>
                  <p className="text-white font-medium">{game.genres?.join(', ') || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Platforms</p>
                  <p className="text-white font-medium">{game.platforms?.join(', ') || 'N/A'}</p>
                </div>
              </div>

              {/* Purchase/Download Section */}
              {game.stores && game.stores.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-bold text-lg mb-3">Available On</h3>
                  <div className="flex flex-wrap gap-3">
                    {game.stores.map((store, idx) => (
                      <a
                        key={idx}
                        href={store.url_en}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium hover:from-blue-600/50 hover:to-purple-600/50 transition-all duration-300"
                      >
                        {store.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Screenshots */}
              {game.screenshots && game.screenshots.length > 0 && (
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">Screenshots</h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {game.screenshots.slice(0, 4).map((screenshot, idx) => (
                      <img
                        key={idx}
                        src={screenshot}
                        alt={`${game.name} screenshot ${idx + 1}`}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
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
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#1a1f2d]">
      

      {/* Filters Section */}
      <div 
        ref={filterRef}
        className="scroll-reveal from-bottom slow-dramatic"
      >
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search games..."
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* Genre Filter */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  {genreOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Platform Filter */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Platform</label>
                <select
                  value={filters.platform}
                  onChange={(e) => handleFilterChange('platform', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={applyFilters}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div 
        ref={gamesRef}
        className="container mx-auto px-4 py-12"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/10 rounded-2xl h-64 mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <div
                  key={`${game.id}-${index}`}
                  className="scroll-reveal from-bottom slow-dramatic"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-cyan-500/50 transition-all duration-500"
                    onClick={() => fetchGameDetails(game.id)}
                  >
                    {/* Game Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white font-bold">{game.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Game Info */}
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-2 truncate">{game.name}</h3>
                      
                      {/* Genres */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {game.genres.slice(0, 2).map((genre, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>

                      {/* Platforms & Video Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm truncate mr-2">
                          {game.platforms.slice(0, 2).map(p => p.name).join(', ')}
                        </span>
                        {game.video_url && (
                          <span className="text-cyan-400 text-sm">🎬 Video</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {games.length > 0 && (
              <div 
                ref={paginationRef}
                className="scroll-reveal from-bottom slow-dramatic mt-12"
              >
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => fetchGames(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-xl border ${
                      page === 1
                        ? 'border-white/10 text-gray-500 cursor-not-allowed'
                        : 'border-white/20 text-white hover:border-cyan-500/50'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchGames(pageNum)}
                        className={`px-4 py-2 rounded-xl ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <span className="px-4 py-2 text-gray-400">...</span>
                  )}
                  
                  <button
                    onClick={() => fetchGames(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-xl border ${
                      page === totalPages
                        ? 'border-white/10 text-gray-500 cursor-not-allowed'
                        : 'border-white/20 text-white hover:border-cyan-500/50'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Glassy Modal */}
      {showModal && selectedGame && (
        <GameModal game={selectedGame} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllGames;