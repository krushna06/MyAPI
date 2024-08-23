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

const getLanyardData = async () => {
  const lanyardOptions = {
    method: 'GET',
    url: 'https://api.lanyard.rest/v1/users/853620650592567304',
  };

  try {
    const response = await axios(lanyardOptions);
    return response.data.data.activities.find(activity => activity.name === 'Spotify');
  } catch (error) {
    console.error('Error fetching Lanyard data:', error);
    throw new Error('Failed to get Lanyard data');
  }
};

exports.getLastPlayedSongs = async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const lanyardData = await getLanyardData();

    const spotifyResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const [latestSong, ...previousSongs] = spotifyResponse.data.items;

    const response = {
      currently_playing_song: lanyardData ? {
        flags: lanyardData.flags,
        id: lanyardData.id,
        name: lanyardData.name,
        type: lanyardData.type,
        state: lanyardData.state,
        session_id: lanyardData.session_id,
        details: lanyardData.details,
        timestamps: lanyardData.timestamps,
        assets: lanyardData.assets,
        sync_id: lanyardData.sync_id,
        created_at: lanyardData.created_at,
        party: lanyardData.party,
      } : null,
      last_played_song: {
        song: latestSong.track.name,
        artist: latestSong.track.artists.map(artist => artist.name).join(', '),
        album: latestSong.track.album.name,
        played_at: latestSong.played_at,
      },
      previous_songs: previousSongs.map(item => ({
        song: item.track.name,
        artist: item.track.artists.map(artist => artist.name).join(', '),
        album: item.track.album.name,
        played_at: item.played_at,
      })),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recently played songs or Lanyard data' });
  }
};
