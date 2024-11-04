import {
  ILoginUser,
  IRegisterSitter,
  IRegisterUser,
  ISitter,
  IUser,
} from "@/interfaces/interfaces";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string


export const postSignUpSitter = async (user: IRegisterSitter) => {
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

export const fetchUserProfileByEmail = async (email: string): Promise<IUser | null> => {
  const query = JSON.stringify({
    query: `
      query UserByEmail($email: String!) {
        userByEmail(email: $email) {
          id
          firstname
          lastname
          userImg
          address
        }
      }
    `,
    variables: { email },
  });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const data = await response.json();
  console.log("GraphQL Response:", data);
  return data?.data?.userByEmail || null;
};

export const fetchSitterProfileByEmail = async (email: string): Promise<ISitter | null> => {
  const query = JSON.stringify({
    query: `
      query SitterByEmail($email: String!) {
        sitterByEmail(email: $email) {
          id
          firstname
          lastname
          userImg
          address
        }
      }
    `,
    variables: { email },
  });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const data = await response.json();
  console.log("GraphQL Response (Sitter):", data);
  return data?.data?.sitterByEmail || null;
};



//editar perfil de usuario (name,address)
export const updateUserProfile = async (userId: string, firstname: string, lastname: String, address: string): Promise<Partial<IUser>> => {
  const query = JSON.stringify({
    query: `
     mutation UpdateUser($updateUserId: String!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
    firstname
    lastname
    address
  }
}
    `,

    variables: { updateUserId: userId, updateUserInput: { firstname, lastname, address } },
  });
  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });
  const data = await response.json()
  return data
}

export const updateSitterProfile = async (
  sitterId: string,
  firstname: string,
  lastname: string,
  address: string
): Promise<Partial<ISitter>> => {
  const query = JSON.stringify({
    query: `
      mutation UpdateSitter($updateSitterId: String!, $updateSitterInput: UpdateSitterInput!) {
        updateSitter(id: $updateSitterId, updateSitterInput: $updateSitterInput) {
          firstname
          lastname
          address
        }
      }
    `,
    variables: {
      updateSitterId: sitterId,
      updateSitterInput: { firstname, lastname, address }
    },
  });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error al actualizar el perfil del sitter: ${data.errors[0].message}`);
  }

  return data.data.updateSitter;
};


export const fetchSitterProfile = async (sitterId: string) => {
  const query = JSON.stringify({
    query: `
      query Sitter($sitterId: String!) {
        sitter(id: $sitterId) {
          firstname
          lastname
          address
          userImg
        }
      }
    `,
    variables: { sitterId },
  });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const data = await response.json();
  return data.data.sitter;
};


// subida de imagenes
export const uploadUserImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');

  const response = await fetch(`https://api.cloudinary.com/v1_1/ddawjnvdg/image/upload`, {
    method: 'POST',
    body: formData,
  });

  console.log(response)
  const data = await response.json();
  return data.secure_url;


};

export const updateUserImage = async (userId: string, userImgUrl: string): Promise<any> => {

  const query = JSON.stringify({
    query: `
      mutation UpdateUserImage($updateUserImageId: String!, $userImg: String!) {
  updateUserImage(id: $updateUserImageId, userImg: $userImg) {
    id
    userImg
  }
}
    `,

    variables: { updateUserImageId: userId, userImg: userImgUrl },
  });

  console.log('Datos enviados:', { id: userId, userImg: userImgUrl });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });
  const data = await response.json();
  return data;
};

export const updateSitterImage = async (sitterId: string, userImgUrl: string): Promise<any> => {
  const query = JSON.stringify({
    query: `
      mutation UpdateSitterImage($updateSitterImageId: String!, $userImg: String!) {
        updateSitterImage(id: $updateSitterImageId, userImg: $userImg) {
          id
          userImg
        }
      }
    `,
    variables: { updateSitterImageId: sitterId, userImg: userImgUrl },
  });

  console.log('Datos enviados para actualizar la imagen del sitter:', { id: sitterId, userImg: userImgUrl });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });
  const data = await response.json();
  return data;
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
