import React from 'react';
import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { endpoints, PostData, User } from "../../api/endpoints";
import { AuthContext } from "../../context/AuthContext";
import { useAppDispatch } from '../../app/hooks';
import { setPosts } from '../../features/news/NewsSlice';

export const clearUsedData = {
  id: "",
  email: "",
  name: "",
  role: 0
};

function AuthProvider(props: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState<User>(clearUsedData);
  const [token, setTokenData] = useState("");
  // const [posts, setPosts] = useState<PostData[]>([]);
  const dispatch = useAppDispatch();

  const setToken = useCallback((tokenData: string) => {
    setTokenData(tokenData);
    console.log("TOKEN DATA!: ", tokenData);
    if (tokenData) {
      Cookies.set("auth-token", tokenData);
    } else {
      Cookies.remove("auth-token");
    }
  }, []);

  const logOut = useCallback(() => {
    console.log(userData);
    setUserData(clearUsedData);
    setToken("");
  }, [setToken]);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("auth-token");
    console.log("взяли из кук: ", tokenData);
    tokenData && setTokenData(tokenData);

    try {
      if (tokenData) {
        const rawUser = localStorage.getItem("user");
        console.log("rawUser: ", rawUser);
        const user = rawUser && JSON.parse(rawUser);
        console.log("not raw user: ", user);
        setUserData(user);
      }
    } catch {
      setToken("");
      console.log("error");
    } finally {
      setIsLoaded(true);
    }
  }, [setToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      userData,
      token,
      setUserData,
      setToken,
      logOut,
    }),
    [isLoaded, userData, token, setToken, logOut
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;