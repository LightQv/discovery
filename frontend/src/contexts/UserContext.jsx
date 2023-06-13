import SpotifyWebApi from "spotify-web-api-node";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext();

export default UserContext;

// Spotify credentials
const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_CLIENT_ID,
});

export function UserContextProvider({ children }) {
  const { accessToken } = useAuthContext();
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // Spotify Api access
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => setCurrentUser(data.body))
      .catch(() => {
        if (currentUser === null) navigate("/");
      });
  }, [accessToken]);

  const user = useMemo(() => currentUser, [currentUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
