import { IDogRegister } from "@/interfaces/interfaces";
const urlBack = process.env.BACKEND_URL as string

export const postCreateDog = async (idUser: string, dog: IDogRegister) => {
    const query = JSON.stringify({
        query: `mutation CreateDog($idUser: String!, $createDogInput: CreateDogInput!) {
            createDog(idUser: $idUser, createDogInput: $createDogInput) {
              
              name
              birthdate
              images
              race
              size
            }
          }`,
        variables: {
            idUser,
            createDogInput: dog // Cambia 'dog' a 'createDogInput'
        }
    });

    const response = await fetch(urlBack, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: query,
    });

    const data = await response.json();
    console.log(data);
    
    return data;
};

export const getDogsByUserId = async (idUser: string) => {
    const query = JSON.stringify({
        query: `
          query Dogs($idUser: String!) {
            dogs(idUser: $idUser) {
              name
              birthdate
              id
              images
              race
              size
            }
          }
        `,
        variables: { idUser },
    });

    const response = await fetch(urlBack, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: query,
    });

    const data = await response.json();
    
    return data;
};
