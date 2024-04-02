import { useEffect, useState } from "react";
import { cities } from "../data";
import CityCompare from "../components/CityCompare";
import ButtonOverlay from "../components/ButtonOverlay";
import GameOver from "../components/GameOver";

const API_URL_WEATHER = "https://api.open-meteo.com/v1/forecast?";

const GamePage = () => {
  const [score, setScore] = useState(0);

  const [city1, setCity1] = useState();
  const [city2, setCity2] = useState();
  const [city1Temperature, setCity1Temperature] = useState();
  const [city2Temperature, setCity2Temperature] = useState();

  const [isLoaded, setIsLoaded] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [showTemperature2, setShowTemperature2] = useState(false);

  const loadCityWeather = async (city) => {
    const response = await fetch(
      API_URL_WEATHER +
        new URLSearchParams({
          longitude: city.longitude,
          latitude: city.latitude,
          current: "temperature_2m",
          forecast_days: 1,
        })
    );
    const data = await response.json();

    return data;
  };

  const getNewCities = () => {
    // Get new random cities
    const newCityIndex1 = Math.floor(Math.random() * cities.length);
    let newCity2Index = Math.floor(Math.random() * cities.length);
    // Make sure the new cities are different
    while (newCity2Index === newCityIndex1) {
      newCity2Index = Math.floor(Math.random() * cities.length);
    }

    // Set the new cities
    setCity1(cities[newCityIndex1]);
    setCity2(cities[newCity2Index]);
  };

  const changeCity = async (guessCity2TemperatureIsHigher) => {
    // Check if the temperature of city 2 is higher than city 1
    const city2TempIsHigher = city2Temperature > city1Temperature;

    // Show temp 2
    setShowTemperature2(true);

    // Check if the guess is correct
    if (guessCity2TemperatureIsHigher === city2TempIsHigher) {
      // If correct

      // Wait 1 second
      await new Promise((r) => setTimeout(r, 1000));

      // Hide temp 2
      setShowTemperature2(false);
      // Get new random cities
      getNewCities();

      // Set the new temperatures
      setScore(score + 1);
    } else {
      // If incorrect
      setCorrect(false);
    }
  };

  /**
   * Loads the temperature of the two cities
   */
  const loadCityTemperatures = async () => {
    const city1Weather = await loadCityWeather(
      cities.find((item) => item.city === city1.city)
    );
    setCity1Temperature(city1Weather.current.temperature_2m);

    const city2Weather = await loadCityWeather(
      cities.find((item) => item.city === city2.city)
    );
    setCity2Temperature(city2Weather.current.temperature_2m);
  };

  useEffect(() => {
    // Check if the cities are loaded
    if (!city1 || !city2) {
      // If not, get new cities
      getNewCities();
    }
    // If the cities are loaded
    else {
      // Load the temperatures
      loadCityTemperatures();
    }
  }, [city1, city2]);

  if (!city1 || !city2) return null;

  return (
    <>
      <CityCompare
        city1={city1}
        city2={city2}
        city1Temperature={city1Temperature}
        city2Temperature={city2Temperature}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        showTemperature2={showTemperature2}
      />
      {correct ? (
        <ButtonOverlay
          city1={city1}
          city2={city2}
          changeCity={changeCity}
          showTemperature2={showTemperature2}
        />
      ) : (
        <GameOver score={score} />
      )}

      <div className="fixed bottom-0 left-0 m-5">
        <p className="text-white text-4xl">Score: {score}</p>
      </div>
    </>
  );
};

export default GamePage;
