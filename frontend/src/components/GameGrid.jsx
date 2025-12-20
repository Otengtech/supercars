import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const GameGrid = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  // Video sources for games (you can add more)
  const gameVideos = {
  // Use YouTube SHORTS or shorter trailers (under 60 seconds)
  3498: 'https://www.youtube.com/watch?v=hvoD7ehZPcM', // GTA V - Short Trailer (30s)
  3328: 'https://www.youtube.com/watch?v=0H8tO3P88-4', // Witcher 3 - Short Trailer (30s)
  4200: 'https://youtu.be/A88YiZdXugA', // Portal 2 - Gameplay Trailer (45s)
  4291: 'https://youtu.be/edYCtaNueQY?t=20', // CS:GO - Start at 20s
  5286: 'https://youtu.be/W2Wnvvj33Wo?t=15', // Tomb Raider - Start at 15s
  13536: 'https://youtube.com/shorts/CRjyM_hI11g', // Portal - Short (22s)
  28: 'https://youtube.com/shorts/gmA6MrX81z4', // Red Dead 2 - Short (22s)
  5679: 'https://youtube.com/shorts/JSRtYpNRoN0', // Skyrim - Short (24s)
  4062: 'https://youtube.com/shorts/znd5Qf8r4Q4', // BioShock - Short (20s)
  802: 'https://youtube.com/shorts/5T7elMyD_4I', // Borderlands 2 - Short (19s)
  12020: 'https://youtube.com/shorts/1gPESReDwak', // L4D2 - Short (17s)
  13537: 'https://youtube.com/shorts/W7zqRPEW_1w', // Half-Life 2 - Short (20s)
};

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://supercars-g0du.onrender.com/api/trending-games');
        
        if (response.data.success) {
          // Take first 12 games
          const gameList = response.data.games.slice(0, 12);
          // Add video URLs to each game
          const gamesWithVideos = gameList.map(game => ({
            ...game,
            video_url: gameVideos[game.id] || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Fallback
          }));
          setGames(gamesWithVideos);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
        // Fallback to default games if API fails
        setGames(Object.keys(gameVideos).slice(0, 12).map(id => ({
          id: parseInt(id),
          name: `Game ${id}`,
          background_image: `https://via.placeholder.com/400x225/1a1f2d/475BFD?text=Game+${id}`,
          rating: 4.5,
          genres: ['Action', 'Adventure'],
          video_url: gameVideos[id]
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Handle game click
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedGame(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#0d1117] to-[#1a1f2d]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 rounded-xl h-64 mb-4"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-[#0d1117] to-[#1a1f2d]">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-blue-600 mb-4">
              <span className="text-sm font-bold text-white">🎮 GAME LIBRARY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">Game Collection</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Click on any game to watch its trailer and learn more
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => handleGameClick(game)}
              >
                {/* Game Card */}
                <div className="relative h-64 overflow-hidden rounded-2xl border-2 border-gray-800 group-hover:border-blue-500/50 transition-all duration-500">
                  {/* Game Image */}
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x225/1a1f2d/475BFD?text=${encodeURIComponent(game.name)}`;
                    }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg truncate">{game.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white text-sm">{game.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {game.genres.slice(0, 2).map((genre, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-300"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showModal && selectedGame && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${showModal ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div
            ref={modalRef}
            className={`relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl transform ${showModal ? 'animate-scaleIn' : 'animate-scaleOut'}`}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{selectedGame.name}</h3>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-white">{selectedGame.rating.toFixed(1)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedGame.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-600/20 rounded-full text-sm text-blue-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Player */}
<div className="relative pt-[56.25%] bg-black">
  <ReactPlayer
    url={selectedGame.video_url}
    controls
    playing={true} // Autoplay
    muted={true}   // Required for autoplay
    width="100%"
    height="100%"
    className="absolute top-0 left-0"
    config={{
      youtube: {
        playerVars: {
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          autoplay: 1, // Force autoplay
          mute: 1,     // Force mute
          playsinline: 1 // For mobile
        }
      }
    }}
  />
</div>

            {/* Game Details */}
            <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">About This Game</h4>
                  <p className="text-gray-300">
                    Experience one of the most popular games in our collection. 
                    {selectedGame.name} offers immersive gameplay, stunning graphics, 
                    and hours of entertainment.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">Quick Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Release Date</span>
                      <span className="text-white">
                        {selectedGame.released ? new Date(selectedGame.released).toLocaleDateString() : 'Coming Soon'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating</span>
                      <span className="text-white">{selectedGame.rating.toFixed(1)}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platforms</span>
                      <span className="text-white text-right">
                        {selectedGame.platforms?.slice(0, 3).join(', ') || 'Multi-platform'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.9); opacity: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-fadeOut { animation: fadeOut 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-scaleOut { animation: scaleOut 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default GameGrid;