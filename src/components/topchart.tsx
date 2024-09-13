import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png"; // Fallback profile image
import Topsong from "./topsong";
import axios from "axios";

interface UserProfile {
  display_name: string;
  email: string;
  images: { url: string }[]; // Adjust based on the actual structure
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

    if (audio) {
      if (isPlaying && previewUrl === currentPreviewUrl) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.pause(); // Pause current audio
        const newAudio = new Audio(previewUrl);
        setAudio(newAudio);
        setCurrentPreviewUrl(previewUrl);
        newAudio.play();
        setIsPlaying(true);
        newAudio.onended = () => {
          setIsPlaying(false);
        };
      }
    } else {
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setCurrentPreviewUrl(previewUrl);
      setIsPlaying(true);
      newAudio.onended = () => {
        setIsPlaying(false);
      };
    }
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
          {topCharts.map((track, index) => (
            <Topsong
              previewUrl={track.preview_url}
              key={track.id}
              rank={index + 1}
              title={track.name}
              artist={track.artists[0].name}
              imageUrl={track.album.images[0]?.url}
              onPlay={handlePlayPreview} // Pass down the play handler
              isPlaying={isPlaying && track.preview_url === currentPreviewUrl} // Conditional styling or functionality
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopChart;
