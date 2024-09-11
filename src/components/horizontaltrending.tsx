import React, { useEffect, useState } from 'react'
import Imagebox from './imagebox'
import axios from 'axios';

interface horizontalProps {
  token: string | null;
}

const HorizontalTopPicks: React.FC<horizontalProps> = ({ token }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;

    const fetchTopPicks = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=6",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.playlists.items); // Adjust to access the correct data structure
        console.log(response.data.playlists.items);
        setLoading(false);
      } catch (error) {
        console.log('Error has occurred:', error);
        setLoading(false);
      }
    };

    fetchTopPicks();
  }, [token]);

  return (
    <div className='text-white mt-9'>
      <div className='mb-9'>
        <h1 className='font-extrabold text-2xl'>Trending</h1>
      </div>
      <div className='flex flex-row gap-x-1'>
        {!loading && tracks.map((trackData: any) => (
          <Imagebox
            key={trackData.id}
            image={trackData.images[0]?.url || 'sadsong'} // Fallback image if none is available
            songname={trackData.name}
            artistname={trackData.owner?.display_name || "Unknown Artist"}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalTopPicks;
