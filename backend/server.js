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

// In your server.js file, add these routes:

// ALL GAMES ROUTE
app.get('/api/all-games', async (req, res) => {
  console.log('📡 Fetching all games...');
  
  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.page_size) || 12;
    const search = req.query.search || '';
    const genre = req.query.genres || '';
    const platform = req.query.platforms || '';
    const ordering = req.query.ordering || '-rating';

    // Build RAWG API params
    const params = {
      key: process.env.RAWG_API_KEY,
      page: page,
      page_size: pageSize,
      ordering: ordering
    };

    // Add optional filters
    if (search) params.search = search;
    if (genre) params.genres = genre;
    if (platform) params.platforms = platform;

    // Fetch from RAWG
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: params,
      timeout: 10000
    });

    // Format response
    const games = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
      genres: game.genres?.map(g => ({ id: g.id, name: g.name })),
      platforms: game.platforms?.map(p => ({ id: p.platform.id, name: p.platform.name })),
      metacritic: game.metacritic,
      clip: game.clip
    }));

    res.json({
      success: true,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      page: page,
      page_size: pageSize,
      games: games
    });

  } catch (error) {
    console.error('❌ All games error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch games'
    });
  }
});

// Get game details with purchase links
app.get('/api/game/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: process.env.RAWG_API_KEY
      }
    });

    // Get stores where game is available
    const stores = data.stores?.map(store => ({
      id: store.store.id,
      name: store.store.name,
      domain: store.store.domain,
      url_en: store.url_en || `https://${store.store.domain}`
    })) || [];

    // Get YouTube video
    let video_url = null;
    try {
      const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: process.env.YOUTUBE_API_KEY || 'AIzaSyB5kKxMjdMq2e6q8CZl3hTkfz5nV5X7XwA',
          q: `${data.name} gameplay trailer`,
          part: 'snippet',
          maxResults: 1,
          type: 'video'
        }
      });
      
      if (videoResponse.data.items.length > 0) {
        video_url = `https://www.youtube.com/watch?v=${videoResponse.data.items[0].id.videoId}`;
      }
    } catch (error) {
      console.log(`No video found for ${data.name}`);
    }

    const gameDetails = {
      id: data.id,
      name: data.name,
      description: data.description_raw || data.description,
      background_image: data.background_image,
      rating: data.rating,
      released: data.released,
      metacritic: data.metacritic,
      playtime: data.playtime,
      platforms: data.platforms?.map(p => p.platform.name) || [],
      genres: data.genres?.map(g => g.name) || [],
      developers: data.developers?.map(d => d.name) || [],
      publishers: data.publishers?.map(p => p.name) || [],
      website: data.website,
      video_url,
      stores,
      screenshots: data.short_screenshots?.map(s => s.image) || []
    };

    res.json({
      success: true,
      game: gameDetails
    });

  } catch (error) {
    console.error('❌ Game details error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game details'
    });
  }
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
