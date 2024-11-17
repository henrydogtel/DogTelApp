'use client'

import { UserContext } from "@/context/user";
import { IDog, ISitter } from "@/interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { concertOne, neucha } from "@/app/lib/server/fonts";
import Loader from "../Loader";
import Swal from "sweetalert2";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

const SummaryComponent: React.FC = () => {
  const [selectedSitter, setSelectedSitter] = useState<ISitter | null>(null);
  const [showDogs, setShowDogs] = useState(false);
  const [showSelectButton, setShowSelectButton] = useState(true);
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const { dogs, getDogs, createAppointment } = useContext(UserContext);
  const [loaderSubmit, setLoaderSubmit] = useState(false);
  const [entryDate, setEntryDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

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

        const tour = new Shepherd.Tour({
          useModalOverlay: true,
          defaultStepOptions: {
            classes: "shepherd-step-custom", // Clase CSS personalizada
            scrollTo: true,
          },
        });

        tour.addStep({
          id: "add-pets",
          title: "Add Dogs",
          text: "Please add your dogs to get an appointment.",
          attachTo: {
            element: ".dashboard",
            on: "bottom",
          },
          buttons: [
            {
              text: "Close",
              action: tour.complete,
            },
          ],
        });

        tour.start();
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

  const validateForm = (): boolean => {
    const currentDate = new Date();
    const entryDateObj = new Date(entryDate);
    const departureDateObj = new Date(departureDate);

    const newErrors: string[] = [];

    // Validate entryDate
    if (entryDateObj < currentDate) {
      newErrors.push("Entry date cannot be in the past.");
    }

    // Validate departureDate
    if (departureDateObj < entryDateObj) {
      newErrors.push("Departure date cannot be earlier than entry date.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoaderSubmit(true);

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
      const response = await createAppointment(appointmentData);
      if (response) {
        // Assuming `response` contains the total amount of the appointment
        const totalAmount = response.total || 0;

        // Success alert with total amount and dashboard message
        Swal.fire({
          icon: "success",
          title: "Appointment Created Successfully!",
          text: `Total amount: $${totalAmount}. You can view more details in your Dashboard under Orders.`,
          position: "top-end",
          toast: true,
          showConfirmButton: false,
          timer: 10000,
          timerProgressBar: true,
        });

        // Clear the form fields after successful submission
        setEntryDate("");
        setDepartureDate("");
        setTimeIn("");
        setTimeOut("");
        setNote("");
        setSelectedDogs([]);
        setSelectedSitter(null);

        setLoaderSubmit(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "There was an error creating the appointment",
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setLoaderSubmit(false);
    }
  };

  return (
    <div className="bg-[#ffe3b3d5] p-8 rounded-lg shadow-md max-w-4xl mx-auto grid gap-8">
      {loaderSubmit && <Loader />}
      <h2 className={`${concertOne.className} text-3xl font-bold text-[#dc803f] text-center mb-6`}>
        CREATE APPOINTMENT
      </h2>

      <div id="add-pets" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border border-[#B17457] rounded-lg shadow-sm bg-[#fff0d3] min-h-[300px]">
          <h1 className={`${concertOne.className} text-3xl font-bold text-center mb-6 text-[#dc803f]`}>
            Selected Sitter
          </h1>
          {selectedSitter ? (
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedSitter.userImg || defaultImage}
                alt={selectedSitter.firstname}
                className="rounded-full object-cover mb-4 border-4 border-[#ad6c32] w-36 h-36"
              />
              <h3 className={`${neucha.className} text-2xl font-semibold text-[#dc803f]`}>
                {selectedSitter.firstname} {selectedSitter.lastname}
              </h3>
              <h4 className="text-xl font-bold text-[#dc803f]">
                {selectedSitter.rate}⭐
              </h4>
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
                      selectedDogs.includes(dog.id) ? "bg-[#88a5597c]" : ""
                    }`}
                    onClick={() => handleDogClick(dog.id)}
                  >
                    <img
                      src={dog.images.length > 0 ? dog.images[0] : defaultImage}
                      alt={dog.name}
                      className="object-cover h-6 w-6 mr-4 rounded-full"
                    />
                    <p className={`${neucha.className} text-lg font-semibold text-[#414141] text-center flex-grow mr-12`}>
                      {dog.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            showDogs && <p className="text-center text-gray-500">No pets found</p>
          )}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="p-6 border border-[#B17457] rounded-lg shadow-sm bg-[#fff0d3] mt-8">
        <div className="grid gap-4">
          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>Entry Date</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            required
          />
          {errors.includes("Entry date cannot be in the past.") && (
            <p className="text-red-500 text-sm">Entry date cannot be in the past.</p>
          )}

          <label className={`${neucha.className} text-[#dc803f] font-semibold`}>Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="p-2 border border-[#B17457] rounded-md"
            required
          />
          {errors.includes("Departure date cannot be earlier than entry date.") && (
            <p className="text-red-500 text-sm">Departure date cannot be earlier than entry date.</p>
          )}

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
