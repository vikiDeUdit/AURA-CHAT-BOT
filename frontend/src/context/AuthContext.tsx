import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;

export const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const isAdmin = false;

  useEffect(() => {
    const chechAuth = async () => {
      const response = await fetch(AUTH_ENDPOINT, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    chechAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(AUTH_ENDPOINT + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setAuthenticated(true);
    toast.success("Login successful");
  };

  const logout = async () => {
    await fetch(AUTH_ENDPOINT + "/logout", {
      method: "POST",
      credentials: "include",
    });

    setAuthenticated(false);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(AUTH_ENDPOINT + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        toast.error("Registration failed");
        return;
      }
      setAuthenticated(true);
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
