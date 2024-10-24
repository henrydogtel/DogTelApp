import React, { useState } from 'react'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PendingAppointments = () => {

      const [date, setDate] = useState(new Date());


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

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#B17457] mb-6">
          Pending Appointments
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          {/* Contenedor para centrar el calendario */}
          <div className="flex justify-center">
            <Calendar
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
    </div>
  );
}

export default PendingAppointments
