import React, { useState, useEffect } from "react";
import axios from "axios";
import girlposter from "../assets/postergirl.png";
import greenbar from "../assets/greenbar.png";
import lightbar from "../assets/lightbar.png";
import Horizontal from "./horizontalfeed";
import HorizontalNewRealeased from "./horizontalNew";
import HorizontalTopPicks from "./horizontaltrending";
import BottomPlayer from "./bottomplayer";

interface DashboardProps {
  token: string | null;
  playingPreview: string | null; // Added to receive the current playing preview URL
  onPlayPreview: (url: string | null) => void; // Added to handle play preview
}

const DashboardSearch: React.FC<DashboardProps> = ({ token, playingPreview, onPlayPreview }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [focused, setFocused] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".search-container")) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationChange = (show: boolean) => {
    setShowNotification(show);
    if (show) {
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="my-7 search-container">
      <input
        type="text"
        value={query}
        onFocus={() => setFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white sm:w-[800px] h-[30px] items-end flex w-[200px] justify-end sm:h-[40px] sm:rounded-xl placeholder-gray-700 text-sm px-4 outline-none"
        placeholder="Search for music, artist, album..."
      />
      {focused && results.length > 0 && (
        <ul className="absolute bg-white text-black mt-2 w-[800px] max-h-[300px] overflow-y-auto rounded-xl shadow-lg">
          {results.map((track) => (
            <li key={track.id} className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center">
              <div
                className="flex items-center"
                onClick={() => {
                  onPlayPreview(track.preview_url); // Use the passed function
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
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  onPlayPreview(track.preview_url); // Use the passed function
                }}
              >
                Play
              </button>
              {playingPreview === track.preview_url && (
                <BottomPlayer
                  clickPlay={true}
                  image={track.album.images[1]?.url}
                  songname={track.name}
                  previewUrl={track.preview_url}
                  artistname={track.artists[0]?.name}
                  onNotificationChange={handleNotificationChange}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="text-white font-bold text-2xl mt-16">
        <p className="text-sm sm:text-2xl">Hello, Good Morning👋</p>
        <div className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-2xl mt-6 via-blue-400 lg:w-[800px] sm:w-[98vw] h-40 sm:h-60 flex lg:justify-end lg:items-end">
          <div className="flex sm:gap-x-20 items-center">
            <div className="sm:ml-5">
              <h1 className="font-bold sm:text-5xl">POP!</h1>
              <p className="font-semibold text-sm">
                By <span className="text-[#B6FF52] text-xs font-bold">Im Nayeon</span>
              </p>
            </div>
            <img src={girlposter} alt="" className="h-auto size-[40%] sm:size-[100%] mt-auto" />
          </div>
          <div className="flex flex-row mt-auto align-bottom mb-2 sm:mr-5 text-[9px] gap-x-1">
            <i className="bx bx-left-arrow-alt bg-transparent sm:rounded-lg rounded-md border-2 py-1 px-2"></i>
            <i className="bx bx-right-arrow-alt bg-transparent sm:rounded-lg rounded-md border-2 py-1 px-2"></i>
          </div>
        </div>
      </div>
      <div className="sm:flex hidden justify-center items-center mt-6 gap-x-3">
        <img src={greenbar} alt="" />
        <img src={lightbar} alt="" />
        <img src={lightbar} alt="" />
      </div>
      <div>
        <Horizontal token={token} />
        <HorizontalNewRealeased token={token} />
        <HorizontalTopPicks token={token} />
      </div>
    </div>
  );
};

export default DashboardSearch;
