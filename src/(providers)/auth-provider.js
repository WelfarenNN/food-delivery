"use client";

import { createContext, useContext, useEffect, useState,  } from "react";
import { server } from "@/app/(auth)/_api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {

      const stored = localStorage.getItem("user");  // eslint-disable-next-line react-hooks/set-state-in-effect  
      if (stored) setUser(JSON.parse(stored)); 
      
    } catch (error) {
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return ("useAuth must be used within an AuthProvider");
  }
  return context;
};
