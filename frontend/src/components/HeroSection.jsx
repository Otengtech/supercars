import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGamepad, 
  faChevronLeft, 
  faChevronRight, 
  faPlay, 
  faStar,
  faUsers,
  faTrophy,
  faCalendar,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

// Import images
import cypherpunkImage from '../assets/cypherpunk.jpg';
import spidermanImage from '../assets/spiderman.jpeg';
import tombraiderImage from '../assets/tombraider.jpg';
import unchartedImage from '../assets/uncharted.jpg';
import forzaImage from '../assets/forza.jpg';
import destinyImage from '../assets/destiny.webp';

const HeroSection = () => {
  const games = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      description: "Enter the dark future of Night City. Become a cyberpunk mercenary in this open-world RPG.",
      image: cypherpunkImage,
      genre: "RPG/Action",
      rating: 4.5,
      platforms: ["PC", "PS5", "Xbox"],
      releaseYear: 2020
    },
    {
      id: 2,
      title: "Marvel's Spider-Man 2",
      description: "Swing through NYC as both Peter and Miles. Face new threats in this epic superhero adventure.",
      image: spidermanImage,
      genre: "Action/Adventure",
      rating: 4.9,
      platforms: ["PS5"],
      releaseYear: 2023
    },
    {
      id: 3,
      title: "Tomb Raider",
      description: "Uncover ancient mysteries as Lara Croft. Survival action meets archaeological discovery.",
      image: tombraiderImage,
      genre: "Action/Adventure",
      rating: 4.6,
      platforms: ["PC", "PS4", "Xbox"],
      releaseYear: 2013
    },
    {
      id: 4,
      title: "Uncharted 4",
      description: "Nathan Drake's final adventure. Treasure hunting across stunning global locations.",
      image: unchartedImage,
      genre: "Action/Adventure",
      rating: 4.8,
      platforms: ["PS4", "PC"],
      releaseYear: 2016
    },
    {
      id: 5,
      title: "Forza Horizon 5",
      description: "Race across vibrant Mexico. The ultimate festival of cars and speed awaits.",
      image: forzaImage,
      genre: "Racing",
      rating: 4.7,
      platforms: ["PC", "Xbox"],
      releaseYear: 2021
    },
    {
      id: 6,
      title: "Destiny 2",
      description: "Guardians unite in epic sci-fi battles. Master powers and defend humanity.",
      image: destinyImage,
      genre: "FPS/RPG",
      rating: 4.4,
      platforms: ["PC", "PS5", "Xbox"],
      releaseYear: 2017
    }
  ];

  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentGameIndex((prevIndex) => 
      prevIndex === games.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentGameIndex((prevIndex) => 
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentGameIndex) return;
    setIsTransitioning(true);
    setCurrentGameIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-slide every 5 seconds (disable on mobile touch)
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentGameIndex, isTransitioning]);

  const currentGame = games[currentGameIndex];

  return (
    <section className="relative min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0d1117]">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentGameIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay - Responsive intensity */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent md:from-black/90 md:via-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(90vh-4rem)] sm:min-h-[90vh] py-8 sm:py-12">
          
          {/* Left Content - Stack on mobile, side-by-side on desktop */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 px-2 sm:px-0">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight sm:leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent block">
                {currentGame.title}
              </span>
              <div className="h-1 w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 bg-gradient-to-r from-[#475BFD] to-purple-500 mt-2 sm:mt-3 md:mt-4 rounded-full" />
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-full lg:max-w-xl leading-relaxed sm:leading-relaxed">
              {currentGame.description}
            </p>

            {/* Game Details - Responsive layout */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap gap-3 sm:gap-4 md:gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#475BFD] to-purple-600 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faStar} className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Rating</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white">{currentGame.rating}/5.0</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Released</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white">{currentGame.releaseYear}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 col-span-2 xs:col-span-1 justify-center xs:justify-start">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faGamepad} className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Genre</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white truncate max-w-[100px] sm:max-w-none">{currentGame.genre}</p>
                </div>
              </div>
            </div>

            {/* Platforms - Responsive */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-gray-400 text-sm sm:text-base">Available on:</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {currentGame.platforms.map((platform, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default text-xs sm:text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Navigation Controls */}
          <div className="relative md:order-2 order-2 z-30 mb-6 sm:mb-8 lg:mb-0">
            {/* Game Thumbnails - Hide on very small screens, show horizontally on others */}
            <div className="flex justify-center z-30 space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6 md:mb-8 pb-2 sm:pb-0">
              {games.map((game, index) => (
                <button
                  key={game.id}
                  onClick={() => goToSlide(index)}
                  className={`relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 flex-shrink-0 ${
                    index === currentGameIndex 
                      ? 'border-[#475BFD] scale-105 sm:scale-110' 
                      : 'border-gray-700'
                  }`}
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${
                    index === currentGameIndex 
                      ? 'bg-[#475BFD]/30' 
                      : 'bg-black/40'
                  }`} />
                </button>
              ))}
            </div>

            {/* Navigation Arrows - Responsive sizing */}
            <div className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6 mb-4 sm:mb-6 md:mb-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 group flex-shrink-0"
              >
                <FontAwesomeIcon 
                  icon={faChevronLeft} 
                  className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover:text-[#475BFD] transition-colors" 
                />
              </button>
              
              <button className="px-4 py-2 xs:px-5 xs:py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 bg-gradient-to-r from-[#475BFD] to-purple-600 text-white rounded-lg sm:rounded-xl font-bold flex items-center justify-center hover:from-purple-600 hover:to-[#475BFD] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm xs:text-base sm:text-lg min-w-[120px] xs:min-w-[140px] sm:min-w-[160px]">
                <span>PLAYAXIS</span>
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 group flex-shrink-0"
              >
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover:text-[#475BFD] transition-colors" 
                />
              </button>
            </div>

            {/* Slide Indicators - Responsive */}
            <div className="flex justify-center space-x-1.5 sm:space-x-2">
              {games.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentGameIndex 
                      ? 'w-4 sm:w-6 md:w-8 bg-gradient-to-r from-[#475BFD] to-purple-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Touch Swipe Area */}
      <div 
        className="absolute inset-0 lg:hidden z-20"
        onTouchStart={(e) => {
          const touchDownX = e.touches[0].clientX;
          const handleTouchEnd = (e) => {
            const touchUpX = e.changedTouches[0].clientX;
            const diff = touchDownX - touchUpX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
              if (diff > 0) {
                nextSlide(); // Swipe left
              } else {
                prevSlide(); // Swipe right
              }
            }
            
            document.removeEventListener('touchend', handleTouchEnd);
          };
          
          document.addEventListener('touchend', handleTouchEnd);
        }}
      />

      {/* Bottom Gradient - Responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
    </section>
  );
};

export default HeroSection;