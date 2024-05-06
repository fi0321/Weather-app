const GameOver = ({ score, resetGame }) => {
  return (
    <div className='absolute flex justify-center items-center h-screen w-full'>
      <div className='flex flex-col m-2 md:m-5'>
        <p className='text-center text-yellow-200 text-2xl md:text-4xl'>
          You got it wrong
        </p>
        <div className='flex flex-col items-center w-auto'>
          <button
            className='group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-1 md:m-5 p-3 md:p-5 hover:border-white text-yellow text-xl md:text-5xl border-2'
            onClick={resetGame}
          >
            <div className='px-2 md:px-5 py-2 text-white'>Reset Game</div>
          </button>
          <p className='text-center text-yellow-200 text-2xl md:text-4xl'>
            Your Score is <span className='italic text-2xl md:text-4xl font-semibold'>{score}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
