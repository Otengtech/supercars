// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { cars, categories } from './data/cars';
import { Search, Filter } from 'lucide-react';
import CarDetail from './pages/CarDetail';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetail cars={cars} categories={categories}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;