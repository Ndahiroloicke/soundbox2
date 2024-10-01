import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Horizontal from "./horizontalfeed";
import HorizontalNewReleased from "./horizontalNew";
import play from "../assets/playbutton.png";
import HorizontalTopPicks from "./horizontaltrending";
import PlaylistCarousel from "./playlistswiprer"; // Import the new Carousel component

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
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [greeting, setGreeting] = useState<string>("");
  const [playlistTracks, setPlaylistTracks] = useState<any[]>([]); // State to hold selected playlist tracks
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
        console.log(currentTrack)
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
    }
  }, [token]);

  // Fetch tracks for the selected playlist
  useEffect(() => {
    const fetchPlaylistTracks = async (playlistId: string) => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlaylistTracks(response.data.items);
        console.log(response);
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
      }
    };

    if (selectedPlaylistId) {
      fetchPlaylistTracks(selectedPlaylistId);
    }
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
    if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
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
      </div>

      {/* Render the PlaylistCarousel with fetched tracks */}
      {playlistTracks.length > 0 && (
        <PlaylistCarousel tracks={playlistTracks} />
      )}

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
        <Horizontal
          token={token}
          playingPreview={playingPreview}
          onPlayPreview={onPlayPreview}
        />
      </div>
    </div>
  );
};

export default DashboardSearch;
