import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>("");

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

  const parseTokenFromHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const hashParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashParams.get("access_token");
      return accessToken;
    }
    return null;
  };

  
  useEffect(() => {
    const handleToken = async () => {
      try {
        let storedToken = window.localStorage.getItem("token");

        if (!storedToken) {
          console.log("No token in localStorage, attempting to parse from URL...");
          const tokenFromHash = parseTokenFromHash();
          console.log("Parsed token from URL hash:", tokenFromHash);

          if (tokenFromHash) {
            window.localStorage.setItem("token", tokenFromHash);
            setToken(tokenFromHash);
            window.location.hash = ""; 
            console.log("Token stored in localStorage and state updated.");
            navigate("/dashboard");
          }
        } else {
          console.log("Token found in localStorage:", storedToken);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error during token extraction:", error);
      }
    };

    handleToken();
  }, [navigate]);

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
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
