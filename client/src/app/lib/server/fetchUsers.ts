import {
  ILoginUser,
  IRegisterSitter,
  IRegisterUser,
} from "@/interfaces/interfaces";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string


export const postSignUpSitter = async (user: IRegisterSitter) => {
  // Garantizamos que el rol siempre sea "user"
  const userWithRole = {
    ...user,
    fee: Number(user.fee),
    role: "sitter",
  };
  
  const query = JSON.stringify({
    query: `mutation CreateSitter($firstname: String!, $lastname: String!, $birthdate: DateTime!, $address: String!, $role: String!, $password: String!, $email: String!, $fee: Float!, $descripcion: String!) {
    createSitter(firstname: $firstname, lastname: $lastname, birthdate: $birthdate, address: $address, role: $role, password: $password, email: $email, fee: $fee, descripcion: $descripcion) {
      firstname
      rate
      fee
      role
      id
    }
  }`,
    variables: userWithRole,
  });

  console.log(userWithRole);
  
  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });

  const data = await response.json();
  console.log(data);

  return data;
};

export const postSignUpOwner = async (user: IRegisterUser) => {
  // Garantizamos que el rol siempre sea "user"
  const userWithRole = {
    ...user,
    role: "user",
  };
  console.log(userWithRole);

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

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });
  console.log(response);

  const data = await response.json();
  return data;
};

export const postSignIn = async (credentials: ILoginUser) => {
  const query = JSON.stringify({
    query: `mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        email
        access_token
        role
        user {
          firstname
          lastname
          id
        }
      }
    }`,
    variables: credentials,
  });

  try {
    const response = await fetch(urlBack, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: query,
    });
    console.log(response);

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    // Comprobar si hay errores en la respuesta GraphQL
    if (jsonResponse.errors) {
      console.error("GraphQL errors:", jsonResponse.errors);
      return false;
    }

    // Comprobar si el login fue exitoso
    if (jsonResponse.data && jsonResponse.data.login) {
   
      return {
        user: jsonResponse.data.login.user,
        email: jsonResponse.data.login.email,
        accessToken: jsonResponse.data.login.access_token,
        role: jsonResponse.data.login.role,
      };
    }

    // En caso de credenciales inválidas
    return false;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw new Error("Error during sign in");
  }
};















// try {
//   const response = await fetch("http://", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });

//   if (!response.ok) {
//     const errorMessage = `Error ${response.status}: ${response.statusText}`;
//     throw new Error(errorMessage);
//   }
//   if (response.ok) {
//     const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       },
//     });
//     Toast.fire({
//       icon: "success",
//       title: "User registered in successfully",
//     });
//   }

//   const data = await response.json();
//   return data;
// } catch (error) {
//   console.error("Error during sign-up:", error);
//   throw new Error("Failed to sign up. Please try again.");
// }
