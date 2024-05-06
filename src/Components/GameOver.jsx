const GameOver = ({ score, resetGame }) => {
  return (
    <div className='absolute flex justify-center items-center h-screen w-full '>
      <div className='flex flex-col m-5 '>
        <p className='text-center text-yellow-200 text-4xl '>
          You got it wrong
        </p>
        <div className='flex flex-col items-center w-auto'>
          <button
            className='group rounded-full bg-amber-400/40 hover:bg-amber-600/60 m-5 hover:border-white text-yellow text-5xl px-5 py-3 border-2'
            onClick={resetGame}
          >
            <div className='px-5 py-2 text-white'>Reset Game</div>
          </button>
          <p className='text-center text-yellow-200 text-4xl '>
            Your Score is{' '}
            <span className='italic text-4xl font-semibold'>{score}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
