import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>("");

  // Function to handle Spotify login
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

  // Function to parse the token from URL hash
  const parseTokenFromHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove '#' and parse the hash
      const accessToken = hashParams.get("access_token");
      return accessToken;
    }
    return null;
  };

  // UseEffect to handle token extraction and storage
  useEffect(() => {
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken) {
      const tokenFromHash = parseTokenFromHash();
      if (tokenFromHash) {
        window.localStorage.setItem("token", tokenFromHash);
        setToken(tokenFromHash);
        window.location.hash = ""; // Clear the hash
        navigate("/dashboard");
        console.log("Hash:", window.location.hash);
        console.log("Parsed Token:", parseTokenFromHash());
        console.log("Stored Token:", storedToken);
      }
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  // Function to handle logout
  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null); // Clear the token state after logout
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
