import React from 'react'

const CompletedAppointmentsComponent = () => {
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
    <div>
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
    </div>
  );
}

export default CompletedAppointmentsComponent
