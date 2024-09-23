import React, { useEffect, useState } from "react";
import Topsong from "./topsong";
import Profile from "./profile"; // Import Profile component
import axios from "axios";

interface UserProfile {
  display_name: string;
  email: string;
  images: { url: string }[];
}

interface TopChartProps {
  token: string | null;
  onPlayPreview: (previewUrl: string | null, track: any) => void;
  isPlaying: boolean;
  currentPreviewUrl: string | null;
}

const TopChart: React.FC<TopChartProps> = ({
  token,
  onPlayPreview,
  isPlaying,
  currentPreviewUrl,
}) => {
  const [topCharts, setTopCharts] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State for user profile

  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchTopCharts = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?limit=10",
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

    fetchUserProfile();
    fetchTopCharts();
  }, [token]);

  return (
    <div className="hidden lg:block text-white my-6">
      <Profile userProfile={userProfile} /> 
      <div className="mt-14">
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
                onPlay={(previewUrl) => onPlayPreview(previewUrl, track)}
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
