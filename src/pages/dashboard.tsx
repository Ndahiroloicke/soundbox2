import { useEffect, useState } from "react";
import DashboardNav from "../components/dashboardnav";
import DashboardSearch from "../components/dashboardSearch";
import TopChart from "../components/topchart";

const Dashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);

  useEffect(() => {
    const storeToken = window.localStorage.getItem("token");
    setToken(storeToken);
  }, []); // Add an empty dependency array to run only once

  const handlePlayPreview = (previewUrl: string | null) => {
    if (playingPreview === previewUrl) {
      setPlayingPreview(null); // Stop if the same song is clicked
    } else {
      setPlayingPreview(previewUrl); // Start playing the new song
    }
  };

  return (
    <div className="bg-gradient-to-l from-blue-950 to-black min-h-screen flex flex-col">
      <div className="flex flex-row justify-between gap-x-10 p-4">
        <DashboardNav />
        <DashboardSearch 
          token={token} 
          playingPreview={playingPreview} 
          onPlayPreview={handlePlayPreview} 
        />
        <TopChart token={token} />
      </div>
      {/* Optional: Add more content here if needed */}
      <div className="flex-grow"></div> {/* This will take up remaining space */}
    </div>
  );
};

export default Dashboard;
