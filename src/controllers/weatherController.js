const axios = require('axios');
require('dotenv').config();

exports.getWeather = async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const city = 'Mumbai';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    const weatherData = response.data;
    const formattedData = {
      city: weatherData.name,
      temp: weatherData.main.temp,           // Temperature in Celsius
      precipitation: weatherData.weather[0].description, // Weather condition
      wind: `${weatherData.wind.speed} m/s`, // Wind speed
      date: new Date().toLocaleDateString(), // Current date
      time: new Date().toLocaleTimeString(), // Current time
      haze: weatherData.weather[0].main,     // General weather description (e.g., Clear, Haze)
      celcius: weatherData.main.temp,        // Celsius
      fahrenheit: (weatherData.main.temp * 9/5) + 32 // Convert Celsius to Fahrenheit
    };

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
