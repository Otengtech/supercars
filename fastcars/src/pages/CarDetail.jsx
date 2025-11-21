// src/pages/CarDetail.jsx
import { useParams } from 'react-router-dom';
import { cars } from '../data/cars';
import { Download, ArrowLeft } from 'lucide-react';

function CarDetail() {
  const { id } = useParams();
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
            <p className="text-gray-400 mb-2">Brand: {car.brand}</p>
            <p className="text-gray-400 mb-6">Category: {car.category}</p>
            <p className="text-lg">{car.wallpapers} high-quality wallpapers available</p>
          </div>
          
          {/* Wallpapers Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Map through actual wallpapers here */}
            {[...Array(car.wallpapers)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <div className="w-full h-32 bg-gray-700 rounded mb-2"></div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;