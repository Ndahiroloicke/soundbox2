import React, { useEffect, useState } from "react";
import Imagebox from "./imagebox";
import axios from "axios";

interface HorizontalProps {
  token: string | null;
  playingPreview: string | null;
  onPlayPreview: (previewUrl: string | null, track: any) => void; // Updated signature
}

const Horizontal: React.FC<HorizontalProps> = ({ token, playingPreview, onPlayPreview }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [itemsToFetch, setItemsToFetch] = useState<number>(6);

  useEffect(() => {
    const updateItemsToFetch = () => {
      setItemsToFetch(window.matchMedia("(max-width: 640px)").matches ? 10 : 20);
    };

    updateItemsToFetch();
    window.addEventListener("resize", updateItemsToFetch);

    return () => {
      window.removeEventListener("resize", updateItemsToFetch);
    };
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/player/recently-played?limit=${itemsToFetch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.items);
      } catch (error) {
        console.log("Error fetching recently played tracks", error);
      }
    };

    fetchRecentlyPlayed();
  }, [token, itemsToFetch]);

  return (
    <div className="text-white mt-9 w-full">
      <h1 className="font-extrabold text-lg sm:text-2xl">Recently Played</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {tracks.map((trackData, index) => (
          <Imagebox
            key={`${trackData.track.id}-${index}`}
            image={trackData.track.album.images[1]?.url || "default-image"}
            songname={trackData.track.name}
            artistname={trackData.track.artists[0]?.name || "Unknown Artist"}
            previewUrl={trackData.track.preview_url}
            playingPreview={playingPreview}
            onPlay={() => onPlayPreview(trackData.track.preview_url,trackData.track)} // Pass track to the handler
          />
        ))}
      </div>
    </div>
  );
};

export default Horizontal;
