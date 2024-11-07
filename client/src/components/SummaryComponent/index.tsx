"use client";

import { UserContext } from "@/context/user";
import { IDog, ISitter } from "@/interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { concertOne, neucha } from "@/app/lib/server/fonts";

const SummaryComponent: React.FC = () => {
  const [selectedSitter, setSelectedSitter] = useState<ISitter | null>(null);
  const [showDogs, setShowDogs] = useState(false);
  const [showSelectButton, setShowSelectButton] = useState(true);
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const { dogs, getDogs, createAppointment } = useContext(UserContext);

  const [entryDate, setEntryDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [note, setNote] = useState("");

  const defaultImage =
    "https://media.istockphoto.com/id/1387833234/es/vector/silueta-de-perro-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=H1XjkMuI6ZXi9sSgFfQH16zxRxblm3Z5LDk1ee7v-0M=";

  useEffect(() => {
    const storedSitter = localStorage.getItem("selectedSitter");
    if (storedSitter) {
      setSelectedSitter(JSON.parse(storedSitter));
    }
  }, []);

  const handleSelectPet = async () => {
    const idUser = localStorage.getItem("idUser");
    if (idUser) {
      const success = await getDogs(idUser);
      if (success) {
        setShowDogs(true);
        setShowSelectButton(false);
      } else {
        console.error("Error fetching dogs");
      }
    } else {
      console.log("User ID not found in local storage.");
    }
  };

  const handleDogClick = (dogId: string) => {
    setSelectedDogs((prevSelectedDogs) => {
      if (prevSelectedDogs.includes(dogId)) {
        return prevSelectedDogs.filter((id) => id !== dogId);
      } else {
        return [...prevSelectedDogs, dogId];
      }
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const appointmentData = {
      entryDate,
      departureDate,
      timeIn,
      timeOut,
      note,
      idUser: localStorage.getItem("idUser") || "",
      idSitter: selectedSitter?.id || "",
      dogsId: selectedDogs,
    };
    console.log("Datos de la cita:", appointmentData);
    try {
      const response = await createAppointment(appointmentData)
      if(response) console.log('appointment created');
    } catch (error) {
      console.log(error);
      
    }
   
  };

  return (
    <div className="bg-[#ffe3b3d5] p-8 rounded-lg shadow-md max-w-4xl mx-auto grid gap-8">
      <h2 className={`${concertOne.className} text-3xl font-bold text-[#dc803f] text-center mb-6`}>
        CREATE APPOINMENT
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border border-[#B17457] rounded-lg shadow-sm bg-[#fff0d3] min-h-[300px]">
          <h1 className={`${concertOne.className} text-3xl font-bold text-center mb-6 text-[#dc803f]`}>
            Selected Sitter
          </h1>
          {selectedSitter ? (
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedSitter.userImg}
                alt={selectedSitter.firstname}
                className="rounded-full object-cover mb-4 border-4 border-[#ad6c32]"
                width={150}
                height={150}
              />
              <h3 className={`${neucha.className} text-2xl font-semibold text-[#dc803f]`}>
                {selectedSitter.firstname} {selectedSitter.lastname}
              </h3>
             
            </div>
          ) : (
            <p className="text-center text-gray-500">No sitter selected</p>
          )}
        </div>

        <div className="p-6 border border-[#dc803f] rounded-lg shadow-sm bg-[#fff0d3] min-h-[300px] flex flex-col justify-center items-center">
          {showSelectButton && (
            <button
              onClick={handleSelectPet}
              className={`${neucha.className} bg-[#dc803f] text-white px-4 py-2 rounded-md hover:bg-[#f8b275] mb-4`}
            >
              Select your pets
            </button>
          )}

          {showDogs && dogs ? (
            <div>
              <h2 className={`${concertOne.className} text-3xl font-bold text-center mb-6 text-[#dc803f]`}>
                Select Pets
              </h2>
              <ul className="space-y-4">
                {dogs.map((dog: IDog) => (
                  <li
                    key={dog.id}
                    className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-200 ${
                      selectedDogs.includes(dog.id) ? "bg-[#FAF2EA]" : ""
                    }`}
                    onClick={() => handleDogClick(dog.id)}
                  >
                    <img
                      src={dog.images.length > 0 ? dog.images[0] : defaultImage}
                      alt={dog.name}
                      className="object-cover h-6 w-6 mr-4 rounded-full"
                    />
                    <p className={`${neucha.className} text-lg font-semibold text-[#dc803f] text-center flex-grow mr-12`}>
                      {dog.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            showDogs && (
              <p className="text-center text-gray-500">No pets found</p>
            )
          )}
        </div>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="p-6 border border-[#B17457] rounded-lg shadow-sm bg-[#fff0d3] mt-8"
      >
        <div className="grid gap-4">
          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>Entry Date</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            required
          />

          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            required
          />

          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>Time In</label>
          <input
            type="time"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            required
          />

          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>Time Out</label>
          <input
            type="time"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            required
          />

          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>
            Additional Notes
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            placeholder="Any additional information"
          />

          <button
            type="submit"
            className={`${neucha.className} bg-[#e09451] text-white px-4 py-2 rounded-md hover:bg-[#f8b275]`}
          >
            Confirm Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default SummaryComponent;
