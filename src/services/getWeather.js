export const WMO_CODES = {
    0: {
        condition: "Clear",
        description: "Clear sky",
        icon: "☀️",
        label: "Clear Sky",
    },
    1: {
        condition: "Mainly Clear",
        description: "Mainly clear sky",
        icon: "⛅",
        label: "Mainly Clear",
    },
    2: {
        condition: "Partly Cloudy",
        description: "Partly cloudy",
        icon: "⛅",
        label: "Partly Cloudy",
    },
    3: {
        condition: "Overcast",
        description: "Overcast sky",
        icon: "☁️",
        label: "Overcast",
    },
    45: {
        condition: "Fog",
        description: "Fog",
        icon: "🌫️",
        label: "Fog",
    },
    48: {
        condition: "Rime Fog",
        description: "Depositing rime fog",
        icon: "🌫️",
        label: "Rime Fog",
    },
    51: {
        condition: "Light Drizzle",
        description: "Light drizzle",
        icon: "🌦️",
        label: "Light Drizzle",
    },
    53: {
        condition: "Moderate Drizzle",
        description: "Moderate drizzle",
        icon: "🌦️",
        label: "Moderate Drizzle",
    },
    55: {
        condition: "Dense Drizzle",
        description: "Dense drizzle",
        icon: "🌧️",
        label: "Dense Drizzle",
    },
    56: {
        condition: "Light Freezing Drizzle",
        description: "Light freezing drizzle",
        icon: "🌧️",
        label: "Light Freezing Drizzle",
    },
    57: {
        condition: "Dense Freezing Drizzle",
        description: "Dense freezing drizzle",
        icon: "🌧️",
        label: "Dense Freezing Drizzle",
    },
    61: {
        condition: "Slight Rain",
        description: "Slight rain",
        icon: "🌦️",
        label: "Slight Rain",
    },
    63: {
        condition: "Moderate Rain",
        description: "Moderate rain",
        icon: "🌧️",
        label: "Moderate Rain",
    },
    65: {
        condition: "Heavy Rain",
        description: "Heavy rain",
        icon: "🌧️",
        label: "Heavy Rain",
    },
    66: {
        condition: "Light Freezing Rain",
        description: "Light freezing rain",
        icon: "🌧️",
        label: "Light Freezing Rain",
    },
    67: {
        condition: "Heavy Freezing Rain",
        description: "Heavy freezing rain",
        icon: "🌧️",
        label: "Heavy Freezing Rain",
    },
    71: {
        condition: "Slight Snowfall",
        description: "Slight snowfall",
        icon: "🌨️",
        label: "Slight Snowfall",
    },
    73: {
        condition: "Moderate Snowfall",
        description: "Moderate snowfall",
        icon: "🌨️",
        label: "Moderate Snowfall",
    },
    75: {
        condition: "Heavy Snowfall",
        description: "Heavy snowfall",
        icon: "❄️",
        label: "Heavy Snowfall",
    },
    77: {
        condition: "Snow Grains",
        description: "Snow grains",
        icon: "🌨️",
        label: "Snow Grains",
    },
    80: {
        condition: "Slight Rain Showers",
        description: "Slight rain showers",
        icon: "🌦️",
        label: "Slight Rain Showers",
    },
    81: {
        condition: "Moderate Rain Showers",
        description: "Moderate rain showers",
        icon: "🌧️",
        label: "Moderate Rain Showers",
    },
    82: {
        condition: "Violent Rain Showers",
        description: "Violent rain showers",
        icon: "⛈️",
        label: "Violent Rain Showers",
    },
    85: {
        condition: "Slight Snow Showers",
        description: "Slight snow showers",
        icon: "🌨️",
        label: "Slight Snow Showers",
    },
    86: {
        condition: "Heavy Snow Showers",
        description: "Heavy snow showers",
        icon: "❄️",
        label: "Heavy Snow Showers",
    },
    95: {
        condition: "Thunderstorm",
        description: "Thunderstorm",
        icon: "⛈️",
        label: "Thunderstorm",
    },
    96: {
        condition: "Thunderstorm with Slight Hail",
        description: "Thunderstorm with slight hail",
        icon: "⛈️",
        label: "Thunderstorm with Slight Hail",
    },
    99: {
        condition: "Thunderstorm with Heavy Hail",
        description: "Thunderstorm with heavy hail",
        icon: "⛈️",
        label: "Thunderstorm with Heavy Hail",
    },
};

export const getWeather = async (place, { signal } = {}) => {
    const { name, latitude, longitude } = place;
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "is_day",
            "wind_speed_10m",
            "wind_direction_10m",
            "apparent_temperature",
            "weather_code",
            "precipitation",
        ].join(","),
        wind_speed_unit: "ms",
        timezone: "auto",
    });
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`,
        { signal },
    );

    if (!response.ok) {
        throw new Error("Could not load weather data. Please try again.");
    }

    const data = await response.json();
    const now = data.current;

    if (!now) {
        throw new Error("Weather data is unavailable for this location.");
    }

    const weather = WMO_CODES[now.weather_code] || {
        condition: "Unknown",
        description: "Unknown weather condition",
        icon: "❓",
        label: "Unknown",
    };

    const icon = now.weather_code === 0 && now.is_day === 0 ? "🌙" : weather.icon;

    return {
        location: name,
        temperature: Math.round(now.temperature_2m),
        humidity: now.relative_humidity_2m,
        windSpeed: Math.round(now.wind_speed_10m * 10) / 10,
        windDirection: now.wind_direction_10m,
        feelsLike: Math.round(now.apparent_temperature),
        weatherCode: now.weather_code,
        isDay: now.is_day,
        precipitation: now.precipitation,
        condition: weather.condition,
        description: weather.description,
        icon,
        conditionLabel: weather.label,
    };
};