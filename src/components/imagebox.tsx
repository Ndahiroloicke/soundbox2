import React, { useState } from 'react';

interface songProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | undefined;
}

const Imagebox: React.FC<songProps> = ({ image, songname, artistname, previewUrl }) => {
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
      {/* Notification for missing preview */}
      {showNotification && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white py-2 text-center z-50">
          This song does not support Preview listening
        </div>
      )}

      <div className='flex flex-col'>
        <img
          src={image}
          onClick={handlePlayPreview}
          alt={songname}
          className='size-16 sm:size-36 lg:size-28 rounded-md hover:opacity-55 cursor-pointer'
        />
        <div className='text-sm mt-2'>
          <h1 className='font-bold text-[8px] sm:text-xs w-[70px] sm:w-[140px] lg:w-[130px]'>{songname}</h1>
          <p className='text-gray-500 text-[8px] sm:text-sm'>{artistname}</p>
        </div>
        {/* Show "Playing Preview" when the song is playing */}
        {isPlaying && !previewNull && (
          <div className='flex flex-row fixed bottom-0 justify-between'>
            <div className='flex flex-row bg-slate-900'>
              <div>
                <img src={image} alt="" className='size-10'/>
              </div>
              <div>
                <p className='font-extrabold'>{songname}</p>
                <p className='font-extralight'>{artistname}</p>
              </div>
            </div>
            
            <div>
            <audio controls autoPlay  >
                  <source src={previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Imagebox;
