"use client";

import { getDogsByUserId, postCreateDog } from "@/app/lib/server/fetchDog";
import { getSittersFetch, getSitterByIdFetch } from "@/app/lib/server/fetchSitter";
import { postSignIn, postSignUpSitter, postSignUpOwner } from "@/app/lib/server/fetchUsers";
import {
  IDogRegister,
  ILoginUser,
  IRegisterSitter,
  IRegisterUser,
  IUserContextType,
  IUserResponse,
  IDog,
  ISitter
} from "@/interfaces/interfaces";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  dogs: null,
  sitters:[],

  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  signIn: async () => false,
  logOut: () => {},
  signUpSitter: async () => false,
  signUpOwner: async () => false,
  createDog: async () => false,
  getDogs: async () => false,
  getSitters: async () => [],
  getSitterById: async () => null
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [dogs,setDogs] = useState<any>([])
  const [sitters, setSitters] = useState<ISitter[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [sitter, setSitter] = useState<ISitter | null>(null);
  const router = useRouter()


  const signIn = async (credentials: ILoginUser) => {

    
    try {
      const data: any = await postSignIn(credentials);
      if(!data) return false
      console.log(data.user);
      
      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.accessToken);

      localStorage.setItem('firstname', data.user.firstname)
      localStorage.setItem('lastname', data.user.lastname)
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("idUser", data.user.id);

     
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

  

  const logOut = async () => {

    localStorage.removeItem("cartItems");
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');

    await signOut();
    window.location.href = 'http://localhost:3000'

    setUser(null);
    setIsLogged(false);
  };

  const createDog = async (idUser:string,dog:IDogRegister) => {
    const success = await postCreateDog(idUser,dog)
    if(success) {
      return true
    } else {
      return false
    }
   
  }

  const getDogs = async (idUser:string) => {
    const success = await getDogsByUserId(idUser)
    if(success) {
      
      success.data.dogs && setDogs(success.data.dogs)      
      return true
    } else {
      return false
    }
  }

  const getSitters = useCallback(async (): Promise<ISitter[]> => {
    try {
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query Sitters { 
            sitters { 
              address 
              role 
              userImg 
              firstname 
              lastname 
              id 
              rate 
              fee 
              descripcion 
              services { 
                name 
                description 
              } 
              appointments { 
                id 
                entryDate 
                departureDate 
                time 
                status 
                total 
                note 
                user { 
                  id 
                  firstname 
                  lastname 
                  address 
                } 
              } 
            } 
          }`
        }),
      });
      const result = await response.json();
      if (result.data && result.data.sitters) {
        return result.data.sitters;
      }
      return []; 
    } catch (error) {
      console.error('Error fetching sitters:', error);
      return [];
    }
  }, []);

  const getSitterById = async (id: string): Promise<ISitter | null> => {
    try {

        const response = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query SitterById($id: String!) { 
                        sitter(id: $id) { 
                            address 
                            role 
                            userImg 
                            firstname 
                            lastname 
                            id 
                            rate 
                            fee 
                            descripcion 
                            services { 
                                name 
                                description 
                            } 
                            appointments { 
                                id 
                                entryDate 
                                departureDate 
                                time 
                                status 
                                total 
                                note 
                                user { 
                                    id 
                                    firstname 
                                    lastname 
                                    address 
                                } 
                            } 
                        } 
                    }
                `,
                variables: { id },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const result = await response.json();
        if (result.data && result.data.sitter) {
            return result.data.sitter; 
        }

        return null;
    } catch (error) {

        console.error('Error fetching sitter by ID:', error);
        return null; 
    }
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
        createDog,
        logOut,
        dogs,
        getDogs,
        sitters,
        getSitters,
        getSitterById
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
