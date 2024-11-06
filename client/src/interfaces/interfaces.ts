interface ICredential {
  id: number;
  password: string;
}

interface IUser {

  id: string,
  firstname: string,
  lastname: string,
  birthdate: string,
  address: string,
  role: string,
  userImg: string
}

interface ILoginUser {
  email: string;
  password: string;
}


 interface ISitter {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  address: string;
  role: string;
  userImg: string;
  rate: number;
  fee: number;
  descripcion: string;
  email: string;
  password: string;
  services?: {       
      name: string;  
      description: string; 
  };         
  appointments: {  
      id: string;   
      entryDate: string; 
      departureDate: string; 
      time: string; 
      status: string; 
      total: number; 
      note: string;  
      user: {       
          id: string; 
          firstname: string; 
          lastname: string;  
          address: string; 
      };
  }[];             
}

interface IRegisterUser {
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  password: string;
  address: string;
  role: string;
}

interface IRegisterUserGoogle {
  firstname: string | null;
  lastname: string | null;
  birthdate: string | null;
  email: string | null | undefined;
  password: string | null;
  address: string | null;
  role: string | null;
}

interface IRegisterSitter {
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  password: string;
  address: string;
  role: string;
  fee: number;
  descripcion: string;
}

interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
}

interface IUserContextType {
  user: Partial<IUserResponse> | null;
  userImg: string | null;
  sitters:ISitter[] | null;
  dogs:IDog[] | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserResponse> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUpSitter: (user: IRegisterSitter) => Promise<boolean>;
  signUpOwner: (user: IRegisterUser) => Promise<boolean>;
  logOut: () => void;
  createDog: (idUser: string, dog: IDogRegister) => Promise<boolean>;
  getDogs: (idUser: string) => Promise<boolean>
  getSitters: () => Promise<boolean | ISitter[]>;
  getSittersById: (id: string) => void;
  getSittersProfile: () => void,
  getSitterById: (id:string) => Promise<ISitter | null> 
}

interface IDogRegister {
  name: string;
  birthdate: string;
  images: [];
  race: string;
  size: string;
}

interface IDog {
  id: string;
  name: string;
  birthdate: string;
  images: string[];
  race: string;
  size: string;
}

export type {
  ICredential,
  IRegisterUser,
  ILoginUser,
  IUserContextType,
  IUserResponse,
  IUser,
  IRegisterSitter,
  IRegisterUserGoogle,
  IDogRegister,
  IDog,
  ISitter,
};