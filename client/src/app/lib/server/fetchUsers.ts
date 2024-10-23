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
  const query = JSON.stringify({
    query: `mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        email
        access_token
        role
      }
    }`,
    variables: credentials,
  });

  try {
    const response = await fetch('http://localhost:3001/graphql', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: query,
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await response.json();

    // Comprobar si hay errores en la respuesta GraphQL
    if (jsonResponse.errors) {
      console.error('GraphQL errors:', jsonResponse.errors);
      return false; // O puedes manejarlo de otra manera
    }

    // Comprobar si el login fue exitoso
    if (jsonResponse.data && jsonResponse.data.login) {
      // Aquí puedes devolver la información del usuario si lo necesitas
      return {
        email: jsonResponse.data.login.email,
        accessToken: jsonResponse.data.login.access_token,
        role: jsonResponse.data.login.role,
      };
    }

    // En caso de credenciales inválidas
    return false;

  } catch (error) {
    console.error('Error during sign in:', error);
    return false; // En caso de error, devuelve false
  }
};
