import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png"; // Fallback profile image
import Topsong from "./topsong";
import axios from "axios";

interface topchartProps {
  token: string | null;
}

const TopChart: React.FC<topchartProps> = ({ token }) => {
  const [topCharts, setTopcharts] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<{ display_name: string; email: string } | null>(null);

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
        setTopcharts(response.data.items);
        console.log(response)
      } catch (error) {
        console.error("Error fetching top charts:", error);
      }
    };

    // Fetch User Profile Info (Name & Email)
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchTopCharts();
    fetchUserProfile();
  }, [token]);

  return (
    <div className="hidden lg:block text-white my-6">
      <div className="flex flex-row items-center gap-x-3">
        {/* Use user's Spotify profile image if available, else use fallback image */}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopChart;
