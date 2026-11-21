export const getGeoLocation = async (city) => {
    // console.log("Getting current location for city:", city);

    const apiKey = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`; // Replace with your actual API key

    const response = await fetch(apiKey);

    if(!response.ok) {
        throw new Error("Failed to fetch geo location data");
    }

    const data = await response.json();

    const place = data.results[0];

    return {
        name : place.name,
        latitude: place.latitude,
        longitude: place.longitude,
    };
}