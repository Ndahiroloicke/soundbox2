import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import Horizontal from "./horizontalfeed";
import HorizontalNewReleased from "./horizontalNew";
import play from "../assets/playbutton.png";
import HorizontalTopPicks from "./horizontaltrending";

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
  const [randomContent, setRandomContent] = useState<any[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const [greeting, setGreeting] = useState<string>("");
  const resultsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning 🌅");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon 🌞");
      } else {
        setGreeting("Good Evening 🌙");
      }
    };
    updateGreeting();
  }, []);

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

  useEffect(() => {
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
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error fetching user's playlists:", error);
      }
    };

    if (token) {
      fetchUserPlaylists(token);
      fetchRandomContent(token); // Fetch random content when the token is available
    }
  }, [token]);

  const fetchRandomContent = async (token: string) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const categories = response.data.categories.items;
      const randomPromises = categories.map(async (category: any) => {
        const playlistsResponse = await axios.get(
          `https://api.spotify.com/v1/browse/categories/${category.id}/playlists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return playlistsResponse.data.playlists.items;
      });

      const results = await Promise.all(randomPromises);
      setRandomContent(results.flat());
    } catch (error) {
      console.error("Error fetching random content:", error);
    }
  };

  useEffect(() => {
    const fetchTracksFromPlaylist = async (
      playlistId: string,
      token: string
    ) => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.items;
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        return [];
      }
    };

    const fetchTracks = async () => {
      if (!selectedPlaylistId || !token) return;

      try {
        const tracks = await fetchTracksFromPlaylist(selectedPlaylistId, token);
        setFeaturedTracks(tracks);
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
      }
    };

    fetchTracks();
  }, [selectedPlaylistId, token]);

  const handlePlayPreview = (track: any) => {
    if (playingPreview === track.preview_url) {
      onPlayPreview(null, track);
    } else {
      setCurrentTrack(track);
      onPlayPreview(track.preview_url, track);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setFocused(false);
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
        <ul
          ref={resultsRef}
          className="absolute bg-white text-black mt-2 w-full max-w-[800px] max-h-[300px] overflow-y-auto rounded-xl shadow-lg z-10"
        >
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

              <img
                src={play}
                alt="play"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPreview(track);
                }}
                className={`w-6 h-6 cursor-pointer`}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="text-white font-bold text-2xl mt-16">
        <p className="text-sm sm:text-2xl">{greeting} 👋</p>
        <select
          onChange={(e) => setSelectedPlaylistId(e.target.value)}
          value={selectedPlaylistId || ""}
          className="bg-transparent border-none text-sm"
        >
          <option value="" className="text-black bg-transparent">
            Select a Playlist
          </option>
          {playlists.length > 0 ? (
            playlists.map((playlist: any) => (
              <option
                key={playlist.id}
                className="text-black bg-transparent"
                value={playlist.id}
              >
                {playlist.name}
              </option>
            ))
          ) : (
            <option className="text-black bg-transparent">
              No Playlists Found
            </option>
          )}
        </select>

        {currentTrack && (
          <div className="current-track-info mt-4">
            <p className="text-lg text-white">Currently Playing:</p>
            <p className="text-sm text-gray-300">
              {currentTrack.name} by {currentTrack.artists[0]?.name}
            </p>
          </div>
        )}

<Slider {...sliderSettings} className="carousel-container border-red-700">
  {(featuredTracks.length > 0 ? featuredTracks : randomContent).map((item, index) => (
    <div
      key={index}
      className="relative flex items-center justify-center overflow-hidden h-40 sm:h-60"
      style={{
        maxHeight: '250px',  // Limiting the container height
        border: '2px solid red',  // Debugging: Add border for the container
      }}
    >
      <img
        src={item?.track?.album?.images?.[1]?.url || item?.images?.[0]?.url || "default-image-url"}
        alt={item?.track?.name || "Unknown Track"}
        className="w-full h-full object-cover"
        style={{
          border: '2px solid blue',  // Debugging: Add border for the image
          width: '100%',  // Force the image to take up full width
          height: '100%',  // Force the image to take up full height
          objectFit: 'cover',  // Ensures the image covers the container properly
        }}
      />
    </div>
  ))}
</Slider>


      </div>

      <div>
        <HorizontalNewReleased
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
