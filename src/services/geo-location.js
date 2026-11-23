export const getGeoLocation = async (city) => {
    const params = new URLSearchParams({
        name: city.trim(),
        count: "5",
        language: "en",
        format: "json",
    });
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);

    if (!response.ok) {
        throw new Error("Could not search for that city. Please try again.");
    }

    const data = await response.json();
    const place = data.results?.[0];

    if (!place) {
        throw new Error(`No results found for "${city.trim()}". Check the spelling and try again.`);
    }

    return {
        name: [place.name, place.country].filter(Boolean).join(", "),
        latitude: place.latitude,
        longitude: place.longitude,
    };
};

export const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Your browser does not support location detection."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve({
                    name: "Your current location",
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            },
            (error) => {
                const messages = {
                    1: "Location access was denied. Allow location access in your browser and try again.",
                    2: "Your location could not be determined. Please try again.",
                    3: "Location request timed out. Please try again.",
                };
                reject(new Error(messages[error.code] || "Could not detect your location."));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
        );
    });