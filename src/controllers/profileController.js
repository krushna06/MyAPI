const axios = require('axios');

exports.getProfile = async (req, res) => {
  try {
    const profileResponse = await axios.get('http://dcdn.n0step.xyz:8787/profile/853620650592567304');
    const profileData = profileResponse.data;

    const lanyardResponse = await axios.get('https://api.lanyard.rest/v1/users/853620650592567304');
    const lanyardData = lanyardResponse.data;

    const activities = lanyardData.data.activities || [];
    const spotify = lanyardData.data.spotify || null;

    const combinedData = {
      profile: profileData,
      lanyard: {
        activities,
        spotify
      }
    };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
};
