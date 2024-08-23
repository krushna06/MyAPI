const axios = require('axios');

exports.getProfile = async (req, res) => {
  try {
    const response = await axios.get('http://dcdn.n0step.xyz:8787/profile/853620650592567304');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
};
