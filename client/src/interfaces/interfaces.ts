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

interface IRegisterUser {
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  password: string;
  address: string;
  role: string;
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
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserResponse> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUpSitter: (user: IRegisterSitter) => Promise<boolean>;
  signUpOwner: (user: IRegisterUser) => Promise<boolean>;
  logOut: () => void;
}


export type {
  ICredential,
  IRegisterUser,
  ILoginUser,
  IUserContextType,
  IUserResponse,
  IUser,
  IRegisterSitter,
};
