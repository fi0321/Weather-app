import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const CityCompare = ({
  city1,
  city2,
  city1Temperature,
  city2Temperature,
  //   isLoaded,
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
  }, [city1, city2]);
  return (
    <div
      className={`absolute flex w-full h-screen transition-transform duration-1000 ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-1/2 relative">
        <img
          src={city1.image}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover`}
          alt="City view"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60">
          <div className="text-white text-7xl font-semibold">
            <p>{city1.city}</p>
            <p className="text-center ">{city1Temperature}°C</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 relative">
        <img
          src={city2.image}
          className={`w-full h-full object-cover 
            `}
          alt="City view"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60">
          <div className="text-white text-7xl font-semibold">
            <p>{city2.city}</p>

            <div
              className={`transition-opacity duration-2000 ease-out ${
                showTemperature2 ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-center ">{city2Temperature}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCompare;
