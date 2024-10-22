"use client";

import { useState } from "react";

export default function DogForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    birthDate: "",
    images: "",
    race: "",
    size: "SMALL",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
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
            htmlFor="images"
            className="block text-lg font-semibold mb-2"
            style={{ color: "#b17457" }}
          >
            Upload Dog Image
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
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
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
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
