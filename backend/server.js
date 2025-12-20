const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// CORS configuration for both dev and prod
const allowedOrigins = [
  'http://localhost:3000',
  'https://playaxis.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Trending games endpoint
app.get('/api/trending-games', async (req, res) => {
  try {
    // Using RAWG API (get your free API key from https://rawg.io/apidocs)
    const apiKey = process.env.RAWG_API_KEY || 'your-api-key-here';
    
    // Fetch trending games
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: apiKey,
        dates: '2023-01-01,2024-12-31',
        ordering: '-added',
        page_size: 10
      }
    });

    // Format the response
    const trendingGames = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
      genres: game.genres.map(g => g.name),
      platforms: game.platforms.map(p => p.platform.name),
      clip: game.clip?.clips?.full || null
    }));

    res.json({
      success: true,
      count: trendingGames.length,
      games: trendingGames
    });

  } catch (error) {
    console.error('Error fetching trending games:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending games',
      message: error.message
    });
  }
});

// Fallback endpoint for testing (in case API key is not available)
app.get('/api/trending-games/fallback', (req, res) => {
  const fallbackGames = [
    {
      id: 1,
      name: "Cyberpunk 2077",
      background_image: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
      rating: 4.5,
      released: "2020-12-10",
      genres: ["RPG", "Action"],
      platforms: ["PC", "PS5", "Xbox Series X/S"]
    },
    {
      id: 2,
      name: "Baldur's Gate 3",
      background_image: "https://media.rawg.io/media/games/af7/af7a831001c5c32c46e950cc883b8cb7.jpg",
      rating: 4.8,
      released: "2023-08-03",
      genres: ["RPG", "Adventure"],
      platforms: ["PC", "PS5", "Xbox Series X/S"]
    },
    {
      id: 3,
      name: "Elden Ring",
      background_image: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg",
      rating: 4.7,
      released: "2022-02-25",
      genres: ["RPG", "Action"],
      platforms: ["PC", "PS4", "PS5", "Xbox"]
    },
    {
      id: 4,
      name: "Marvel's Spider-Man 2",
      background_image: "https://media.rawg.io/media/games/baf/baf9905270314e07e6850cffdb51df41.jpg",
      rating: 4.9,
      released: "2023-10-20",
      genres: ["Action", "Adventure"],
      platforms: ["PS5"]
    },
    {
      id: 5,
      name: "Hogwarts Legacy",
      background_image: "https://media.rawg.io/media/games/5dd/5dd4d2d8c8f37e4c4d37c4e98e5cde6d.jpg",
      rating: 4.6,
      released: "2023-02-10",
      genres: ["Action", "RPG"],
      platforms: ["PC", "PS5", "Xbox Series X/S"]
    }
  ];

  res.json({
    success: true,
    count: fallbackGames.length,
    games: fallbackGames,
    note: "Using fallback data - add RAWG API key for real data"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});