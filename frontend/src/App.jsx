// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// ✅ Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AllGames = lazy(() => import('./pages/AllGames'));

function App() {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen bg-black text-white">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen text-gray-400">
              Loading page...
            </div>
          }
        >
          <Routes>
            {/* ✅ Home loads first */}
            <Route path="/" element={<Home />} />

            {/* ✅ Other pages load ONLY when visited */}
            <Route path="/all-games" element={<AllGames />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
