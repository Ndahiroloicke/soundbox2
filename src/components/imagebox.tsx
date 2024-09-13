import React from "react";

interface SongProps {
  image: string;
  songname: string;
  artistname: string;
  previewUrl: string | null;
  playingPreview: string | null;
  onPlay: () => void; // Function to play the preview
}

const Imagebox: React.FC<SongProps> = ({
  image,
  songname,
  artistname,
  previewUrl,
  playingPreview,
  onPlay,
}) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={songname}
        onClick={onPlay} // Trigger play when clicked
        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-md hover:opacity-75 cursor-pointer"
      />
      <div className="text-center mt-2">
        <h1 className="font-bold text-xs w-28  sm:text-[4px] lg:text-base">{songname}</h1>
        <p className="text-gray-500 text-xs sm:text-sm">{artistname}</p>
      </div>
      {playingPreview === previewUrl && <p className="text-green-500">Playing...</p>}
    </div>
  );
};

export default Imagebox;
