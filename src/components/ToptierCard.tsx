import React from 'react';

// Define an interface for the props
interface ToptierCardProps {
  image: string;
  heading: string;
  para: string;
}

// Use the interface to type the props in the functional component
const ToptierCard: React.FC<ToptierCardProps> = ({ image, heading, para }) => {
  return (
    <div className='flex flex-col items-center bg-gradient-to-tr from-blue-950 to-slate-900 px-6 sm:px-8 py-8 sm:py-12 rounded-3xl border-2 border-white w-full sm:w-auto'>
      <div className='w-24 sm:w-32 mb-4 sm:mb-6'>
        <img src={image} alt="" className='w-full h-auto' />
      </div>
      <div className='text-center mb-4 sm:mb-6'>
        <h1 className='text-lg sm:text-2xl font-semibold'>{heading}</h1>
      </div>
      <div className='text-center font-extralight'>
        <p className='text-sm sm:text-base'>{para}</p>
      </div>
    </div>
  );
}

export default ToptierCard;
