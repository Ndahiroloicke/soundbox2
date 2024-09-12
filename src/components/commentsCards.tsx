import React from 'react';

interface CommentsCardsProps {
  image: string;
  name: string;
  role: string;
  comment: string;
}

const CommentsCards: React.FC<CommentsCardsProps> = ({ image, name, role, comment }) => {
  return (
    <div className='border-2 flex z-10 flex-col rounded-3xl bg-gradient-to-br from-gray-600 to-gray-800 border-white w-full md:w-auto p-6 md:p-8 lg:p-10'>
      <div className='flex flex-row gap-x-5'>
        <img className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full' src={image} alt={name} />
        <div>
          <h1 className='text-lg md:text-xl lg:text-2xl font-bold'>{name}</h1>
          <p className='font-extralight text-sm md:text-base'>{role}</p>
        </div>
      </div>
      <div className='mt-6 lg:mt-8'>
        <p className='font-extralight text-sm md:text-base lg:w-80'>{comment}</p>
      </div>
    </div>
  );
}

export default CommentsCards;
