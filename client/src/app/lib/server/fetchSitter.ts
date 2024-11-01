import { ISitter } from "@/interfaces/interfaces";
const urlBack = process.env.BACKEND_URL as string

export const getSittersFetch = async (): Promise<ISitter[] | null> => {
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
        `
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
        
        // Devuelve los cuidadores o null si no hay
        return data?.data?.sitters || null; 
    } catch (error) {
        console.error('Error fetching sitters:', error);
        return null; 
    }
};
export const getSitterByIdFetch = async (sitterId: string): Promise<ISitter | null> => {
  const query = JSON.stringify({
      query: `
      query Sitter($sitterId: String!) {
        sitter(id: $sitterId) {
          id
          firstname
          lastname
          address
          role
          userImg
          rate
          fee
          descripcion
          services {
            name
            description
          }
          appointments {
            entryDate
            departureDate
            time
            status
            total
            note
            user {
              firstname
              lastname
              id
            }
            detail {
              price
              dog {
                name
                birthdate
                race
                size
              }
            }
          }
        }
      }
      `,
      variables: { sitterId },
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

      // Devuelve el cuidador o null si no se encuentra
      return data?.data?.sitter || null; 
  } catch (error) {
      console.error('Error fetching sitter:', error);
      return null;
  }
};