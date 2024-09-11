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
    <div className='flex justify-between flex-col bg-gradient-to-tr to-slate-900 from-blue-950 px-8 rounded-3xl border-2 border-white w-fit py-16'>
      <div className='w-[260px] mb-8'>
        <img src={image} alt="" className='size-14' />
      </div>
      <div className='w-[260px] mb-6'>
        <h1 className='font-semibold text-2xl'>{heading}</h1>
      </div>
      <div className='w-[260px] font-extralight'>
        <p>{para}</p>
      </div>
    </div>
  );
}

export default ToptierCard;
