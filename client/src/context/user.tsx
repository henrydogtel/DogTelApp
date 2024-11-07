"use client";

import { getDogsByUserId, postCreateDog } from "@/app/lib/server/fetchDog";
import {
  getSittersFetch,
} from "@/app/lib/server/fetchSitter";
import {
  postSignIn,
  postSignUpSitter,
  postSignUpOwner,
} from "@/app/lib/server/fetchUsers";

import {  getSitterById } from "@/app/lib/server/fetchSitter";
import {
  IDogRegister,
  ILoginUser,
  IRegisterSitter,
  IRegisterUser,
  IUserContextType,
  IUserResponse,
  IDog,
  ISitter,
  ICreateAppointment,
} from "@/interfaces/interfaces";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { appointmentPaidConfirmFetch, approveAppointmentFetch, createAppointmentFetch, getSitterAppointmentsByIdFetch, getUserAppointmentsByIdFetch, markAsFinishedFetch, rejectAppointmentFetch } from "@/app/lib/server/fetchAppointments";
const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const UserContext = createContext<IUserContextType>({
  user: null,
  dogs: null,
  userAppointments:null,
  sitterAppointments:null,
  sitters: [],
  userImg:null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  signIn: async () => false,
  logOut: () => {},
  signUpSitter: async () => false,
  signUpOwner: async () => false,
  createDog: async () => false,
  removeDog: async () => null,
  getDogs: async () => false,
  getSitters: async () => [],
  getSitterById: async () => null,
  getSittersProfile: async () => null,
  getSittersById: async () => null,
  createAppointment: async () => null,
  getUserAppointmentsById: async () => null,
  getSitterAppointmentsById: async () => null,
  approveAppointment: async () => null,
  rejectAppointment: async () => null,
  appointmentPaidConfirm: async () => null,
  markAsFinished: async () => null
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>({ userImg: null });
  const [dogs,setDogs] = useState<any>([])
  const [userAppointments,setUserAppointments] = useState<any>([])
  const [sitterAppointments, setSitterAppointments] = useState<any>([])
  const [sitters, setSitters] = useState<ISitter[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [sitter, setSitter] = useState<ISitter | null>(null);
  const router = useRouter();

  const signIn = async (credentials: ILoginUser) => {
    try {
      const data: any = await postSignIn(credentials);
      if (!data) return false;
      console.log(data.user);
      window.location.href = '/home'
      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.accessToken);

      localStorage.setItem("firstname", data.user.firstname);
      localStorage.setItem("lastname", data.user.lastname);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("idUser", data.user.id);
      localStorage.setItem("userId", data.user.id);


      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getUserAppointmentsById = async (idUser:string) => {
    try {
      const response = await getUserAppointmentsByIdFetch(idUser)
      if(!response) throw new Error('Ocurred an error')
      setUserAppointments(response.data.getAppointmentsByIdUser)
      return true
    } catch (error) {
      throw error
    }
  }

  const getSitterAppointmentsById = async (idSitter:string) => {
    try {
      const response = await getSitterAppointmentsByIdFetch(idSitter)
      if(!response) throw new Error('Ocurred an error')
      setSitterAppointments(response.data.getAppointmentsByIdSitter)
    } catch (error) {
      throw error

    }
  }

  const markAsFinished = async (idAppointment:string):Promise<any> => {
    try {
      const response = await markAsFinishedFetch(idAppointment)
      if(!response) throw new Error('hubo un error al terminar la cita')
      return response
    } catch (error) {
      throw error
    }
  }


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
    localStorage.removeItem('userId');


    const response = await signOut();
    window.location.replace('/')
    setUser(null);
    setIsLogged(false);
  
  };

  const createDog = async (idUser: string, dog: IDogRegister) => {
    const success = await postCreateDog(idUser, dog);
    console.log(success);
    setDogs((prevDogs: IDog[]) => prevDogs.filter((dog: IDog) => dog.id !== dog.id));
    if (success) {
      return true;
    } else {
      return false;
    }
  };

  const removeDog = async (dogId: string): Promise<any> => {
    try {
      const response = await fetch(urlBack, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          query: `mutation RemoveDog($removeDogId: String!) {
            removeDog(id: $removeDogId) {
              message
              success
            }
          }`,
          variables: {
            removeDogId: dogId,
          },
        }),
      });
      const result = await response.json();
      if(!result) throw new Error('hubo un error')
      if (result.data.removeDog.success) {
        setDogs((prevDogs: IDog[]) => prevDogs.filter((dog: IDog) => dog.id !== dogId));
        return result; 
      }
     
    } catch (error) {
      console.error("Error removing dog:", error);
      throw error
    }
  };
  

  const getDogs = async (idUser: string) => {
    const success = await getDogsByUserId(idUser);
    if (success && success.data && success.data.dogs) {
      success.data.dogs && setDogs(success.data.dogs);
      return true;
    } else {
      return false;
    }
  };

  const getSitters = useCallback(async (): Promise<ISitter[]> => {
    try {
      const response = await fetch(urlBack, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          }`,
        }),
      });
      const result = await response.json();
      console.log(result);

      if (result.data && result.data.sitters) {
        setSitters(result.data.sitters);
        return result.data.sitters;
      }
      return [];
    } catch (error) {
      console.error("Error fetching sitters:", error);
      return [];
    }
  }, []);

  const getSitterById = async (id: string): Promise<ISitter | null> => {
    try {
      const response = await fetch(urlBack, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
                            birthdate
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
      console.log(result);

      if (result.data && result.data.sitter) {
        return result.data.sitter;
      }

      return null;
    } catch (error) {
      console.error("Error fetching sitter by ID:", error);
      return null;
    }
  };

const getSittersProfile = async () => {
  const success = await getSittersFetch();
  if (success && success.data && success.data.sitters) {
    setSitters(success.data.sitters);
    return true;
  } else {
    return false;
  }
};

const getSittersById = async (id: string) => {
  const response = await fetch(`/api/sitters/${id}`); 
  if (!response.ok) {
    return null;
  }
  const sitter = await response.json();
  return sitter;
};

const createAppointment = async (appointment: ICreateAppointment):Promise<any> => {
  try {
    const success = await createAppointmentFetch(appointment)
    if(!success) throw new Error('there was an error creating the appointment...')
    return success.data.createAppointment
  } catch (error) {
    throw error
    
  }
}

const approveAppointment = async (idAppointment:string):Promise<any> => {
  try {
    const response = await approveAppointmentFetch(idAppointment)
    if(!response) throw new Error('Hubo un error al aprobar el appointment')
    return response
  } catch (error) {
    throw error
  }
}

const appointmentPaidConfirm = async (idAppointment:string):Promise<any> => {
  try {
    const response = await appointmentPaidConfirmFetch(idAppointment)
    if(!response) throw new Error('Hubo un error al aprobar la solicitud')
    return true
  } catch (error) {
    throw error
  }
}

const rejectAppointment = async (idAppointment:string): Promise<any> => {
  try {
    const response = await rejectAppointmentFetch(idAppointment)
    if(!response) throw new Error('Hubo un error al aprobar el appointment')
    return response
  } catch (error) {
    throw error
  }
}



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
        removeDog,
        logOut,
        dogs,
        getDogs,
        sitters,
        getSitters,
        getSitterById,
        getSittersProfile,
        getSittersById,
        userImg: user?.userImg,
        createAppointment,
        getUserAppointmentsById,
        userAppointments,
        getSitterAppointmentsById,
        sitterAppointments,
        approveAppointment,
        rejectAppointment,
        appointmentPaidConfirm,
        markAsFinished
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};