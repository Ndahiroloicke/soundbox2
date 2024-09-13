import React, { useState } from 'react';
import BottomPlayer from '../components/bottomplayer';

interface SongProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | undefined;
}

const Imagebox: React.FC<SongProps> = ({ image, songname, artistname, previewUrl }) => {
  const [clickPlay, setClickPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleClick = () => {
    setClickPlay(true);
    setIsPlaying(true);
  };

  const handleNotificationChange = (show: boolean) => {
    setShowNotification(show);
    if (show) {
      setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
    }
  };

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
          onClick={handleClick}
          alt={songname}
          className='w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-md hover:opacity-75 cursor-pointer'
        />
        <div className='text-center mt-2'>
          <h1 className='font-bold text-xs sm:text-sm lg:text-base'>{songname}</h1>
          <p className='text-gray-500 text-xs sm:text-sm'>{artistname}</p>
        </div>
        {isPlaying && (
          <BottomPlayer
            clickPlay={clickPlay}
            image={image}
            songname={songname}
            previewUrl={previewUrl}
            artistname={artistname}
            onNotificationChange={handleNotificationChange} // Pass the callback
          />
        )}
      </div>
    </div>
  );
};

export default Imagebox;
