import { ILoginUser, IRegisterUser } from "@/interfaces/interfaces";
import Swal from "sweetalert2";

export const postSignUpSitter = async (user: IRegisterUser) => {
  try {
    const response = await fetch("http://", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    if (response.ok) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "User registered in successfully",
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw new Error("Failed to sign up. Please try again.");
  }
};
export const postSignUpOwner = async (user: IRegisterUser) => {

 // Garantizamos que el rol siempre sea "user"
 const userWithRole = {
  ...user,
  role: "user",
};

const query = JSON.stringify({
  query: `mutation CreateUser($firstname: String!, $lastname: String!, $birthdate: DateTime!, $address: String!, $role: String!, $password: String!, $email: String!) {
    createUser(
      firstname: $firstname,
      lastname: $lastname,
      birthdate: $birthdate,
      address: $address,
      role: $role,
      password: $password,
      email: $email
    ) {
      firstname
      lastname
      birthdate
      address
      role
      credentials {
        password
        email
      }
    }
  }`,
  variables: userWithRole, // Aquí enviamos el usuario con el rol incluido
});

const response = await fetch('http://localhost:3001/graphql', {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: query,
});

return response;

};

export const postSignIn = async (credentials: ILoginUser) => {
  try {
    const response = await fetch("http://", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    if (response.ok) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "LogIn in successfully",
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Failed to sign in. Please try again.");
  }
};
