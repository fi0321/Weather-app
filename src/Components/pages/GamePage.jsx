import React, { useEffect, useState } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import { TiArrowSortedDown } from 'react-icons/ti';
import { cities } from '../../data';

const API_URL_W = 'https://api.open-meteo.com/v1/forecast?';
const API_URL_C = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';
const API_URL_P = 'https://api.unsplash.com/search/photos?';
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

    setTemperature(data.current.temperature_2m);
  };
  const load2 = async (city) => {
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

    setTemperature2(data.current.temperature_2m);
  };
  const changeCityHigher = () => {
    setShowTemperature2(true);
    if (temperature2 > temperature) {
      setTimeout(() => {
        setShowTemperature2(false);
        const newRandom1 = Math.floor(Math.random() * cities.length);
        const newRandom2 = Math.floor(Math.random() * cities.length);
        setRandom1(newRandom1);
        setNeedcity(cities[newRandom1].city);
        setRandom2(newRandom2);
        setNeedcity2(cities[newRandom2].city);
        setScore(score + 1);
      }, 1000);
    } else {
      setCorrect(false);
    }
  };
  const changeCityLower = () => {
    setShowTemperature2(true);
    if (temperature2 < temperature) {
      setTimeout(() => {
        setShowTemperature2(false);
        const newRandom1 = Math.floor(Math.random() * cities.length);
        const newRandom2 = Math.floor(Math.random() * cities.length);
        setRandom1(newRandom1);
        setNeedcity(cities[newRandom1].city);
        setRandom2(newRandom2);
        setNeedcity2(cities[newRandom2].city);
        setScore(score + 1);
      }, 1000);
    } else {
      setCorrect(false);
    }
  };
  useEffect(() => {
    load(cities.find((item) => item.city === Needcity));
    load2(cities.find((item) => item.city === Needcity2));
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
        <Frontlabel
          Needcity2={Needcity2}
          Needcity={Needcity}
          changeCityHigher={changeCityHigher}
          changeCityLower={changeCityLower}
          showTemperature2={showTemperature2}
        ></Frontlabel>
      ) : (
        <Frontlabel2
          Needcity2={Needcity2}
          Needcity={Needcity}
          changeCityHigher={changeCityHigher}
          changeCityLower={changeCityLower}
          score={score}
        ></Frontlabel2>
      )}

      <div className='fixed bottom-0 left-0 m-5'>
        <p className='text-white text-4xl'>Score: {score}</p>
      </div>
    </>
  );
};
const CityCompare = ({
  Needcity,
  Needcity2,
  temperature,
  temperature2,
  isLoaded,
  setIsLoaded,
  showTemperature2,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);

    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [Needcity, Needcity2]);
  return (
    <div
      className={`absolute flex w-full h-screen transition-transform duration-1000 ${
        show ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='w-1/2 relative'>
        <img
          src={cities.find((item) => item.city === Needcity).image}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover`}
          alt='City view'
        />
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60'>
          <div className='text-white text-7xl font-semibold'>
            <p>{Needcity}</p>
            <p className='text-center '>{temperature}°C</p>
          </div>
        </div>
      </div>
      <div className='w-1/2 relative'>
        <img
          src={cities.find((item) => item.city === Needcity2).image}
          className={`w-full h-full object-cover 
          `}
          alt='City view'
        />
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60'>
          <div className='text-white text-7xl font-semibold'>
            <p>{Needcity2}</p>

            <div
              className={`transition-opacity duration-2000 ease-out ${
                showTemperature2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className='text-center '>{temperature2}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Frontlabel = ({
  Needcity2,
  Needcity,
  changeCityHigher,
  changeCityLower,
  showTemperature2,
}) => {
  return (
    <div className='absolute flex  justify-center items-center h-screen w-full '>
      <div className='flex flex-col m-5 '>
        {!showTemperature2 && (
          <>
            <p className='text-center text-yellow-200 text-4xl '>
              Does{' '}
              <span className='italic font-serif text-4xl font-semibold'>
                {Needcity2}
              </span>{' '}
              have a
            </p>{' '}
            <div className='flex flex-col items-center w-auto'>
              <button
                className='group rounded-full  bg-amber-400/40 hover:hover:bg-amber-600/60 hover:border-white text-yellow text-5xl px-5 py-3 m-5 border-2'
                onClick={changeCityHigher}
              >
                <div className='px-5 pt-3  flex justify-center group-hover:motion-reduce:animate-bounce'>
                  <TiArrowSortedUp className='text-white'></TiArrowSortedUp>
                </div>
                <div className='px-5 py-2 text-white'>Higher</div>
              </button>

              <button
                className='group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-5 hover:border-white text-yellow text-5xl px-5 py-3 border-2'
                onClick={changeCityLower}
              >
                <div className='px-5 py-2 text-white'>Lower</div>
                <div className='px-5 pt-3  flex justify-center group-hover:motion-reduce:animate-bounce'>
                  <TiArrowSortedDown className='	text-white			'></TiArrowSortedDown>
                </div>
              </button>
              <p className='text-center text-yellow-200 text-4xl '>
                temperature than{' '}
                <span className='italic font-serif text-4xl font-semibold'>
                  {Needcity}
                </span>
                ?
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const Frontlabel2 = ({ score }) => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div className='absolute flex  justify-center items-center h-screen w-full '>
      <div className='flex flex-col m-5 '>
        <p className='text-center text-yellow-200 text-4xl '>
          You got it wrong
        </p>
        <div className='flex flex-col items-center w-auto'>
          <button
            className='group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-5 hover:border-white text-yellow text-5xl px-5 py-3 border-2'
            onClick={refreshPage}
          >
            <div className='px-5 py-2 text-white'>Reset Game</div>
          </button>
          <p className='text-center text-yellow-200 text-4xl '>
            Your Score is{' '}
            <span className='italic  text-4xl font-semibold'>{score}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
