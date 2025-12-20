import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ENV validation
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const PORT = process.env.PORT || 5000;

if (!RAWG_API_KEY) {
  console.error('❌ FATAL ERROR: RAWG_API_KEY is not set');
  console.error('👉 Get a key from https://rawg.io/apidocs');
  process.exit(1);
}

console.log('✅ Backend configuration:');
console.log(`   - Port: ${PORT}`);
console.log(`   - API Key: ${RAWG_API_KEY.slice(0, 8)}...`);

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://playaxis.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Trending games — REAL DATA ONLY
app.get('/api/trending-games', async (req, res) => {
  console.log('📡 Fetching trending games from RAWG...');

  try {
    const { data } = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: RAWG_API_KEY,
        ordering: '-added',
        page_size: 12
      },
      timeout: 10000
    });

    const games = data.results.map(game => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
      genres: game.genres?.map(g => g.name).slice(0, 3) ?? [],
      platforms: game.platforms?.map(p => p.platform.name).slice(0, 3) ?? []
    }));

    console.log(`✅ Fetched ${games.length} games`);

    res.json({
      success: true,
      count: games.length,
      games
    });

  } catch (error) {
    console.error('❌ RAWG API error:', error.response?.data || error.message);

    // ❗ IMPORTANT: fail loudly — no mock data in prod
    res.status(500).json({
      success: false,
      error: 'Failed to fetch games from RAWG'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
