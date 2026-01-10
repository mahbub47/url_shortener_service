import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import api from "../utils/app";

type User = {
  email: string;
};

type ShortUrl = {
  originalUrl: string;
  shortCode: string;
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  accessCount: number;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  shortUrls?: ShortUrl[];
  setShortUrls?: Dispatch<SetStateAction<ShortUrl[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/api/auth/check-auth");
      if (res.data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(res.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.error("Error checking authentication:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShortUrls = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/url/user-urls");
      if (res.data.success) {
        setShortUrls(res.data.shortUrls);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchShortUrls();
  }, []);

  const value = {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    isLoading,
    setIsLoading,
    shortUrls,
    setShortUrls,
  };

  if (isLoading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
