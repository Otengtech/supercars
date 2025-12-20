import React from 'react';
import HeroSection from '../components/HeroSection';
import TrendingGames from '../components/TrendingGames';
import GameGrid from '../components/GameGrid.jsx';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <GameGrid />
      <TrendingGames />
    </div>
  );
}

export default Home;
