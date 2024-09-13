import React from 'react';
import play from '../assets/playbutton.png';
import { useState } from 'react';
import BottomPlayer from './bottomplayer';

interface TopsongProps {
  rank: number;
  title: string;
  artist: string;
  imageUrl: string;
  previewUrl: string | null;
  onPlay: (previewUrl: string | null) => void; // Add this prop
}

const Topsong: React.FC<TopsongProps> = ({ rank, title, artist, imageUrl, previewUrl, onPlay }) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [clickPlay, setClickPlay] = useState<boolean>(false);

  const handlePlayPreview = () => {
    if (!previewUrl) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    setClickPlay(true)
    setIsPlaying(true) // Call the onPlay function
  };

  const handleNotificationChange = (show: boolean) => {
    setShowNotification(show);
    if (show) {
      setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
    }
  }

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
          <img src={imageUrl} alt={title} className='size-10 rounded-lg' />
          <div className='text-sm w-20'>
            <h1 className='font-bold text-xs'>{title}</h1>
            <p className='text-gray-500 text-xs'>{artist}</p>
          </div>
        </div>
        <img src={play} alt="play" onClick={handlePlayPreview} className='size-6 cursor-pointer' />
      </div>
      {
        isPlaying && (
          <BottomPlayer
          clickPlay={clickPlay}
          image={imageUrl}
          songname={title}
          previewUrl={previewUrl}
          artistname={artist}
          onNotificationChange={handleNotificationChange}
          />
        )
      }
    </div>
  );
};

export default Topsong;
