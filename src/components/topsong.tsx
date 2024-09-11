import React from 'react';
import play from '../assets/playbutton.png';
import { useState } from 'react';

interface TopsongProps {
  rank: number;
  title: string;
  artist: string;
  imageUrl: string;
  previewUrl: string | null;
}

const Topsong: React.FC<TopsongProps> = ({ rank, title, artist, imageUrl, previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [previewNull, setPreviewNull] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handlePlayPreview = () => {
    if (!previewUrl) {
      setPreviewNull(true);
      setShowNotification(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return;
    }

    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);

      newAudio.onended = () => {
        setIsPlaying(false); // Reset state when preview ends
      };
    }
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
          <img src={imageUrl} alt={title} className='size-10 rounded-lg' />
          <div className='text-sm w-20'>
            <h1 className='font-bold text-xs'>{title}</h1>
            <p className='text-gray-500 text-xs'>{artist}</p>
          </div>
        </div>
        <img src={play} alt="play" onClick={handlePlayPreview} className='size-6' />
      </div>
      {/* Show "Playing Preview" when the song is playing */}
      {isPlaying && !previewNull && (
          <p className='text-xs text-green-400 mt-1'>Playing Preview</p>
        )}
    </div>
  );
};

export default Topsong;
