import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGamepad, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useScrollReveal } from '../hooks/useIntersectionObserver';

const TrendingGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
    const titleRef = useScrollReveal();
    const titleDesRef = useScrollReveal();
    const leftRef = useScrollReveal();
    const rightRef = useScrollReveal();

  // IMPORTANT: This reads from your .env file
  const API_URL = import.meta.env.VITE_API_URL + '/api/trending-games';
  
  console.log('Frontend API URL:', API_URL); // Debug log

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        setLoading(true);
        console.log('Fetching from:', API_URL);
        
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
        
        if (data.success) {
          setGames(data.games);
          setError(null);
        } else {
          throw new Error(data.error || 'Unknown server error');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        // Keep any games we might have (like mock data from backend)
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGames();
  }, [API_URL]);

  // Infinite sliding effect (only if we have games)
  useEffect(() => {
    if (games.length === 0 || loading) return;

    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    let position = 0;
    const speed = 1.5;

    const animate = () => {
      position -= speed;
      const totalWidth = slider.scrollWidth / 2;
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [games, loading]);

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#0d1117] to-[#1a1f2d]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#475BFD]"></div>
            <p className="mt-4 text-gray-400">Loading trending games...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#0d1117] to-[#1a1f2d] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div ref={titleRef} className="scroll-reveal from-bottom slow-dramatic inline-flex items-center px-4 py-2 rounded-full bg-[#475BFD]/20 border border-[#475BFD]/40 mb-4">
            <span className=" text-sm font-bold text-[#475BFD]">TRENDING NOW</span>
          </div>
          <h2 ref={titleDesRef} className="scroll-reveal from-bottom slow-dramatic text-3xl md:text-4xl font-bold text-white mb-4">
            Hot Games Right Now
          </h2>
          <p ref={rightRef} className="scroll-reveal text-gray-400 max-w-2xl mx-auto">
            Discover what everyone is playing this week
          </p>
          
          {/* Error Display (if any) */}
          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
              <p className="text-red-300 text-sm">
                ⚠️ Note: {error} (Showing available games)
              </p>
            </div>
          )}
        </div>

        {/* Games Slider */}
        <div ref={leftRef} className="scroll-reveal from-bottom slow-dramatic relative overflow-hidden">
          {games.length > 0 ? (
            <>
              <div ref={sliderRef} className="flex gap-6">
                {[...games, ...games].map((game, index) => (
                  <div
                    key={`${game.id}-${index}`}
                    className="flex-shrink-0 w-64 md:w-72 lg:w-80 group"
                  >
                    <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#475BFD]/50 transition-all duration-300 hover:scale-[1.02]">
                      {/* Game Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={game.background_image}
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            // Fallback image if original fails to load
                            e.target.src = 'https://images.rawg.io/media/resize/640/-/screenshots/6c5/6c5e069114b6dba5c94d6a5504bd6f2b.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-white text-sm font-bold">{game.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Game Info */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white mb-2 truncate">
                          {game.name}
                        </h3>
                        
                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {game.genres?.slice(0, 2).map((genre, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>

                        {/* Details */}
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-400">
                            <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {game.released ? new Date(game.released).getFullYear() : 'Coming Soon'}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-400">
                            <FontAwesomeIcon icon={faGamepad} className="h-4 w-4 mr-2" />
                            <span className="text-sm truncate">
                              {game.platforms?.slice(0, 2).join(', ')}
                              {game.platforms?.length > 2 ? '...' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d1117] to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d1117] to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No games available. Check your backend connection.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-gradient-to-r from-[#475BFD] to-purple-600 text-white rounded-full font-bold hover:from-purple-600 hover:to-[#475BFD] transition-all duration-300 transform hover:scale-105 shadow-lg">
            Trending Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;