import React, { useEffect, useState } from 'react';

import GameOver from '../Components/GameOver';
import OverLay from '../Components/OverLay';
import CityCompare from '../Components/CityCompare';

import { cities } from '../data';

const API_URL_W = 'https://api.open-meteo.com/v1/forecast?';

const GamePage = () => {
  const [temperature, setTemperature] = useState(null);
  const [temperature2, setTemperature2] = useState(null);
  const [score, setScore] = useState(0);

  const [random1, setRandom1] = useState(Math.floor(Math.random() * 50));
  const [random2, setRandom2] = useState(Math.floor(Math.random() * 50));
  const [Needcity2, setNeedcity2] = useState(cities[random1].city);
  const [Needcity, setNeedcity] = useState(cities[random2].city);
  const [isLoaded, setIsLoaded] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [showTemperature2, setShowTemperature2] = useState(false);

  const load = async (city) => {
    const response = await fetch(
      API_URL_W +
        new URLSearchParams({
          longitude: city.longitude,
          latitude: city.latitude,
          current: 'temperature_2m',
          forecast_days: 1,
        })
    );
    const data = await response.json();
    return data.current.temperature_2m;
  };

  const loadtemperature = async () => {
    const firstTemp = await load(cities.find((item) => item.city === Needcity));
    setTemperature(firstTemp);
    const secondTemp = await load(
      cities.find((item) => item.city === Needcity2)
    );
    setTemperature2(secondTemp);
  };

  const changeCity = (isHigher) => {
    const conditionMet = isHigher
      ? temperature2 > temperature
      : temperature2 < temperature;
    setShowTemperature2(true);
    if (conditionMet) {
      setTimeout(() => {
        setShowTemperature2(false);
        updateCitiesAndScore();
      }, 1000);
    } else {
      setCorrect(false);
    }
  };

  const updateCitiesAndScore = () => {
    const newRandom1 = Math.floor(Math.random() * cities.length);
    const newRandom2 = Math.floor(Math.random() * cities.length);
    setRandom1(newRandom1);
    setNeedcity(cities[newRandom1].city);
    setRandom2(newRandom2);
    setNeedcity2(cities[newRandom2].city);
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    loadtemperature();
  }, [Needcity, Needcity2]);

  return (
    <>
      <CityCompare
        Needcity={Needcity}
        Needcity2={Needcity2}
        temperature={temperature}
        temperature2={temperature2}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        showTemperature2={showTemperature2}
      ></CityCompare>
      {correct ? (
        <OverLay
          Needcity2={Needcity2}
          Needcity={Needcity}
          changeCity={changeCity}
          showTemperature2={showTemperature2}
        ></OverLay>
      ) : (
        <GameOver score={score}></GameOver>
      )}

      <div className='fixed bottom-0 left-0 m-5'>
        <p className='text-white text-4xl'>Score: {score}</p>
      </div>
    </>
  );
};

export default GamePage;
