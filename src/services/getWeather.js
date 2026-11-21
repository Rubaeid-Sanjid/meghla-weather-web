export const getWeather = async (place) => {
 const { name, latitude, longitude } = place; 
  const apiKey = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,rain,showers,precipitation,relative_humidity_2m,is_day,wind_speed_10m,wind_direction_10m,apparent_temperature,weather_code,snowfall`;

    const response = await fetch(apiKey);
    const data = await response.json();
    
    const now = data.current;

    if (!now) {
        throw new Error("Failed to fetch weather data");
    }
    return {
        location: name,
        temperature: Math.round(now.temperature_2m),
        humidity: now.relative_humidity_2m,
        windSpeed: now.wind_speed_10m,
        windDirection: now.wind_direction_10m,
        latitude,
        longitude,
    };
};