import React, { useState } from 'react';
import play from '../assets/playbutton.png';


interface TopsongProps {
  rank: number;
  title: string;
  artist: string;
  imageUrl: string;
  previewUrl: string | null;
  onPlay: (previewUrl: string | null) => void; 
  isPlaying: boolean;
}

const Topsong: React.FC<TopsongProps> = ({ rank, title, artist, imageUrl, previewUrl, onPlay }) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handlePlayPreview = () => {
    setShowNotification(false); 
    if (!previewUrl) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    onPlay(previewUrl); 
  };

  return (
    <div>
      {showNotification && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white py-2 text-center z-50">
          This song does not support Preview listening
        </div>
      )}
      <div className='flex flex-row gap-x-6 items-center'>
        <h1 className='font-bold'>#{rank < 10 ? `0${rank}` : rank}</h1>
        <div className='flex flex-row gap-2'>
          <img src={imageUrl} alt={title} className='w-10 h-10 rounded-lg' />
          <div className='text-sm w-32 overflow-hidden whitespace-nowrap text-ellipsis'>
            <h1 className='font-bold text-xs'>{title}</h1>
            <p className='text-gray-500 text-xs'>{artist}</p>
          </div>
        </div>
        <img
          src={play}
          alt="play"
          onClick={handlePlayPreview}
          className={`w-6 h-6 cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default Topsong;
