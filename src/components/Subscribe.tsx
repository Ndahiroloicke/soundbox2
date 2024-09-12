const Subscribe = () => {
  return (
    <div className='text-white bg-gradient-to-tr from-slate-700 to-slate-800 bg-opacity-40 rounded-3xl mt-20 md:mt-32 lg:mt-40 mx-5 md:mx-20 lg:mx-40 border-2 border-white py-10 md:py-14'>
      <h1 className='text-center md:text-left md:ml-[100px] lg:ml-[150px] mb-5 md:mb-3 text-3xl md:text-4xl lg:text-5xl font-bold'>
        SUBSCRIBE US
      </h1>
      <p className='text-center md:text-left mx-5 md:mx-20 lg:mx-40 text-base md:text-xl lg:text-2xl font-extralight'>
        You can upgrade, downgrade, or cancel your subscription anytime.
      </p>
      <div className='flex flex-col md:flex-row mt-8 md:mt-10 mx-5 md:mx-20 lg:mx-32 gap-y-4 md:gap-y-0 md:gap-x-3'>
        <input
          type='email'
          className='w-full md:w-[70%] lg:w-[80%] h-12 md:h-14 px-5 md:px-7 rounded-xl bg-[#162A47]'
          placeholder='johndoe@gmail.com'
        />
        <button className='w-full md:w-[30%] lg:w-[20%] bg-[#B6FF52] h-12 md:h-14 rounded-xl text-black font-bold'>
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
