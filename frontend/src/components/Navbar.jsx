import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faSearch,
  faHome,
  faFire,
  faCalendar,
  faStar,
  faBars,
  faTimes,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", icon: faHome, path: "/" },
    { name: "Trending", icon: faFire, path: "/trending" },
    { name: "New Releases", icon: faCalendar, path: "/new-releases" },
    { name: "Top Rated", icon: faStar, path: "/top-rated" },
  ];

  const mobileMenuItems = [
    ...navItems,
    { name: "Games", icon: faGamepad, path: "/all-games" },
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 w-72 bg-[#1A1F2D] shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out md:hidden
          border-r border-gray-800
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faGamepad}
                className="h-7 w-7 text-[#475BFD]"
              />

              <span className="text-xl font-bold text-gray-400">PLAYAXIS</span>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {mobileMenuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={toggleMobileMenu}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-[#475BFD] transition-colors duration-200 group"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#475BFD]"
                  />
                  <span className="font-medium text-gray-400">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>Find your next favorite game</p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#1A1F2D] text-white border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faGamepad} className="text-lg" />

                <span className="text-xl font-bold">PLAYAXIS</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="h-4 w-4 mr-2 group-hover:text-[#475BFD]"
                  />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  className="bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#475BFD]"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"
                />
              </div>

              {/* Mobile Search Toggle */}
              <button
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="relative">
                <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#475BFD] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden py-3 border-t border-gray-800">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for games..."
                  className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#475BFD]"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
