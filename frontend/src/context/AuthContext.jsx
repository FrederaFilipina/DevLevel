import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });

  // Carregar tokens do localStorage ao montar
  useEffect(() => {
    const accessToken = localStorage.getItem("tokenAcesso");
    const refreshToken = localStorage.getItem("tokenRefresh");

    if (accessToken && refreshToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUser(decoded);
        setTokens({ accessToken, refreshToken });
      } catch (error) {
        console.error("Invalid token found in localStorage:", error);
        logout();
      }
    }
  }, []);

  const login = (email, tokenAcesso, tokenRefresh) => {
    localStorage.setItem("email", email);
    localStorage.setItem("tokenAcesso", tokenAcesso);
    localStorage.setItem("tokenRefresh", tokenRefresh);

    try {
      const decoded = jwtDecode(tokenAcesso);
      setUser(decoded);
      setTokens({ accessToken: tokenAcesso, refreshToken: tokenRefresh });
    } catch (error) {
      console.error("Failed to decode token during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("tokenAcesso");
    localStorage.removeItem("tokenRefresh");

    setUser(null);
    setTokens({ accessToken: null, refreshToken: null });
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
