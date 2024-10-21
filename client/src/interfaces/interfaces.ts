interface ICredential {
  id: number;
  password: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  credential: Credential;
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
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
  signUpSitter: (user: IRegisterUser) => Promise<boolean>;
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
};
