import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");

  const handleClick = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUrl = import.meta.env.VITE_SPOTIFY_REDIRECT_URL;
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // Extract token from hash if it exists
    if (!token && hash) {
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove "#" and parse the hash
      token = hashParams.get("access_token");

      if (token) {
        window.location.hash = ""; // Clear the hash
        window.localStorage.setItem("token", token);
        setToken(token);
        navigate("/dashboard");
      }
    }

    // Update the token state if it exists in local storage
    setToken(token || "");
  }, [navigate]);

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="bg-gradient-to-l flex items-center justify-center overflow-x-hidden from-blue-950 to-black w-full h-screen lg:h-screen text-white sm:h-full">
      {!token ? (
        <button
          onClick={handleClick}
          className="border-1 bg-[#B6FF52] text-black font-bold py-3 rounded-3xl px-4"
        >
          Login with Spotify
        </button>
      ) : (
        <button
          className="border-1 bg-[#B6FF52] text-black font-bold py-3 rounded-3xl px-4"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
