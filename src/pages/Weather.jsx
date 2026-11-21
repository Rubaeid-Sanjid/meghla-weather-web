import { useLocation } from "react-router";
import { getWeather } from "../services/getWeather";

const Weather = () => {
  const location = useLocation();
  const locationData = location.state?.locationData;

  const fetchWeatherData = async () => {
    try {
      const weatherData = await getWeather(locationData);
      console.log("Weather data:", weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  fetchWeatherData();
  return (
    <div>
      <h1>Weather</h1>
      <p>This is the weather page.</p>
    </div>
  );
};

export default Weather;
