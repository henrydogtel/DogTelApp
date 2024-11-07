import { ICreateAppointment } from "@/interfaces/interfaces";

const urlBack = process.env.NEXT_PUBLIC_BACKEND_URL as string


export const createAppointmentFetch = async (appointment: ICreateAppointment): Promise<any> => {
  const query = JSON.stringify({
    query: `mutation CreateAppointment($createAppointment: CreateAppointmentInput!) {
          createAppointment(createAppointment: $createAppointment) {
            id
            entryDate
            departureDate
            timeIn
            timeOut
            status
            note
            total
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
        }`, variables: { createAppointment: appointment }
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });

  
  
  const data = await response.json();

  return data;
}

export const getSitterAppointmentsByIdFetch = async (idSitter:string):Promise<any> => {
  const query = JSON.stringify({
    query: `query GetAppointmentsByIdSitter($idSitter: String!) {
      getAppointmentsByIdSitter(idSitter: $idSitter) {
        id
        timeIn
        timeOut
        status
        total
        note
        payment
        createdAt
        detail {
          price
          dog {
            name
            race
            size
            images
            birthdate
          }
        }
        user {
          firstname
          lastname
          address
          userImg
        }
      }
    }`, variables: { idSitter }
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });


  const data = await response.json();

  return data;
}

export const getUserAppointmentsByIdFetch = async (idUser: string): Promise<any> => {
  const query = JSON.stringify({
    query: `query GetAppointmentsByIdUser($idUser: String!) {
        getAppointmentsByIdUser(idUser: $idUser) {
          id
          timeIn
          timeOut
          status
          total
          note
          payment
          sitter {
            firstname
            lastname
            address
            userImg
            rate
            fee
            descripcion
          }
          detail {
            price
            dog {
              name
              race
            }
          }
          createdAt
        }
      }`, variables: { idUser }
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });


  const data = await response.json();

  return data;
}

export const approveAppointmentFetch = async (idAppointment:string):Promise<any> => {
  const query = JSON.stringify({
    query:`mutation ConfirmAppointment($idAppointment: String!) {
      confirmAppointment(idAppointment: $idAppointment) {
        message
        status
      }
    }`,variables:{idAppointment:idAppointment}
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });


  const data = await response.json();

  return data;


}

export const rejectAppointmentFetch = async (idAppointment:string):Promise<any> => {
  const query = JSON.stringify({
    query:`mutation RejectAppointment($idAppointment: String!) {
      rejectAppointment(idAppointment: $idAppointment) {
        message
        status
      }
    }`,variables:{idAppointment:idAppointment}
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });
  console.log(response);
  

  const data = await response.json();

  return data;
}

export const appointmentPaidConfirmFetch = async (idAppointment:string):Promise<any> => {
  

  const query = JSON.stringify({
    query:`mutation AppointmentPaidConfirm($idAppointment: String!) {
      appointmentPaidConfirm(idAppointment: $idAppointment)
    }`,variables:{idAppointment}
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });


  const data = await response.json();

  return data;
}

export const  markAsFinishedFetch = async (idAppointment:string) => {
  const query = JSON.stringify({
    query:`mutation MarkAsFinished($idAppointment: String!) {
      markAsFinished(idAppointment: $idAppointment)
    }`,variables:{idAppointment}
  })

  const response = await fetch(urlBack, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query,
  });


  const data = await response.json();

  return data;
}