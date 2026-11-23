import { X } from "lucide-react";
import { useState } from "react";
import { getGeoLocation } from "../services/geo-location";
import { useNavigate } from "react-router";

const LocationsModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const goTOWeatherPage = (locationData) => {
    navigate("/weather", { state: { locationData } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const enteredCity = city.trim();
    
    if (enteredCity) {
      try {
        const locationData = await getGeoLocation(enteredCity);
        // console.log("Location data:", locationData);
        if (!locationData) {
          setError("No location data found for the entered city.");
        } else {
          goTOWeatherPage(locationData);
        }
      } catch (error) {
        console.error("Error fetching geo location data:", error);
      }

      onClose();

    } else {
      setError("Please enter a city name.");
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // console.log("Using current location:", latitude, longitude);
        goTOWeatherPage({ name: "Your Current Location", latitude, longitude });
        onClose();
      }, (error) => {
        console.error("Error getting location:", error);
      },{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-center relative">
        <h3 className="text-gray-600">Where are you today?</h3>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X />
        </button>

        <div>
          <form onSubmit={handleSubmit} action="">
            <input
              type="text"
              className="w-full p-2 border rounded-2xl"
              placeholder="Enter your city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Get Weather
              </button>
            </div>
          </form>
        </div>
        <h3 className="text-gray-600">Or</h3>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleUseLocation}
          >
            Use My Location
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LocationsModal;
