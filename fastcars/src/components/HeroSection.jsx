import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Download } from "lucide-react";
import "../App.css";
import carImg from "../assets/p1.png";

const Hero = () => {
  const messages = [
    "HYPER CARS",
    "SPEED REDEFINED",
    "ENGINEERED FOR THRILL",
    "ULTIMATE PERFORMANCE",
    "LUXURY IN MOTION",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 to-yellow-500 px-6 lg:px-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-transform duration-10000 hover:scale-105"
      />

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" /> */}

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl">
        {/* Text Section */}
        <div className="text-left space-y-6 animate-fade-in-up">
          <div className="text-gray-100 text-lg font-bold uppercase tracking-widest">
            Hypercars Destination
          </div>

          <h1
            key={currentMessageIndex}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 slide-up"
          >
            {messages[currentMessageIndex]}
          </h1>

          <p className="text-gray-100 text-md max-w-lg animate-fade-in-up">
            Experience the world's most exclusive automotive masterpieces in stunning 4K resolution.
          </p>

          <div className="mt-6 animate-fade-in-up flex gap-4">
            <Link to="/allsneakers">
              <button className="bg-gray-900 shadow-md text-white text-sm px-6 py-4 rounded-full hover:scale-105 transition flex items-center gap-2">
                <Download className="w-5 h-5" /> Explore Cars
              </button>
            </Link>

            <Link to="/contact">
              <button className="px-6 py-3 rounded-full text-lg shadow-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition">
                View Latest Additions
              </button>
            </Link>
          </div>

          {/* Dots */}
          <div className="flex mt-6 md:mt-10 items-center space-x-2">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full text-white ${
                  index % 2 === 0 ? "bg-orange-600" : "bg-orange-300"
                } animate-bounce-custom`}
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center items-center animate-fade-in-up">
          <div className="absolute w-72 h-72 bg-white/20 rounded-full -z-10 top-12 blur-2xl"></div>

          <img
            src={carImg}
            alt="Hypercar"
            className="w-[400px] object-contain drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      <div className="text-center text-white font-bold text-3xl mt-6 md:hidden">
        Shop with quality!!
      </div>
    </section>
  );
};

export default Hero;
