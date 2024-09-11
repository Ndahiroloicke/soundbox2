import React, { useEffect, useState } from 'react';
import Imagebox from './imagebox';
import axios from 'axios';

interface horizontalProps {
  token: string | null;
}

const Horizontal: React.FC<horizontalProps> = ({ token }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/recently-played?limit=6",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.items);
        console.log(response.data.items)
        // setLoading(false);
      } catch (error) {
        console.log('Error has occurred', error);
        // setLoading(false);
      }
    };
    fetchRecentlyPlayed();
  }, [token]);

  return (
    <div className='text-white mt-9'>
      <div className='mb-9'>
        <h1 className='font-extrabold text-2xl'>Recently Played</h1>
      </div>
      <div className='flex sm:flex-row gap-x-1'>
        {tracks.map((trackData: any) => (
          <Imagebox
            key={trackData.track.id}
            image={trackData.track.album.images[1]?.url || 'sadsong'} // Fallback image if none is available
            songname={trackData.track.name}
            artistname={trackData.track.artists[0]?.name || "Unknown Artist"}
            previewUrl={trackData.track.preview_url} // Pass the preview URL
          />
        ))}
      </div>
    </div>
  );
};

export default Horizontal;
