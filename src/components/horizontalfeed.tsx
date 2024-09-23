import React, { useEffect, useState } from "react";
import Imagebox from "./imagebox";
import axios from "axios";

interface HorizontalProps {
  token: string | null;
  playingPreview: string | null;
  onPlayPreview: (previewUrl: string | null, track: any) => void; 
}

const Horizontal: React.FC<HorizontalProps> = ({ token, playingPreview, onPlayPreview }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [itemsToFetch, setItemsToFetch] = useState<number>(6);

  useEffect(() => {
    const updateItemsToFetch = () => {
      setItemsToFetch(window.matchMedia("(max-width: 640px)").matches ? 20 : 10);
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
        const formattedTracks = response.data.items.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          album: {
            images: item.track.album.images,
          },
          artists: item.track.artists,
          preview_url: item.track.preview_url,
        }));
        setTracks(formattedTracks);
      } catch (error) {
        console.log("Error fetching recently played tracks", error);
      }
    };

    fetchRecentlyPlayed();
  }, [token, itemsToFetch]);

  return (
    <div className="text-white mt-9 w-full">
      <h1 className="font-extrabold text-lg mb-7 sm:text-2xl">Recently Played</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {tracks.map((track, index) => (
          <Imagebox
            key={`${track.id}-${index}`}
            image={track.album.images[1]?.url || "default-image"}
            songname={track.name}
            artistname={track.artists[0]?.name || "Unknown Artist"}
            previewUrl={track.preview_url}
            playingPreview={playingPreview}
            onPlay={() => onPlayPreview(track.preview_url, track)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Horizontal;
