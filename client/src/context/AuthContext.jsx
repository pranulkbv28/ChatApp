import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("chatUser");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setAuthUser(parsedUser);
        console.log("Parsed user from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chatUser", JSON.stringify(authUser));
      console.log("Stored authUser in localStorage:", authUser);
    } else {
      localStorage.removeItem("chatUser");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
