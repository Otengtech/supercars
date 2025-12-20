import React from 'react';
import { useScrollReveal } from '../hooks/useIntersectionObserver'; // Fixed import path

const AboutPage = () => {
  const titleRef = useScrollReveal();
  const titleDesRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0d1117] via-black to-[#0d1117] py-20">
      <div className="container mx-auto px-4 md:px-14">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span ref={titleRef} className="scroll-reveal from-bottom slow-dramatic bg-clip-text text-transparent bg-gradient-to-r from-[#475BFD] to-purple-600">
                Play Axis
            </span>
          </h1>
          <p ref={titleDesRef} className="scroll-reveal from-bottom slow-dramatic text-gray-400 text-md max-w-2xl mx-auto">
            Your ultimate destination for game discovery and tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div 
            ref={leftRef}
            className="scroll-reveal from-bottom slow-dramatic opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 rounded-2xl p-8 border border-gray-800 hover:border-[#475BFD]/30 transition-colors duration-300">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Founded in 2023 by a team of passionate gamers and developers, 
                we noticed how difficult it was to track new releases and find 
                quality games. That's why we built GameVerse - a comprehensive 
                platform that makes game discovery effortless.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div 
            ref={rightRef}
            className="scroll-reveal from-bottom slow-dramatic opacity-0 translate-y-10 transition-all duration-700 ease-out delay-300"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 rounded-2xl p-8 border border-gray-800 hover:border-purple-600/30 transition-colors duration-300">
              <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg mr-3 flex items-center justify-center">
                    <span className="text-blue-400">✓</span>
                  </div>
                  <span className="text-gray-300">100% Free & Ad-Free</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg mr-3 flex items-center justify-center">
                    <span className="text-green-400">✓</span>
                  </div>
                  <span className="text-gray-300">Accurate & Up-to-date</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg mr-3 flex items-center justify-center">
                    <span className="text-purple-400">✓</span>
                  </div>
                  <span className="text-gray-300">Community Driven</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;