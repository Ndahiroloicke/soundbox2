import { useState, useEffect } from "react";
import DashboardNav from "../components/dashboardnav";
import DashboardSearch from "../components/dashboardSearch";
import TopChart from "../components/topchart";
import BottomPlayer from "../components/bottomplayer";

const Dashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null); // Add state for current track

  useEffect(() => {
    const storeToken = window.localStorage.getItem("token");
    setToken(storeToken);
  }, []); // Add an empty dependency array to run only once

  const handlePlayPreview = (previewUrl: string | null, track: any) => {
    if (playingPreview === previewUrl) {
      setPlayingPreview(null); // Stop if the same song is clicked
      setCurrentTrack(null); // Clear current track when stopped
    } else {
      setPlayingPreview(previewUrl); // Start playing the new song
      setCurrentTrack(track); // Set the new current track
    }
  };

  return (
    <div className="bg-gradient-to-l from-blue-950 to-black min-h-screen flex flex-col">
      <div className="flex flex-row justify-between gap-x-10 p-4">
        <DashboardNav />
        <DashboardSearch 
          token={token} 
          playingPreview={playingPreview} 
          onPlayPreview={handlePlayPreview} // Pass track as argument here
        />
        <TopChart token={token} />
      </div>
      {/* Optional: Add more content here if needed */}
      <div className="flex-grow"></div> {/* This will take up remaining space */}

      {/* Bottom Player */}
      {playingPreview && currentTrack && (
        <BottomPlayer
          image={currentTrack.album.images[1]?.url || "default-image-url"}
          songname={currentTrack.name}
          artistname={currentTrack.artists[0]?.name}
          previewUrl={playingPreview}
          clickPlay={true} // Adjust this based on your logic
          onNotificationChange={() => {}} // No-op function
        />
      )}
    </div>
  );
};

export default Dashboard;
