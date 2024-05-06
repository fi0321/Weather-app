import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

const OverLay = ({ Needcity2, Needcity, changeCity, showTemperature2 }) => {
  return (
    <div className='absolute flex justify-center items-center h-screen w-full'>
      <div className='flex flex-col m-2 md:m-5'>
        {!showTemperature2 && (
          <>
            <p className='text-center text-yellow-200 text-xl md:text-4xl'>
              Does <span className='italic font-serif text-xl md:text-4xl font-semibold'>{Needcity2}</span> have a
            </p>
            <div className='flex flex-col items-center w-auto'>
              <button
                className='group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-1 md:m-5 p-3 md:p-5 hover:border-white text-yellow text-lg md:text-5xl border-2'
                onClick={() => changeCity(true)}
              >
                <div className='px-2 md:px-5 pt-3 flex justify-center group-hover:motion-reduce:animate-bounce'>
                  <TiArrowSortedUp className='text-white' />
                </div>
                <div className='text-white'>Higher</div>
              </button>

              <button
                className='group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-1 md:m-5 p-3 md:p-5 hover:border-white text-yellow text-lg md:text-5xl border-2'
                onClick={() => changeCity(false)}
              >
                <div className='text-white'>Lower</div>
                <div className='px-2 md:px-5 pt-3 flex justify-center group-hover:motion-reduce:animate-bounce'>
                  <TiArrowSortedDown className='text-white' />
                </div>
              </button>
              <p className='text-center text-yellow-200 text-xl md:text-4xl'>
                temperature than <span className='italic font-serif text-xl md:text-4xl font-semibold'>{Needcity}</span>?
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverLay;
