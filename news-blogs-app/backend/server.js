const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const GNEWS_API = 'https://gnews.io/api/v4';

app.get('/api/news', async (req, res) => {
  const { category, q } = req.query;

  const endpoint = q
    ? `${GNEWS_API}/search?q=${q}&lang=en&apikey=${process.env.GNEWS_API_KEY}`
    : `${GNEWS_API}/top-headlines?category=${category || 'technology'}&lang=en&apikey=${process.env.GNEWS_API_KEY}`;

  try {
    const response = await axios.get(endpoint);
    res.json(response.data);
  } catch (error) {
    console.error('GNews API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

