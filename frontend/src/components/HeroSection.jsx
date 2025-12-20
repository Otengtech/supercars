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

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentGameIndex, isTransitioning]);

  const currentGame = games[currentGameIndex];
  const stats = [
    { icon: faGamepad, value: '10K+', label: 'Games Available' },
    { icon: faUsers, value: '5M+', label: 'Active Players' },
    { icon: faStar, value: '4.8', label: 'Avg Rating' },
    { icon: faGlobe, value: '100+', label: 'Countries' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0d1117]">
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
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-12">
          
          {/* Left Content */}
          <div className="space-y-8 slide-in-left">

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {currentGame.title}
              </span>
              <div className="h-1 w-32 bg-gradient-to-r from-[#475BFD] to-purple-500 mt-4 rounded-full" />
            </h1>

            <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
              {currentGame.description}
            </p>

            {/* Game Details */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#475BFD] to-purple-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rating</p>
                  <p className="text-lg font-bold text-white">{currentGame.rating}/5.0</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Released</p>
                  <p className="text-lg font-bold text-white">{currentGame.releaseYear}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faGamepad} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Genre</p>
                  <p className="text-lg font-bold text-white">{currentGame.genre}</p>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="space-y-3">
              <p className="text-gray-400">Available on:</p>
              <div className="flex flex-wrap gap-3">
                {currentGame.platforms.map((platform, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Navigation Controls */}
          <div className="relative">
            {/* Game Thumbnails */}
            <div className="flex justify-center space-x-4 mb-8">
              {games.map((game, index) => (
                <button
                  key={game.id}
                  onClick={() => goToSlide(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
                    index === currentGameIndex 
                      ? 'border-[#475BFD] scale-110' 
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

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-6 mb-8">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
              >
                <FontAwesomeIcon 
                  icon={faChevronLeft} 
                  className="h-6 w-6 text-white group-hover:text-[#475BFD] transition-colors" 
                />
              </button>
              
              <button className="px-8 py-3 bg-gradient-to-r from-[#475BFD] to-purple-600 text-white rounded-xl font-bold flex items-center space-x-3 hover:from-purple-600 hover:to-[#475BFD] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span>PLAYAXIS</span>
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
              >
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  className="h-6 w-6 text-white group-hover:text-[#475BFD] transition-colors" 
                />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2">
              {games.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentGameIndex 
                      ? 'w-8 bg-gradient-to-r from-[#475BFD] to-purple-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
    </section>
  );
};

export default HeroSection;