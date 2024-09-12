import React, { useEffect, useState } from 'react';
import Imagebox from './imagebox';
import axios from 'axios';

interface horizontalProps {
  token: string | null;
}

const Horizontal: React.FC<horizontalProps> = ({ token }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [itemsToFetch, setItemsToFetch] = useState<number>(6); // Default for larger screens

  useEffect(() => {
    const updateItemsToFetch = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setItemsToFetch(4); // Mobile
      } else {
        setItemsToFetch(6); // Larger screens
      }
    };

    updateItemsToFetch();
    window.addEventListener('resize', updateItemsToFetch);

    return () => {
      window.removeEventListener('resize', updateItemsToFetch);
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
        console.log('Error has occurred', error);
      }
    };
    fetchRecentlyPlayed();
  }, [token, itemsToFetch]);

  return (
    <div className='text-white mt-9 w-full'>
      <div className='mb-6'>
        <h1 className='font-extrabold text-lg sm:text-2xl'>Recently Played</h1>
      </div>
      <div className='flex overflow-x-auto space-x-4 pb-4'> {/* Enable horizontal scrolling */}
        {tracks.length > 0 ? (
          tracks.map((trackData: any) => (
            <Imagebox
              key={trackData.track.id}
              image={trackData.track.album.images[1]?.url || 'sadsong'}
              songname={trackData.track.name}
              artistname={trackData.track.artists[0]?.name || "Unknown Artist"}
              previewUrl={trackData.track.preview_url}
            />
          ))
        ) : (
          <p>No recently played tracks found</p>
        )}
      </div>
    </div>
  );
};

export default Horizontal;
