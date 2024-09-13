import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Horizontal from "./horizontalfeed";
import HorizontalNewRealeased from "./horizontalNew";
import HorizontalTopPicks from "./horizontaltrending";
import BottomPlayer from "./bottomplayer";

interface DashboardSearchProps {
  token: string | null;
  playingPreview: string | null;
  onPlayPreview: (previewUrl: string | null, track: any) => void;
}

const DashboardSearch: React.FC<DashboardSearchProps> = ({
  token,
  playingPreview,
  onPlayPreview,
}) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [focused, setFocused] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [featuredTracks, setFeaturedTracks] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery || !token) return;

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${debouncedQuery}&type=track&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(response.data.tracks.items);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery, token]);

  const fetchUserPlaylists = async (token: string) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.items)
      return response.data.items; // Return the user's playlists
    } catch (error) {
      console.error("Error fetching user's playlists:", error);
      return [];
    }
  };

  const fetchTracksFromPlaylist = async (playlistId: string, token: string) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.items)
      return response.data.items; // Return the tracks
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      if (!selectedPlaylistId || !token) return;

      try {
        const tracks = await fetchTracksFromPlaylist(selectedPlaylistId, token);
        setFeaturedTracks(tracks);
        console.log(tracks)
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
      }
    };

    fetchTracks();
  }, [selectedPlaylistId, token]);

  useEffect(() => {
    const fetchFeaturedTracks = async () => {
      if (!token) return;

      try {
        // Fetch user's playlists
        const playlists = await fetchUserPlaylists(token);
        if (playlists.length > 0) {
          // Choose the first playlist for demonstration; modify as needed
          const playlistId = playlists[0].id;

          // Fetch tracks from the selected playlist
          const tracks = await fetchTracksFromPlaylist(playlistId, token);
          setFeaturedTracks(tracks);
        } else {
          console.log("No playlists found.");
        }
      } catch (error) {
        console.error("Error fetching featured tracks:", error);
      }
    };

    fetchFeaturedTracks();
  }, [token]);

  const handlePlayPreview = (track: any) => {
    if (playingPreview === track.preview_url) {
      onPlayPreview(null, track);
    } else {
      setCurrentTrack(track);
      onPlayPreview(track.preview_url, track);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="my-7 search-container relative overflow-hidden">
      <input
        type="text"
        value={query}
        onFocus={() => setFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white w-full max-w-[800px] h-[40px] rounded-xl placeholder-gray-700 text-sm px-4 outline-none"
        placeholder="Search for music, artist, album..."
      />
      {focused && results.length > 0 && (
        <ul className="absolute bg-white text-black mt-2 w-full max-w-[800px] max-h-[300px] overflow-y-auto rounded-xl shadow-lg z-10">
          {results.map((track) => (
            <li
              key={track.id}
              className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center"
            >
              <div
                className="flex items-center"
                onClick={() => {
                  handlePlayPreview(track);
                  setFocused(false);
                }}
              >
                <img
                  src={track.album.images[1]?.url || "default-image-url"}
                  alt={track.name}
                  className="w-10 h-10 mr-2"
                />
                <div>
                  <p className="font-semibold">{track.name}</p>
                  <p className="text-sm text-gray-500">
                    {track.artists[0]?.name}
                  </p>
                </div>
              </div>
              <button
                className="ml-4 bg-green-500 text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPreview(track);
                }}
              >
                Play
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="text-white font-bold text-2xl mt-16">
        <p className="text-sm sm:text-2xl">Hello, Good Morning👋</p>
        <select
          onChange={(e) => setSelectedPlaylistId(e.target.value)}
          value={selectedPlaylistId || ""}
        >
          {playlists.map((playlist: any) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>

        <Slider {...sliderSettings} className="mt-6">
          {featuredTracks.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl h-40 sm:h-96 flex items-center justify-center overflow-hidden"
            >
              <img
                src={
                  item?.track?.album?.images?.[1]?.url || "default-image-url"
                }
                alt={item?.track?.name || "Unknown Track"}
                className="h-full w-full object-cover" // Ensure the image covers the container
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
                {" "}
                {/* Semi-transparent background */}
                <h1 className="font-bold text-white sm:text-2xl">
                  {item?.track?.name || "Unknown Track"}
                </h1>
                <p className="font-semibold text-gray-300 text-sm">
                  By{" "}
                  <span className="text-[#B6FF52] text-xs font-bold">
                    {item?.track?.artists?.[0]?.name || "Unknown Artist"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div>
        <HorizontalNewRealeased
          token={token}
          playingPreview={playingPreview}
          onPlayPreview={onPlayPreview}
        />
        <HorizontalTopPicks
          token={token}
          playingPreview={playingPreview}
          onPlayPreview={onPlayPreview}
        />
        <HorizontalTopPicks
          token={token}
          playingPreview={playingPreview}
          onPlayPreview={onPlayPreview}
        />
        <Horizontal
          token={token}
          playingPreview={playingPreview}
          onPlayPreview={onPlayPreview}
        />
      </div>

      <div className="flex-grow"></div>
    </div>
  );
};

export default DashboardSearch;
