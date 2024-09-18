import React, { useEffect, useState } from "react";
import axios from "axios";
import Imagebox from "./imagebox";

interface HorizontalProps {
  token: string | null;
  playingPreview: string | null;
  onPlayPreview: (previewUrl: string | null, track: any) => void;
}

const HorizontalNewReleases: React.FC<HorizontalProps> = ({ token, playingPreview, onPlayPreview }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsToFetch, setItemsToFetch] = useState<number>(15); // Fetch more initially

  // useEffect(() => {
  //   const updateItemsToFetch = () => {
  //     setItemsToFetch(window.matchMedia("(max-width: 640px)").matches ? 12 : 15); // Adjust as needed
  //   };

  //   updateItemsToFetch();
  //   window.addEventListener("resize", updateItemsToFetch);

  //   return () => {
  //     window.removeEventListener("resize", updateItemsToFetch);
  //   };
  // }, []);

  useEffect(() => {
    if (!token) return;
  
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/recommendations?limit=25&seed_genres=pop,rock,hip-hop`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data); // Log the entire response
        const tracksWithPreviewUrl = response.data.tracks
          .filter((track: any) => track.preview_url)
          .slice(0, 6);
        setTracks(tracksWithPreviewUrl);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTracks();
  }, [token, itemsToFetch]);
  

  return (
    <div className="text-white mt-9">
      <div className="mb-6">
        <h1 className="font-extrabold text-lg sm:text-2xl">Recommended Tracks</h1>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {loading ? (
          <p>Loading...</p>
        ) : tracks.length > 0 ? (
          tracks.map((track: any) => (
            <Imagebox
              key={track.id}
              previewUrl={track.preview_url || ""}
              image={track.album.images[1]?.url || "default-image-url"}
              songname={track.name}
              artistname={track.artists[0]?.name || "Unknown Artist"}
              playingPreview={playingPreview}
              onPlay={() => onPlayPreview(track.preview_url, track)} // Pass the onPlayPreview prop
            />
          ))
        ) : (
          <p>No tracks found</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalNewReleases;
