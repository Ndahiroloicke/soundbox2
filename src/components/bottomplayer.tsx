import React, { useEffect, useRef } from "react";

interface BottomPlayerProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | null;
  clickPlay: boolean;
  onNotificationChange?: (show: boolean) => void; 
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({
  image,
  songname,
  artistname,
  previewUrl,
  clickPlay,
  onNotificationChange = () => {},
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (previewUrl) {
     
      if (!audioRef.current) {
        audioRef.current = new Audio(previewUrl);
      } else {
        audioRef.current.src = previewUrl;
      }

      const handlePlay = () => {
        if (audioRef.current) {
          audioRef.current.pause(); 
        }
      };

      audioRef.current.onerror = () => {
        console.error("Error loading audio");
        onNotificationChange(true);
      };

      audioRef.current.onended = () => {
        audioRef.current?.pause();
      };

      if (clickPlay) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          onNotificationChange(true);
        });
      }

      audioRef.current.onplay = handlePlay;

    } else {
      console.log("No preview URL available");
      onNotificationChange(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; 
        audioRef.current = null;
      }
    };
  }, [clickPlay, previewUrl]);

  return (
    <div className="flex flex-col md:flex-row fixed bottom-0 left-0 justify-between items-center w-full bg-slate-900 p-4 shadow-lg">
      <div className="flex items-center mb-2 md:mb-0">
        <img
          src={image}
          alt={songname}
          className="w-16 h-16 md:w-12 md:h-12 rounded-lg shadow-md"
        />
        <div className="ml-3">
          <p className="font-extrabold text-white text-lg md:text-base">{songname}</p>
          <p className="font-extralight text-sm text-gray-400 md:text-xs">{artistname}</p>
        </div>
      </div>
      {previewUrl && (
        <audio
          ref={audioRef}
          controls
          src={previewUrl}
          className="w-full lg:w-96 md:w-auto mt-2 md:mt-0"
        />
      )}
    </div>
  );
};

export default BottomPlayer;
