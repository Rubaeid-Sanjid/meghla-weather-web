import { useState } from "react";
import LocationsModal from "../Components/Locations_modal";

export const Home = () => {
  const [test, setTest] = useState(false);

  // console.log(test);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Meghla Weather</h1>
        <p className="py-4 text-gray-600">Check your weather with Meghla</p>

        <div>
          <button onClick={() => setTest(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Check Weather
          </button>
        </div>

        {test && <LocationsModal onClose={() => setTest(false)} />}
    </div>
  )
}

export default Home;