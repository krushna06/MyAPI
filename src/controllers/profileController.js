const axios = require('axios');
const { DCDN_PROFILE_URL, LANYARD_API_URL } = require('../config/constants');

exports.getProfile = async (req, res) => {
  try {
    const profileResponse = await axios.get(DCDN_PROFILE_URL);
    const profileData = profileResponse.data;

    const lanyardResponse = await axios.get(LANYARD_API_URL);
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
