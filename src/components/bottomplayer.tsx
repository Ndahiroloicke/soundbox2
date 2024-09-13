import React, { useEffect, useRef, useState } from "react";

interface BottomPlayerProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | undefined;
  clickPlay: boolean;
  onNotificationChange: (show: boolean) => void; // New prop
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({
  image,
  songname,
  artistname,
  previewUrl,
  clickPlay,
  onNotificationChange,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayPreview = () => {
    if (!previewUrl) {
      onNotificationChange(true); // Notify parent to show notification
      return;
    }

    if (clickPlay) {
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
    handlePlayPreview(); // Call the function to handle play preview whenever the component renders

    return () => {
      audio?.pause(); // Cleanup audio on unmount
    };
  }, [clickPlay, previewUrl]);

  return (
    <div className="flex flex-row fixed bottom-0 left-0 justify-between items-center w-full bg-slate-900 p-4 shadow-lg">
      <div className="flex items-center">
        <img
          src={image}
          alt={songname}
          className="w-12 h-12 rounded-lg shadow-md"
        />
        <div className="ml-3">
          <p className="font-extrabold text-lg">{songname}</p>
          <p className="font-extralight text-sm text-gray-400">{artistname}</p>
        </div>
      </div>
      <audio controls className="w-1/2 mx-4" ref={audioRef}>
        <source src={previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BottomPlayer;
