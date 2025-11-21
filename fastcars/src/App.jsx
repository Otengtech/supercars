import React, { useState } from "react";
import { cars, categories } from "./data/cars";
import { Search, Filter, Download, ChevronRight } from "lucide-react";
import HeroSection from "./components/HeroSection"

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = cars.filter((car) => {
    const matchesCategory =
      selectedCategory === "All" ||
      car.category === selectedCategory.toLowerCase();
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                HYPERCARS
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <HeroSection />

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center text-center items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`
            flex-shrink-0 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap 
            transition-all duration-300 transform hover:scale-105 border-2
            ${
              selectedCategory === category
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white border-red-500 shadow-lg shadow-red-500/25"
                : "bg-gray-800/30 text-gray-300 hover:bg-gray-700/50 border-gray-600/30 hover:border-gray-500/50"
            }
          `}
        >
          {category}
        </button>
      ))}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No cars found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-400">
            © 2024 Hypercars. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Car Card Component
function CarCard({ car }) {
  return (
    <div className="group bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
      <div className="relative overflow-hidden w-full h-60">
        {/* Car Image */}
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Wallpaper Count Badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white border border-white/20">
          {car.wallpapers} wallpapers
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-200 border border-gray-600/50 capitalize">
          {car.category}
        </div>
        
        {/* All Content Absolute Positioned */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Brand */}
          <p className="text-gray-300 text-sm font-medium mb-1 opacity-90">
            {car.brand}
          </p>
          
          {/* CTA Button */}
          <button className="w-full bg-black/50 text-orange-500 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group/btn backdrop-blur-sm border border-white/20">
            <Download className="w-4 h-4" />
            View Wallpapers
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

export default App;
