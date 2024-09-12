import React, { useEffect, useState } from "react";
import Imagebox from "./imagebox";
import axios from "axios";

interface HorizontalProps {
  token: string | null;
}

const HorizontalNewReleases: React.FC<HorizontalProps> = ({ token }) => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsToFetch, setItemsToFetch] = useState<number>(6);

  useEffect(() => {
    const updateItemsToFetch = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setItemsToFetch(4); // Mobile
      } else {
        setItemsToFetch(6); // Larger screens
      }
    };

    updateItemsToFetch();
    window.addEventListener("resize", updateItemsToFetch);

    return () => {
      window.removeEventListener("resize", updateItemsToFetch);
    };
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/browse/new-releases?limit=${itemsToFetch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlbums(response.data.albums.items || []);
        console.log(response.data.albums);
      } catch (error) {
        console.log("Error has occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, [token, itemsToFetch]);

  return (
    <div className="text-white mt-9">
      <div className="mb-6">
        <h1 className="font-extrabold text-lg sm:text-2xl">New Releases</h1>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4"> {/* Enable horizontal scrolling */}
        {loading ? (
          <p>Loading...</p>
        ) : albums.length > 0 ? (
          albums.map((albumData: any) => (
            <Imagebox
              key={albumData.id}
              previewUrl={albumData.preview_url || ""}
              image={albumData.images[1]?.url || "default-image-url"}
              songname={albumData.name}
              artistname={albumData.artists[0]?.name || "Unknown Artist"}
            />
          ))
        ) : (
          <p>No albums found</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalNewReleases;
