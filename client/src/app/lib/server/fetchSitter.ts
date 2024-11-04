import { ISitter } from "@/interfaces/interfaces";
const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string

export const getSittersFetch = async () => {
  const query = JSON.stringify({
      query: `
      query Sitters {
        sitters {
          address
          role
          userImg
          firstname
          lastname
          id
          rate
          fee
          descripcion
          services {
            name
            description
          }
          appointments {
            id
            entryDate
            departureDate
            time
            status
            total
            note
            user {
              id
              firstname
              lastname
              address
            }
          }
        }
      }
      `})

  try {
      const response = await fetch(urlBack, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: query,
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data?.data?.sitters || null; 
  } catch (error) {
      console.error('Error fetching sitters:', error);
      return null; 
  }
};

export const getSitterById = async (sitterId: string): Promise<ISitter | null> => {
      const query = JSON.stringify({
          query: `
          query Sitters {
            sitters {
              address
              role
              userImg
              firstname
              lastname
              id
              rate
              fee
              descripcion
              services {
                name
                description
              }
              appointments {
                id
                entryDate
                departureDate
                time
                status
                total
                note
                user {
                  id
                  firstname
                  lastname
                  address
                }
              }
            }
          }
          `, variables: { sitterId },
      });

  try {
      const response = await fetch(urlBack, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: query,
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
          console.error('GraphQL errors:', data.errors);
          return null; 
      }

      return data?.data?.sitter || null; 
  } catch (error) {
      console.error('Error fetching sitter:', error);
      return null; 
  }
};