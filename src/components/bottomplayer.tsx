import React, { useEffect, useRef } from 'react';

interface BottomPlayerProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | undefined;
  audio: HTMLAudioElement | null; // Add this prop
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({ image, songname, artistname, previewUrl, audio }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audio) {
      audioRef.current = audio;
      audioRef.current.addEventListener('ended', () => {
        audioRef.current?.pause();
      });

      return () => {
        audioRef.current?.removeEventListener('ended', () => {
          audioRef.current?.pause();
        });
      };
    }
  }, [audio]);

  return (
    <div className='flex flex-row fixed bottom-0 left-0 justify-between items-center w-full bg-slate-900 p-4 shadow-lg'>
      <div className='flex items-center'>
        <img src={image} alt={songname} className='w-12 h-12 rounded-lg shadow-md' />
        <div className='ml-3'>
          <p className='font-extrabold text-lg'>{songname}</p>
          <p className='font-extralight text-sm text-gray-400'>{artistname}</p>
        </div>
      </div>
      <audio controls className='w-1/2 mx-4' ref={audioRef}>
        <source src={previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BottomPlayer;
