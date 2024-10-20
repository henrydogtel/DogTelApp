"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SitterDashboard = () => {
  // Estado para el calendario
  const [date, setDate] = useState(new Date());

  // Citas pendientes
  const pendingAppointments = [
    { id: 1, title: "Walk with Buddy", date: "2024-10-20", time: "10:00 AM" },
    {
      id: 2,
      title: "Pet visit for Fluffy",
      date: "2024-10-21",
      time: "2:00 PM",
    },
    { id: 3, title: "Grooming for Max", date: "2024-10-22", time: "1:00 PM" },
  ];

  // Citas completadas
  const completedAppointments = [
    { id: 1, title: "Walk with Max", date: "2024-09-15", time: "11:00 AM" },
    {
      id: 2,
      title: "Vet visit for Bella",
      date: "2024-09-18",
      time: "3:00 PM",
    },
  ];

  return (
    <div className="p-8 bg-[#FAF7F0] min-h-screen">
      {/* Título */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-[#B17457] mb-4">
          Sitter Dashboard
        </h1>
      </section>

      {/* Calendario de Citas Pendientes */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#B17457] mb-6">
          Pending Appointments
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          {/* Contenedor para centrar el calendario */}
          <div className="flex justify-center">
            <Calendar
              onChange={setDate}
              value={date}
              className="border border-gray-300 rounded-lg shadow-md"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Appointments on {date.toDateString()}:
            </h3>
            <ul>
              {pendingAppointments
                .filter(
                  (appointment) =>
                    appointment.date === date.toISOString().split("T")[0]
                )
                .map((appointment) => (
                  <li key={appointment.id} className="mb-2">
                    <div className="bg-[#FFEEAD] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      <h4 className="font-semibold text-[#B17457]">
                        {appointment.title}
                      </h4>
                      <p className="text-gray-600">Time: {appointment.time}</p>
                    </div>
                  </li>
                ))}
              {pendingAppointments.filter(
                (appointment) =>
                  appointment.date === date.toISOString().split("T")[0]
              ).length === 0 && (
                <p className="text-gray-600">No appointments for this date.</p>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Citas Completadas */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#B17457] mb-6">
          Completed Appointments
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <ul>
            {completedAppointments.length > 0 ? (
              completedAppointments.map((appointment) => (
                <li key={appointment.id} className="mb-4">
                  <div className="flex justify-between items-center bg-[#FFEEAD] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div>
                      <h3 className="text-lg font-semibold text-[#B17457]">
                        {appointment.title}
                      </h3>
                      <p className="text-gray-600">
                        Date: {appointment.date} | Time: {appointment.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No completed appointments.</p>
            )}
          </ul>
        </div>
      </section>

      {/* Acciones */}
      <section className="text-center">
        <button className="bg-[#FA7070] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#B17457] transition-colors duration-200">
          Add New Appointment
        </button>
      </section>
    </div>
  );
};

export default SitterDashboard;
