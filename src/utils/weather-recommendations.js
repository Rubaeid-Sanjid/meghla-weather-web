const RAIN_WEATHER_CODES = new Set([
    51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
]);
const SNOW_WEATHER_CODES = new Set([71, 73, 75, 77, 85, 86]);

export const getWeatherRecommendations = (weather) => {
    const recommendations = [];
    const weatherCode = Number(weather.weatherCode);

    if (SNOW_WEATHER_CODES.has(weatherCode)) {
        recommendations.push({
            icon: "❄️",
            title: "Prepare for snowfall",
            description: "Wear warm, water-resistant layers and allow extra time outside.",
        });
    } else if (RAIN_WEATHER_CODES.has(weatherCode) || weather.precipitation > 0) {
        recommendations.push({
            icon: "☂️",
            title: "Bring an umbrella",
            description: "Wet weather is possible. A light waterproof layer can help too.",
        });
    }

    if (weather.temperature >= 30) {
        recommendations.push({
            icon: "☀️",
            title: "Stay cool and hydrated",
            description: "Choose light clothing, drink water, and take breaks in the shade.",
        });
    } else if (weather.temperature <= 10) {
        recommendations.push({
            icon: "🧥",
            title: "Dress for the chill",
            description: "A warm layer will help you stay comfortable outside.",
        });
    }

    if (weather.windSpeed >= 8) {
        recommendations.push({
            icon: "💨",
            title: "Expect breezy conditions",
            description: "Secure loose items and consider a wind-resistant outer layer.",
        });
    }

    if (weather.humidity >= 75 && recommendations.length < 3) {
        recommendations.push({
            icon: "💧",
            title: "Keep it breathable",
            description: "Breathable clothing may feel more comfortable in humid air.",
        });
    }

    if (recommendations.length === 0) {
        recommendations.push({
            icon: "🌤️",
            title: "Enjoy the day",
            description: "Conditions look comfortable for your usual outdoor plans.",
        });
    }

    return recommendations.slice(0, 3);
};
