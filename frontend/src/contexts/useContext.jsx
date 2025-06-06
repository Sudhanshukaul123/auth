import { createContext, useContext, useEffect, useState } from "react";
import { refresh_token, home } from "../Services/auth"; // adjust path if needed

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const [authType, setAuthType] = useState(null);
  const [loading, setLoading] = useState(false); // so we don't render stuff too early

  const checkUser = async () => {
    try {
      setLoading(true);
      await refresh_token();
      const res = await home();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>; // or splash screen
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, checkUser , authType, setAuthType }}>
      {children}
    </UserContext.Provider>
  );
};
