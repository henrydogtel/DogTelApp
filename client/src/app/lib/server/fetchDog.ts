import { IDogRegister } from "@/interfaces/interfaces";
const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string

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
      createDogInput: dog
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

//imegenes
export const updateDogImage = async (dogId: string, images: string[]) => {
  const query = JSON.stringify({
    query: `
      mutation UpdateDogImage($updateDogImageId: String!, $images: [String!]!) {
        updateDogImage(id: $updateDogImageId, images: $images) {
          id
          images
        }
      }
    `,
    variables: { updateDogImageId: dogId, images },
  });

  const response = await fetch(urlBack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const data = await response.json();

  if (data.errors) {
    console.error("Error updating dog image:", data.errors);
  } else {
    console.log("Dog image updated successfully:", data.data.updateDogImage);
  }

  return data;
};

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

