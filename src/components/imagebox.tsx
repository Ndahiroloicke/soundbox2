import React, { useState, useEffect } from 'react';
import BottomPlayer from '../components/bottomplayer';

interface SongProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | undefined;
}

const Imagebox: React.FC<SongProps> = ({ image, songname, artistname, previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handlePlayPreview = () => {
    if (!previewUrl) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
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
        setIsPlaying(false);
      };
    }
  };

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset audio to start
      }
    };
  }, [audio]);

  return (
    <div className='flex flex-col items-center'>
      {showNotification && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white py-2 text-center z-50">
          This song does not support Preview listening
        </div>
      )}

      <div className='flex flex-col items-center'>
        <img
          src={image}
          onClick={handlePlayPreview}
          alt={songname}
          className='w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-md hover:opacity-75 cursor-pointer'
        />
        <div className='text-center mt-2'>
          <h1 className='font-bold text-xs sm:text-sm lg:text-base'>{songname}</h1>
          <p className='text-gray-500 text-xs sm:text-sm'>{artistname}</p>
        </div>
        {isPlaying && (
          <BottomPlayer
            image={image}
            songname={songname}
            previewUrl={previewUrl}
            artistname={artistname}
            audio={audio} 
          />
        )}
      </div>
    </div>
  );
};

export default Imagebox;
