// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cars, categories } from "../data/cars";
import { Search, Filter, Download, ChevronRight, Menu, X } from "lucide-react";
import HeroSection from "../components/HeroSection";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      {/* Navbar */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 border-gray-700/50 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-white font-bold text-xl">HYPERCARS</span>
            </Link>

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
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
      <div className="container mx-auto px-28 py-6">
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
                ? `No results found for "${searchTerm}"${
                    selectedCategory !== "All" ? ` in ${selectedCategory}` : ""
                  }`
                : `No cars available${
                    selectedCategory !== "All" ? ` in ${selectedCategory}` : ""
                  }`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
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
    <div className="group bg-black overflow-hidden transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
      {/* Updated Button with Link */}
      <Link
        to={`/car/${car.id}`}
        className="w-full bg-black/50 text-orange-500 flex items-center justify-center gap-2 transition-all duration-300 group/btn backdrop-blur-sm"
      >
        <div className="relative overflow-hidden w-full h-40">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />

          <div className="absolute bottom-0 left-0 right-0">
            <h3 className="font-bold text-xl text-center text-white mb-3 transition-colors duration-300">
              {car.name}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Home;
