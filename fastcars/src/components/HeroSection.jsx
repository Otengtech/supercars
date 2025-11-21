import React from "react";
import { ChevronRight, Download, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-72 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-transform duration-10000 hover:scale-105"
        style={{
          backgroundImage:
            "url(https://wallpaperbat.com/img/693663-car-wallpaper-vehicle-super-car-supercars-lamborghini-lamborghini-sc18-wallpaper-for-you-hd-wallpaper-for-desktop-mobile.jpg)",
        }}
      />

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" /> */}

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            HYPERCARS
          </span>
        </h1>
      </div>

      {/* Gradient Orbs */}
      {/* <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" /> */}
      {/* <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" /> */}
    </section>
  );
};

export default HeroSection;
