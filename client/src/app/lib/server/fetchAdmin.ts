import { IDog, IDogRegister, ISitter, IUser } from "@/interfaces/interfaces";
import { config as dotenvConfig } from 'dotenv';
import { threadId } from "worker_threads";

dotenvConfig({ path: '.env' });

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string


//estado user
export const postUpdateUserStatus = async (updateUserId: string, updateUserInput: { status: string }) => {
    const query = JSON.stringify({
        query: `mutation UpdateUser($updateUserId: String!, $updateUserInput: UpdateUserInput!) {
            updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
                id
                firstname
                lastname
                birthdate
                role
                status
            }
        }`,
        variables: {
            updateUserId,
            updateUserInput,
        },
    });

    const response = await fetch(urlBack, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: query,
    });

    const data = await response.json();
    if (data.errors) {
        return { success: false, message: `Error updating user status: ${data.errors[0].message}` };
    }

    return { success: true, updatedUser: data.data.updateUser };
};


export const fetchAllSitters = async (): Promise<ISitter[] | null> => {
    const query = JSON.stringify({
        query: `
        query Sitters {
          sitters {
            id
            firstname
            lastname
            address
            role
            status
            fee
            credentials {
              email
            }
          }
        }
      `,
    });

    try {
        const response = await fetch(urlBack, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: query,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data?.data?.sitters || null;
    } catch (error) {
        console.error("Error fetching all sitters:", error);
        return null;
    }
};


export const updateSitterStatus = async (sitterId: string, status: string) => {
    const mutation = JSON.stringify({
        query: `
        mutation UpdateSitterStatus($sitterId: String!, $status: SitterStatus!) {
          updateSitterStatus(id: $sitterId, status: $status) {
            success
            message
          }
        }
      `,
        variables: {
            sitterId,
            status,  
        },
    });

    try {
        const response = await fetch(urlBack, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: mutation,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        if (data?.data?.updateSitterStatus?.success) {
            return { success: true, message: "Sitter status updated successfully." };
        } else {
            return { success: false, message: data?.data?.updateSitterStatus?.message || "Failed to update sitter status." };
        }
    } catch (error) {
        console.error("Error updating sitter status:", error);
        return { success: false, message: `Error updating sitter status` };
    }
};


//user x email
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

//siter x email
export const fetchSitterProfileByEmail = async (email: string): Promise<ISitter | null> => {
    const query = JSON.stringify({
        query: `
       query SitterByEmail($email: String!) {
    sitterByEmail(email: $email) {
      firstname
      lastname
      address
      fee
      id
      userImg
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

//edit profile sitter
export const updateSitterProfile = async (
    sitterId: string,
    firstname: string,
    lastname: string,
    address: string,
    fee?: number
): Promise<Partial<ISitter>> => {
    const query = JSON.stringify({
        query: `
        mutation UpdateSitter($updateSitterId: String!, $updateSitterInput: UpdateSitterInput!) {
    updateSitter(id: $updateSitterId, updateSitterInput: $updateSitterInput) {
      firstname
      lastname
      address
      fee
    }
  }
      `,
        variables: {
            updateSitterId: sitterId,
            updateSitterInput: { firstname, lastname, address, fee }
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

//todos los users

export const getAllUsersFetch = async (): Promise<IUser[] | null> => {
    const query = JSON.stringify({
        query: `
query Users {
  users {
    id
    firstname
    lastname
    address
    status
    userImg
    credentials {
      email
      id
    }
  }
}
      `,
    });

    try {
        const response = await fetch(urlBack, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: query,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data?.data?.users || null;
    } catch (error) {
        console.error("Error fetching all users:", error);
        return null;
    }
};

// Interfaz para la respuesta de eliminación de usuario
interface RemoveUserResponse {
    success: boolean;
    message: string;
}


// Función para eliminar un usuario
interface RemoveUserResponse {
    success: boolean;
    message: string;
}

// Función para eliminar un usuario
export const removeUserFetch = async (removeUserId: string): Promise<RemoveUserResponse> => {
    const mutation = JSON.stringify({
        query: `
        mutation RemoveUser($removeUserId: String!) {
          removeUser(id: $removeUserId)
        }
      `,
        variables: { removeUserId },
    });

    const response = await fetch(urlBack, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: mutation,
    });

    const data = await response.json();

    // Ajuste: Asegúrate de devolver `{ success: true/false }` según el valor de `data.data.removeUser`
    if (data.data && data.data.removeUser) {
        return { success: true, message: "User deleted successfully." };
    } else {
        return { success: false, message: data.errors ? data.errors[0].message : "Failed to delete user." };
    }
};




//todos los sitters
export const getAllSittersFetch = async (): Promise<ISitter[] | null> => {
    const query = JSON.stringify({
        query: `
        query Sitters {
  sitters {
    id
    firstname
    lastname
    address
    role
    status
    credentials {
      email
    }
  }
}
      `,
    });

    try {
        const response = await fetch(urlBack, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: query,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data?.data?.sitters || null;
    } catch (error) {
        console.error("Error fetching all sitters:", error);
        return null;
    }
};

interface RemoveSitterResponse {
    success: boolean;
    message: string;
}

// Función para eliminar un sitter
export const removeSitterFetch = async (
    removeSitterId: string
): Promise<RemoveSitterResponse> => {
    const mutation = JSON.stringify({
        query: `
        mutation RemoveSitter($removeSitterId: String!) {
          removeSitter(id: $removeSitterId) {
            success
            message
          }
        }
      `,
        variables: { removeSitterId },
    });

    const response = await fetch(urlBack, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: mutation,
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data
};


//dogs

//status dogs


//remove
export const removeDog = async (removeDogId: string) => {
    const query = JSON.stringify({
        query: `mutation RemoveDog($removeDogId: String!) {
        removeDog(id: $removeDogId) {
          success
          message
        }
      }`,
        variables: { removeDogId }
    });

    const response = await fetch(urlBack, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: query,
    });

    const data = await response.json();

    if (data.errors) {
        console.error(`Error deleting dog with id: ${removeDogId}`, data.errors);
    } else if (data.data && data.data.removeDog) {
        console.log("Dog deleted successfully:", data.data.removeDog.message);
    } else {
        console.error("Unexpected response structure:", data);
    }

    return data;
}
//todos los dogs
export const getAllDogsFetch = async (): Promise<IDog[] | null> => {
    const query = JSON.stringify({
        query: `
        query AllDogs {
          allDogs {
            id
            name
            race
            size
            status
            user {
              id
              firstname
              lastname
            }
          }
        }
      `,
    });

    const response = await fetch(urlBack, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: query,
    });

    if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return null;
    }

    const data = await response.json();
    return data?.data?.allDogs || null;
};
