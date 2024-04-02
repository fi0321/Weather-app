/* eslint-disable react/prop-types */
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

const ButtonOverlay = ({ city1, city2, changeCity, showTemperature2 }) => {
  return (
    <div className="absolute flex justify-center items-center h-screen w-full ">
      <div className="flex flex-col m-5 ">
        {!showTemperature2 && (
          <>
            <p className="text-center text-yellow-200 text-4xl ">
              Does{" "}
              <span className="italic font-serif text-4xl font-semibold">
                {city2.city}
              </span>{" "}
              have a
            </p>{" "}
            <div className="flex flex-col items-center w-auto">
              <button
                className="group rounded-full bg-amber-400/40 hover:hover:bg-amber-600/60 hover:border-white text-yellow text-5xl px-5 py-3 m-5 border-2"
                onClick={() => changeCity(true)}
              >
                <div className="px-5 pt-3  flex justify-center group-hover:motion-reduce:animate-bounce">
                  <TiArrowSortedUp className="text-white"></TiArrowSortedUp>
                </div>
                <div className="px-5 py-2 text-white">Higher</div>
              </button>

              <button
                className="group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-5 hover:border-white text-yellow text-5xl px-5 py-3 border-2"
                onClick={() => changeCity(false)}
              >
                <div className="px-5 py-2 text-white">Lower</div>
                <div className="px-5 pt-3  flex justify-center group-hover:motion-reduce:animate-bounce">
                  <TiArrowSortedDown className="text-white"></TiArrowSortedDown>
                </div>
              </button>
              <p className="text-center text-yellow-200 text-4xl ">
                temperature than{" "}
                <span className="italic font-serif text-4xl font-semibold">
                  {city1.city}
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

export default ButtonOverlay;
