import React, { useEffect, useState } from 'react';

const API_URL = 'https://api.open-meteo.com/v1/forecast?';
const GamePage = () => {
  const [temperature, setTemperature] = useState(null);
  const load = async () => {
    const response = await fetch(
      API_URL +
        new URLSearchParams({
          longitude: '52.50589376076404',
          latitude: '13.375286232737526',
          current: 'temperature_2m',
          forecast_days: 1,
        })
    );

    console.log(response);
    const data = await response.json();
    console.log(data);
    setTemperature(data.current.temperature_2m);
    console.log(temperature);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1> Current Temperature is {temperature} C </h1>
    </div>
  );
};

export default GamePage;
