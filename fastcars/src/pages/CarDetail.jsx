// src/pages/CarDetail.jsx
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";
import { wallpapers } from "../data/cars";
import {
  Download,
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Grid,
  Calendar,
  Gauge,
  Fuel,
  Users,
  Settings,
  MapPin,
} from "lucide-react";

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const car = cars.find((c) => c.id === parseInt(id));
  const carWallpapers = wallpapers[car?.brand.toLowerCase()] || [];

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${car.brand}-${car.name}-wallpaper.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${car.brand} ${car.name}`,
          text: `Check out this ${car.brand} ${car.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const displayWallpapers = showAllImages
    ? carWallpapers
    : carWallpapers.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700/50 rounded-lg px-4 py-2 border border-gray-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700/50"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 transition-colors bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700/50 ${
                isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Car Info Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-4xl text-center font-bold">
              {car.brand} {car.name}
            </h1>
          </div>
        </div>

        {/* Main Image Gallery */}
        {carWallpapers.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              {/* Main Image */}
              <div className="flex justify-center items-center lg:flex-1 mb-4 lg:mb-0">
                <div className="relative w-full md:w-[750px] bg-gray-800 rounded-xl overflow-hidden">
                  <img
                    src={carWallpapers[selectedImage].image}
                    alt={`${car.brand} ${car.name}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      handleDownload(carWallpapers[selectedImage].image)
                    }
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Grid */}
              {carWallpapers.length > 1 && (
                <div className="lg:w-60 xl:w-64">
                  <div className="grid grid-cols-6 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                    {carWallpapers.map((wp, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-orange-500 scale-105"
                            : "border-gray-700 hover:border-gray-500"
                        }`}
                      >
                        <img
                          src={wp.image}
                          alt={`${car.brand} ${car.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Wallpapers Section */}
        {carWallpapers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">All Wallpapers</h3>
              {carWallpapers.length > 6 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <Grid className="w-4 h-4" />
                  {showAllImages
                    ? "Show Less"
                    : `Show All (${carWallpapers.length})`}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {displayWallpapers.map((wp, index) => (
                <div
                  key={index}
                  className="group relative aspect-video bg-gray-800 rounded-lg overflow-hidden"
                >
                  <img
                    src={wp.image}
                    alt={`${car.brand} wallpaper ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDownload(wp.image)}
                      className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarDetail;
