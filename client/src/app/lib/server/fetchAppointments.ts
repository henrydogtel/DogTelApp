import { ICreateAppointment } from "@/interfaces/interfaces";

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string


export const createAppointmentFetch = async (appointment:ICreateAppointment):Promise<any> => {
    const query = JSON.stringify({
        query:`mutation CreateAppointment($createAppointment: CreateAppointmentInput!) {
          createAppointment(createAppointment: $createAppointment) {
            id
            entryDate
            departureDate
            timeIn
            timeOut
            status
            note
            sitter {
              firstname
              lastname
              role
            }
            user {
              firstname
              lastname
              role
            }
            detail {
              price
              dog {
                name
                race
              }
            }
            createdAt
            total
          }
        }`,variables:{createAppointment:appointment}
    })

    const response = await fetch(urlBack, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: query,
      });


  const data = await response.json();
  console.log(data);

  return data;
}