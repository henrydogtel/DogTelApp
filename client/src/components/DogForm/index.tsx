"use client";

import { UserContext } from "@/context/user";
import { IDogRegister } from "@/interfaces/interfaces";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

export default function DogForm() {
  const { createDog } = useContext(UserContext);
  const [idUser, setIdUser] = useState(localStorage.getItem('idUser'));
  const [formValues, setFormValues] = useState({
    name: "",
    birthDate: "",
    images: null,
    race: "",
    size: "small",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    
    if (idUser) {
      const dogSend: IDogRegister = {
        name: formValues.name,
        birthdate: formValues.birthDate,
        images: [],
        race: formValues.race,
        size: formValues.size,
      };

      const data = await createDog(idUser, dogSend);
      if(data) {
        Swal.fire({
          icon: "success",
          title: "Dog created",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error while creating dog",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }  
      // Restablecer el formulario a su estado inicial
      setFormValues({
        name: "",
        birthDate: "",
        images: null,
        race: "",
        size: "small",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-16 mb-16">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#b17457" }}>
          Upload Dog Data
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-semibold mb-2"
            style={{ color: "#b17457" }}
          >
            Dog Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17457]"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="birthDate"
            className="block text-lg font-semibold mb-2"
            style={{ color: "#b17457" }}
          >
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formValues.birthDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17457]"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="race"
            className="block text-lg font-semibold mb-2"
            style={{ color: "#b17457" }}
          >
            Breed
          </label>
          <input
            type="text"
            id="race"
            name="race"
            value={formValues.race}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17457]"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-lg font-semibold mb-2"
            style={{ color: "#b17457" }}
          >
            Size
          </label>
          <select
            id="size"
            name="size"
            value={formValues.size}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17457]"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 text-lg font-semibold rounded-lg shadow-lg transition duration-300"
          style={{ backgroundColor: "#ffeead", color: "#b17457" }}
        >
          Upload Dog Data
        </button>
      </form>
    </div>
  );
}
