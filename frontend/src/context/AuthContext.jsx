import { createContext, useContext, useState, useEffect } from "react";

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
    const email = localStorage.getItem("email");

    if (accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      if (email) {
        setUser({ email });
      }
    }
  }, []);

  const login = (email, tokenAcesso, tokenRefresh) => {
    localStorage.setItem("email", email);
    localStorage.setItem("tokenAcesso", tokenAcesso);
    localStorage.setItem("tokenRefresh", tokenRefresh);

    setUser({ email });
    setTokens({ accessToken: tokenAcesso, refreshToken: tokenRefresh });
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
