const axios = require('axios');
require('dotenv').config();

const getSpotifyAccessToken = async () => {
  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`).toString('base64'),
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  };

  try {
    const response = await axios(authOptions);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error);
    throw new Error('Failed to get Spotify access token');
  }
};

exports.getLastPlayedSong = async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();

    const spotifyResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const lastPlayed = spotifyResponse.data.items[0];
    res.json({
      song: lastPlayed.track.name,
      artist: lastPlayed.track.artists.map(artist => artist.name).join(', '),
      album: lastPlayed.track.album.name,
      played_at: lastPlayed.played_at,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch last played song' });
  }
};
