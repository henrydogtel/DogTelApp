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
  address: string;  // Dirección del sitter
  role: string;     // Rol (sitter)
  userImg: string;  // URL de la imagen de perfil
  firstname: string; // Nombre del sitter
  lastname: string;  // Apellido del sitter
  id: string;        // Identificador único del sitter
  rate: number;      // Tarifa del sitter
  fee: number;       // Cargo adicional del sitter
  descripcion: string; // Descripción del sitter
  services: {       // Servicios ofrecidos por el sitter
      name: string;  // Nombre del servicio
      description: string; // Descripción del servicio
  }[];              // Array de servicios
  appointments: {   // Citas asociadas al sitter
      id: string;   // Identificador único de la cita
      entryDate: string; // Fecha de entrada de la cita
      departureDate: string; // Fecha de salida de la cita
      time: string; // Hora de la cita
      status: string; // Estado de la cita
      total: number; // Total de la cita
      note: string;  // Nota de la cita
      user: {       // Usuario asociado a la cita
          id: string; // Identificador del usuario
          firstname: string; // Nombre del usuario
          lastname: string;  // Apellido del usuario
          address: string; // Dirección del usuario
      };
  }[];              // Array de citas
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
  sitters: ISitter[];
  dogs:[] | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserResponse> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUpSitter: (user: IRegisterSitter) => Promise<boolean>;
  signUpOwner: (user: IRegisterUser) => Promise<boolean>;
  logOut: () => void;
  createDog: (idUser:string,dog:IDogRegister) => Promise<boolean>;
  getDogs:(idUser:string) => Promise<boolean>
  getSitters: () => Promise<ISitter[]>; 
  getSitterById: (id: string) => Promise<ISitter | null>;
}

interface IDogRegister {
  name: string;
  birthdate:string;
  images:[],
  race:string;
  size:string;
}

interface IDog {
  id:string,
  name: string;
  birthdate:string;
  images:[],
  race:string;
  size:string;
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
