"use client";

import { postSignIn, postSignUpSitter, postSignUpOwner } from "@/app/lib/server/fetchUsers";
import {
  ILoginUser,
  IRegisterSitter,
  IRegisterUser,
  IUserContextType,
  IUserResponse,
} from "@/interfaces/interfaces";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  signIn: async () => false,
  logOut: () => {},
  signUpSitter: async () => false,
  signUpOwner: async () => false,
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLogged, setIsLogged] = useState(false);
 

  const signIn = async (credentials: ILoginUser) => {

    
    try {
      const data: any = await postSignIn(credentials);
      if(!data) return false
      console.log(data.user);
      
      setUser(data);
      localStorage.setItem('firstname', data.user.firstname)
      localStorage.setItem('lastname', data.user.lastname)
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signUpSitter = async (user: IRegisterSitter) => {
    try {
      const data = await postSignUpSitter(user);
      if (data) {
        signIn({ email: user.email, password: user.password });
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const signUpOwner = async (user: IRegisterUser) => {
    try {
      const data = await postSignUpOwner(user);
      if (data) {
        signIn({ email: user.email, password: user.password });
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logOut = () => {

    localStorage.removeItem("cartItems");
    
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      return;
    }
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        signIn,
        signUpSitter,
        signUpOwner,

        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
