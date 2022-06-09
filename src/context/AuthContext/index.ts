/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from "react";
import { User } from "../../api/endpoints";
import { clearUsedData } from "../../providers/AuthProvider";

export interface MyContext {
    isLoaded: boolean;
    userData: User;
    token: string;
    setUserData: (userData: User) => void;
    setToken: (tokenData: string) => void;
    logOut: () => void;
}

export const AuthContext = createContext<MyContext>({
    isLoaded: false,
    userData: clearUsedData,
    token: "",
    setUserData: () => { },
    setToken: (tokenData) => { },
    logOut: () => { },
});