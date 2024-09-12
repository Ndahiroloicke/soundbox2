import React, { useEffect, useState } from 'react';
import Imagebox from './imagebox';
import axios from 'axios';

interface HorizontalProps {
  token: string | null;
}

const HorizontalTopPicks: React.FC<HorizontalProps> = ({ token }) => {
  const [tracks, setTracks] = useState<any[]>([]);
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

    const fetchTopPicks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/browse/featured-playlists?limit=${itemsToFetch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.playlists.items || []);
        console.log(response.data.playlists.items);
      } catch (error) {
        console.log('Error has occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPicks();
  }, [token, itemsToFetch]);

  return (
    <div className='text-white mt-9'>
      <div className='mb-6'>
        <h1 className='font-extrabold text-lg sm:text-2xl'>Trending</h1>
      </div>
      <div className='flex overflow-x-auto space-x-4 pb-4'> {/* Enable horizontal scrolling */}
        {loading ? (
          <p>Loading...</p>
        ) : tracks.length > 0 ? (
          tracks.map((trackData: any) => (
            <Imagebox
              key={trackData.id}
              previewUrl={''}
              image={trackData.images[0]?.url || 'default-image-url'}
              songname={trackData.name}
              artistname={trackData.owner?.display_name || "Unknown Artist"}
            />
          ))
        ) : (
          <p>No tracks found</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalTopPicks;
