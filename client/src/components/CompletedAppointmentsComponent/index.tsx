import { UserContext } from '@/context/user';
import { IAppointment } from '@/interfaces/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import LoadingModal from '../LoadingComponent';

const CompletedAppointmentsComponent = () => {
  const { sitterAppointments, getSitterAppointmentsById, user, approveAppointment } = useContext(UserContext);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loader, setLoader] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para controlar el orden de las citas

  useEffect(() => {
    // Obtener las citas del sitter
    const getSittersAppo = async () => {
      if (user?.user?.id) {
        await getSitterAppointmentsById(user?.user?.id as string);
      }
    };
    getSittersAppo();
  }, [user, approveAppointment]);

  useEffect(() => {
    // Actualizar el estado cuando cambian las citas
    if (sitterAppointments) {
      // Filtrar las citas para mostrar solo las completadas (FINISHED)
      const finishedAppointments = sitterAppointments.filter((appointment) => 
        appointment.status === 'FINISHED'
      );
      // Ordenar las citas por la fecha de inicio o creación
      const sortedAppointments = finishedAppointments.sort((a, b) => {
        const dateA = new Date(a.timeIn).getTime();
        const dateB = new Date(b.timeIn).getTime();
        
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      setAppointments(sortedAppointments);
    }
  }, [sitterAppointments, sortOrder]); // Dependencia de las citas y el orden

  // Función para cambiar el orden de las citas
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      {loader && <LoadingModal />}
      {/* Completed Appointments Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#dc803f]">Completed Appointments</h2>
        
        {/* Control de ordenación */}
        <div className="mb-4">
          <button
            onClick={toggleSortOrder}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id} className="mb-6">
                  <div className="flex justify-between items-center bg-[#FFEEAD] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Detalles de la cita */}
                    <div>
                      <h4 className="font-semibold text-[#B17457]">
                        {appointment.note || "No Notes"}
                      </h4>
                      <p className="text-gray-600">
                        <strong>Start Time:</strong> {new Date(appointment.timeIn).toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>End Time:</strong> {new Date(appointment.timeOut).toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Status:</strong> {appointment.status}
                      </p>
                      <p className="text-gray-600">
                        <strong>Created At:</strong> {new Date(appointment.createdAt).toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Total:</strong> ${appointment.total}
                      </p>
                      <p className="text-gray-600">
                        <strong>Payment Status:</strong> {appointment.payment ? 'Paid' : 'Not Paid'}
                      </p>
                      <p className="text-gray-600">
                        <strong>Appointment ID:</strong> {appointment.id}
                      </p>
                    </div>

                    {/* Información del usuario */}
                    <div className="ml-4">
                      <h5 className="font-semibold text-[#B17457]">User Details</h5>
                      <div className="flex items-center mt-2">
                        <img
                          src={appointment.user.userImg}
                          alt={appointment.user.firstname}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-gray-600">{appointment.user.firstname} {appointment.user.lastname}</p>
                          <p className="text-gray-500">{appointment.user.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información de la mascota */}
                  {appointment.detail && appointment.detail.length > 0 && (
                    <div className="mt-4 bg-[#f1f1f1] p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-[#fc955e]">Pet Details</h4>
                      {appointment.detail.map((dogDetail, index) => (
                        <div key={index} className="mt-2">
                          <h5 className="font-semibold text-[#B17457]">{dogDetail.dog.name}</h5>
                          <p className="text-gray-600">
                            <strong>Breed:</strong> {dogDetail.dog.race}
                          </p>
                          <img
                            src={dogDetail.dog.images[0]}
                            alt={dogDetail.dog.name}
                            className="w-24 h-24 object-cover mt-2"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Línea divisora entre citas */}
                  <Divider />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No completed appointments found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

// Componente Divider
const Divider = () => {
  return <hr className="my-4 border-t border-gray-500" />;
};

export default CompletedAppointmentsComponent;
