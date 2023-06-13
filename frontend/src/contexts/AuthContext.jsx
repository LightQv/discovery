import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export function AuthContextProvider({ children, code }) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;
    axios
      .post(`${BACKEND_URL}/login`, { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/dashboard");
      })
      .catch(() => navigate("/"));
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${BACKEND_URL}/refresh`, { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => navigate("/"));
    }, (expiresIn - 60) * 1000);
    clearInterval(interval);
  }, [refreshToken, expiresIn]);

  const token = useMemo(() => {
    return {
      accessToken,
      setAccessToken,
    };
  }, [accessToken]);

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

AuthContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
  code: PropTypes.string.isRequired,
};
