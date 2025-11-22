// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cars, categories } from '../data/cars';
import { Search, Filter, Download, ChevronRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory.toLowerCase();
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <HeroSection />
      
      {/* Category Filter Section */}
      <div className="container mx-auto px-4 py-6">
        {/* ... your existing filter code ... */}
        
        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
}

// Updated CarCard Component with Router Link
function CarCard({ car }) {
  return (
    <div className="group bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
      <div className="relative overflow-hidden w-full h-64">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white border border-white/20">
          {car.wallpapers} wallpapers
        </div>
        
        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-200 border border-gray-600/50 capitalize">
          {car.category}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-gray-300 text-sm font-medium mb-1 opacity-90">
            {car.brand}
          </p>
          
          <h3 className="font-bold text-xl text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
            {car.name}
          </h3>
          
          {/* Updated Button with Link */}
          <Link 
            to={`/car/${car.id}`}
            className="w-full bg-black/50 text-orange-500 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group/btn backdrop-blur-sm border border-white/20 hover:bg-black/70 hover:border-orange-500/50"
          >
            <Download className="w-4 h-4" />
            View Wallpapers
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;