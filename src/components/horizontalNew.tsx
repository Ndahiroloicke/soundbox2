import React, { useEffect, useState } from "react";
import Imagebox from "./imagebox";
import axios from "axios";

interface HorizontalProps {
  token: string | null;
}

const HorizontalNewReleases: React.FC<HorizontalProps> = ({ token }) => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;

    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases?limit=6",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlbums(response.data.albums.items || []); // Ensure to set to an empty array if undefined
        console.log(response.data.albums); // Debug response structure
      } catch (error) {
        console.log("Error has occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, [token]);

  return (
    <div className="text-white mt-9">
      <div className="mb-9">
        <h1 className="font-extrabold text-2xl">New Releases</h1>
      </div>
      <div className="flex flex-row gap-x-1">
        {loading ? (
          <p>Loading...</p> // Display loading message while fetching data
        ) : albums.length > 0 ? (
          albums.map((albumData: any) => (
            <Imagebox
              key={albumData.id}
              previewUrl={albumData.preview_url || ""} // Default to empty string if undefined
              image={albumData.images[1]?.url || "default-image-url"} // Placeholder image
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
