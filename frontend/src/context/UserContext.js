import { createContext, useEffect, useState } from "react";
import { getUser } from "../utils/auth";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    getUser().then((u) => {
      setUser(u);
      setLoadingUser(false);
    }).catch(() => {
      setUser(null);
      setLoadingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}
