import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setUser({
        role: localStorage.getItem("role"),
        name: localStorage.getItem("name"),
      });
    }
  }, [token]);

  const login = (jwt, role, name) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setToken(jwt);
    setUser({ role, name });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
