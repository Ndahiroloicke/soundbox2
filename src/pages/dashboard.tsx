import React, { useEffect, useState } from "react";
import DashboardNav from "../components/dashboardnav";
import DashboardSearch from "../components/dashboardSearch";
import TopChart from "../components/topchart";
import BottomPlayer from "../components/bottomplayer";

const Dashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null); 

  useEffect(() => {
    const storeToken = window.localStorage.getItem("token");
    setToken(storeToken);
  }, []); 

  const handlePlayPreview = (previewUrl: string | null, track: any) => {
    if (playingPreview === previewUrl) {
      setPlayingPreview(null); 
      setCurrentTrack(null); 
    } else {
      setPlayingPreview(previewUrl); 
      setCurrentTrack(track); 
    }
  };

  return (
    <div className="bg-gradient-to-l px-56 from-blue-950 to-black min-h-screen flex flex-col">
      <div className="flex flex-row justify-between gap-x-10 p-4">
        <DashboardSearch
          token={token}
          playingPreview={playingPreview}
          onPlayPreview={handlePlayPreview}
        />
        <TopChart
          token={token}
          onPlayPreview={handlePlayPreview}
          isPlaying={!!playingPreview} 
          currentPreviewUrl={playingPreview} 
        />
      </div>
      <div className="flex-grow"></div> 
      
      {playingPreview && currentTrack && (
        <BottomPlayer
          image={currentTrack.album.images[0]?.url || "default-image-url"}
          songname={currentTrack.name}
          artistname={currentTrack.artists[0]?.name}
          previewUrl={playingPreview}
          clickPlay={true} 
          onNotificationChange={() => {}} 
        />
      )}
    </div>
  );
};

export default Dashboard;
