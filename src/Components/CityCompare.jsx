import { useEffect, useState } from 'react';
import { cities } from '../data';

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
    <div className={`absolute flex w-full h-screen transition-transform duration-1000 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='w-full md:w-1/2 relative'>
        <img
          src={cities.find((item) => item.city === Needcity).image}
          onLoad={() => setIsLoaded(true)}
          className='w-full h-full object-cover'
          alt='City view'
        />
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60'>
          <div className='text-white text-3xl md:text-7xl font-semibold'>
            <p>{Needcity}</p>
            <p className='text-center'>{temperature}°C</p>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 relative'>
        <img
          src={cities.find((item) => item.city === Needcity2).image}
          className='w-full h-full object-cover'
          alt='City view'
        />
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60'>
          <div className='text-white text-3xl md:text-7xl font-semibold'>
            <p>{Needcity2}</p>
            <div className={`transition-opacity duration-2000 ease-out ${showTemperature2 ? 'opacity-100' : 'opacity-0'}`}>
              <p className='text-center'>{temperature2}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCompare;
