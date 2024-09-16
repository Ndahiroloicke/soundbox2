import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png"; // Fallback profile image
import Topsong from "./topsong";
import axios from "axios";

interface UserProfile {
  display_name: string;
  email: string;
  images: { url: string }[];
}

interface TopChartProps {
  token: string | null;
}

const TopChart: React.FC<TopChartProps> = ({ token }) => {
  const [topCharts, setTopCharts] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    // Fetch Top Tracks
    const fetchTopCharts = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?limit=5",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopCharts(response.data.items);
      } catch (error) {
        console.error("Error fetching top charts:", error);
      }
    };

    // Fetch User Profile Info (Name & Email)
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<UserProfile>("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchTopCharts();
    fetchUserProfile();
  }, [token]);

  const handlePlayPreview = (previewUrl: string | null) => {
    if (!previewUrl) {
      return; // Handle no preview URL case
    }

    // Pause the current audio if one is playing
    if (audio) {
      audio.pause();
    }

    // If the clicked preview is the same as the current one, toggle playback
    if (isPlaying && previewUrl === currentPreviewUrl) {
      setIsPlaying(false);
      return;
    }

    // Create a new Audio element for the new preview
    const newAudio = new Audio(previewUrl);
    setAudio(newAudio);
    setCurrentPreviewUrl(previewUrl);
    setIsPlaying(true);

    // Play the new audio and handle the end of playback
    newAudio.play();
    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  return (
    <div className="hidden lg:block text-white my-6">
      <div className="flex flex-row items-center gap-x-3">
        <img
          src={userProfile?.images?.[0]?.url || profile}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="text-sm">
          <h1 className="font-bold">{userProfile?.display_name || "Guest"}</h1>
          <p className="text-gray-500">{userProfile?.email || "guest@gmail.com"}</p>
        </div>
      </div>

      <div className="mt-16">
        <h1 className="font-bold text-xl">Today's Top Charts</h1>
        <div className="flex flex-col gap-y-4 mt-7">
          {topCharts.length > 0 ? (
            topCharts.map((track, index) => (
              <Topsong
                previewUrl={track.preview_url}
                key={track.id}
                rank={index + 1}
                title={track.name}
                artist={track.artists[0].name}
                imageUrl={track.album.images[0]?.url}
                onPlay={handlePlayPreview}
                isPlaying={isPlaying && track.preview_url === currentPreviewUrl}
              />
            ))
          ) : (
            <p className="text-gray-500">No top tracks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopChart;
