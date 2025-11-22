// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cars, categories } from '../data/cars';
import { Search, Filter, Download, ChevronRight, Menu, X } from 'lucide-react';
import HeroSection from '../components/HeroSection';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory.toLowerCase();
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-white font-bold text-xl">HYPERCARS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-red-400 transition-colors duration-300">
                Home
              </Link>
              <Link to="/categories" className="text-gray-300 hover:text-white transition-colors duration-300">
                Categories
              </Link>
              <Link to="/popular" className="text-gray-300 hover:text-white transition-colors duration-300">
                Popular
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                About
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 z-30 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-gray-800/70 transition-all duration-300 w-64"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-white hover:text-red-400 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/categories" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/popular" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Popular
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                
                {/* Mobile Search */}
                <div className="relative pt-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-gray-800/70 transition-all duration-300 w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <HeroSection />
      
      {/* Category Filter Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter Header */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Bar - Mobile visible on desktop too for consistency */}
          {/* <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by car name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-gray-800/50 transition-all duration-300 w-full backdrop-blur-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div> */}

          {/* Category Filter */}
          <div className="flex justify-center items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {/* <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                  selectedCategory === 'All'
                    ? 'bg-red-500/20 border-red-500/50 text-red-400'
                    : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/70 hover:text-white'
                }`}
              > */}
              {/* </button> */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 backdrop-blur-sm capitalize ${
                    selectedCategory === category
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/70 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Showing {filteredCars.length} of {cars.length} cars
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          
          {/* Sort Options (Optional) */}
          <select className="bg-gray-800/30 border border-gray-700/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50 backdrop-blur-sm">
            <option value="name">Sort by Name</option>
            <option value="brand">Sort by Brand</option>
            <option value="wallpapers">Most Wallpapers</option>
          </select>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No cars found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? `No results found for "${searchTerm}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                : `No cars available${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
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