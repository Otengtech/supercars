const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://playaxis.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PlayAxis Backend API',
    endpoints: ['/api/trending-games', '/api/trending-games/fallback']
  });
});

// Updated trending games endpoint with working fallback
app.get('/api/trending-games', (req, res) => {
  try {
    // Sample trending games data (no API key needed)
    const trendingGames = [
      {
        id: 1,
        name: "Cyberpunk 2077",
        background_image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
        rating: 4.5,
        released: "2020-12-10",
        genres: ["RPG", "Action"],
        platforms: ["PC", "PS5", "Xbox Series X/S"]
      },
      {
        id: 2,
        name: "Baldur's Gate 3",
        background_image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w-800&auto=format&fit=crop",
        rating: 4.8,
        released: "2023-08-03",
        genres: ["RPG", "Adventure"],
        platforms: ["PC", "PS5", "Xbox Series X/S"]
      },
      {
        id: 3,
        name: "Elden Ring",
        background_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
        rating: 4.7,
        released: "2022-02-25",
        genres: ["RPG", "Action"],
        platforms: ["PC", "PS4", "PS5", "Xbox"]
      },
      {
        id: 4,
        name: "Marvel's Spider-Man 2",
        background_image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop",
        rating: 4.9,
        released: "2023-10-20",
        genres: ["Action", "Adventure"],
        platforms: ["PS5"]
      },
      {
        id: 5,
        name: "Hogwarts Legacy",
        background_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop",
        rating: 4.6,
        released: "2023-02-10",
        genres: ["Action", "RPG"],
        platforms: ["PC", "PS5", "Xbox Series X/S"]
      },
      {
        id: 6,
        name: "The Legend of Zelda: Tears of the Kingdom",
        background_image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
        rating: 4.8,
        released: "2023-05-12",
        genres: ["Adventure", "Action"],
        platforms: ["Nintendo Switch"]
      },
      {
        id: 7,
        name: "Starfield",
        background_image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop",
        rating: 4.3,
        released: "2023-09-06",
        genres: ["RPG", "Sci-fi"],
        platforms: ["PC", "Xbox Series X/S"]
      },
      {
        id: 8,
        name: "Diablo IV",
        background_image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&auto=format&fit=crop",
        rating: 4.4,
        released: "2023-06-06",
        genres: ["RPG", "Action"],
        platforms: ["PC", "PS4", "PS5", "Xbox"]
      }
    ];

    res.json({
      success: true,
      count: trendingGames.length,
      games: trendingGames,
      note: "Using sample data - add RAWG API key for real data"
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// Keep the fallback endpoint
app.get('/api/trending-games/fallback', (req, res) => {
  res.json({
    success: true,
    count: 5,
    games: [
      {
        id: 1,
        name: "Cyberpunk 2077",
        background_image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
        rating: 4.5,
        released: "2020-12-10",
        genres: ["RPG", "Action"],
        platforms: ["PC", "PS5", "Xbox"]
      },
      {
        id: 2,
        name: "Counter-Strike 2",
        background_image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop",
        rating: 4.2,
        released: "2023-09-27",
        genres: ["FPS", "Action"],
        platforms: ["PC"]
      },
      {
        id: 3,
        name: "Fortnite",
        background_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
        rating: 4.0,
        released: "2017-07-25",
        genres: ["Battle Royale", "Action"],
        platforms: ["PC", "PS4", "PS5", "Xbox", "Mobile"]
      },
      {
        id: 4,
        name: "Minecraft",
        background_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
        rating: 4.9,
        released: "2011-11-18",
        genres: ["Sandbox", "Adventure"],
        platforms: ["PC", "All Consoles", "Mobile"]
      },
      {
        id: 5,
        name: "Grand Theft Auto V",
        background_image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
        rating: 4.8,
        released: "2013-09-17",
        genres: ["Action", "Adventure"],
        platforms: ["PC", "PS4", "PS5", "Xbox"]
      }
    ],
    note: "Fallback data"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Test endpoint: http://localhost:${PORT}/api/trending-games`);
});