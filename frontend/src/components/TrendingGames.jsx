import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGamepad, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useScrollReveal } from "../hooks/useIntersectionObserver";

const TrendingGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const badgeRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const subtitleRef = useScrollReveal();

  // Use local backend for now since supercars-g0du.onrender.com is down
  const API_URL = 'http://localhost:5000/api/trending-games';

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        setLoading(true);
        console.log('Fetching from:', API_URL);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
        
        if (data.success && data.games && data.games.length > 0) {
          setGames(data.games);
          setError(null);
        } else {
          throw new Error('No games data received');
        }
      } catch (err) {
        console.error('Error fetching trending games:', err);
        setError(err.message);
        // Use hardcoded fallback data
        useHardcodedData();
      } finally {
        setLoading(false);
      }
    };

    const useHardcodedData = () => {
      console.log('Using hardcoded fallback data');
      const fallbackGames = [
        {
          id: 1,
          name: "Cyberpunk 2077",
          background_image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
          rating: 4.5,
          released: "2020-12-10",
          genres: ["RPG", "Action"],
          platforms: ["PC", "PS5", "Xbox"]
        },
        {
          id: 2,
          name: "Baldur's Gate 3",
          background_image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&auto=format&fit=crop",
          rating: 4.8,
          released: "2023-08-03",
          genres: ["RPG", "Adventure"],
          platforms: ["PC", "PS5"]
        },
        {
          id: 3,
          name: "Elden Ring",
          background_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
          rating: 4.7,
          released: "2022-02-25",
          genres: ["RPG", "Action"],
          platforms: ["PC", "PS5", "Xbox"]
        },
        {
          id: 4,
          name: "Spider-Man 2",
          background_image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop",
          rating: 4.9,
          released: "2023-10-20",
          genres: ["Action", "Adventure"],
          platforms: ["PS5"]
        },
        {
          id: 5,
          name: "Forza Horizon 5",
          background_image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop",
          rating: 4.6,
          released: "2021-11-09",
          genres: ["Racing", "Sports"],
          platforms: ["PC", "Xbox"]
        }
      ];
      setGames(fallbackGames);
      setError('Using offline data - backend unavailable');
    };

    fetchTrendingGames();
  }, []);

  // FIXED: Infinite sliding effect with null check
  useEffect(() => {
    if (games.length === 0 || loading || !sliderRef.current) return;

    const slider = sliderRef.current;
    let animationId;
    let position = 0;
    const speed = 1; // Slower speed for better visibility

    const animate = () => {
      position -= speed;
      
      // Reset position when scrolled through all items
      const totalWidth = slider.scrollWidth / 2;
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      
      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Start animation only if slider exists
    if (slider) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [games, loading]);

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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#475BFD]/20 border border-[#475BFD]/40 mb-4">
            <span ref={badgeRef} className="scroll-reveal from-bottom text-sm font-bold text-[#475BFD]">
              🔥 TRENDING NOW
            </span>
          </div>
          <h2 ref={titleRef} className="scroll-reveal from-bottom text-3xl md:text-4xl font-bold text-white mb-4">
            Hot Games Right Now
          </h2>
          <p ref={subtitleRef} className="scroll-reveal from-bottom text-gray-400 max-w-2xl mx-auto">
            Discover what everyone is playing this week
          </p>
          
          {error && (
            <div className="mt-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-lg inline-block">
              <p className="text-yellow-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Infinite Sliding Container */}
        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {/* Duplicate games for seamless infinite scroll */}
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
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-white text-sm font-bold">
                          {typeof game.rating === 'number' ? game.rating.toFixed(1) : '4.5'}
                        </span>
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
                          {Array.isArray(game.platforms) 
                            ? game.platforms.slice(0, 2).join(', ') + (game.platforms.length > 2 ? '...' : '')
                            : 'Multi-platform'}
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
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-[#475BFD] to-purple-600 text-white rounded-xl font-bold hover:from-purple-600 hover:to-[#475BFD] transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Trending Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;