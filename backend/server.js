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
    const apiKey = process.env.RAWG_API_KEY;

if (!apiKey) {
  return res.status(500).json({
    success: false,
    error: 'RAWG_API_KEY is missing on the server'
  });
}
    
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});