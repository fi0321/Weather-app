import React from 'react';
import myImage from './../assets/sean-oulashin-KMn4VEeEPR8-unsplash.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const hello = () => {
    navigate('./game');
  };
  return (
    <>
      <img src={myImage} className='absolute w-full h-screen object-cover' alt='' />
      <div className='bg-black/50 absolute flex items-center justify-center h-screen w-full'>
        <div className='w-5/6 md:w-1/2 h-1/2 flex flex-col items-center justify-center text-stone-50'>
          <p className='text-center text-4xl md:text-6xl font-bold p-3'>
            The <br />
            Higher Lower
            <br /> Game
          </p>
          <p className='text-center text-lg md:text-3xl mt-4 md:mt-10 p-3'>
            Guess if the temperature of a city is higher or lower than another city
          </p>
          <button
            className='mt-8 md:mt-20 bg-amber-300/40 text-white text-lg md:text-5xl rounded-full py-2 md:py-4 px-6 md:px-12 text-wrap hover:bg-amber-600/60'
            onClick={hello}
          >
            Play Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
